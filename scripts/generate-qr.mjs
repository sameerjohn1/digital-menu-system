import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const clientsDir = path.join(rootDir, "data", "clients");
const outputBaseDir = path.join(rootDir, "public", "qr-codes");
const siteConfigPath = path.join(rootDir, "config", "site.json");

function getArgValue(flag) {
  const args = process.argv.slice(2);
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : undefined;
}

function resolveBaseUrl() {
  const siteConfig = JSON.parse(fs.readFileSync(siteConfigPath, "utf8"));
  const rawUrl =
    getArgValue("--url") ||
    process.env.MENU_BASE_URL ||
    process.env.BASE_URL ||
    siteConfig.productionUrl;

  const parsed = new URL(rawUrl);
  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Base URL must use http or https");
  }

  return `${parsed.origin}${parsed.pathname.replace(/\/+$/, "")}`;
}

function escapeXml(value) {
  return String(value).replace(/[<>&"']/g, (character) => {
    const entities = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&apos;",
    };
    return entities[character];
  });
}

function buildMenuUrl(baseUrl, slug) {
  return new URL(`menu/${slug}`, `${baseUrl}/`).toString();
}

function getDisplayPath(url) {
  const parsed = new URL(url);
  return parsed.pathname;
}

function createLabeledQrSvg(qrSvg, meta) {
  const width = 460;
  const height = 560;
  const qrSize = 320;
  const qrX = (width - qrSize) / 2;
  const qrY = 122;
  const nameSize = meta.businessName.length > 32 ? 19 : 24;

  const nestedSvg = qrSvg.trim().replace(/^<svg([^>]*)>/, (_, attributes) => {
    const cleaned = attributes.replace(/\s(?:width|height)="[^"]*"/g, "");
    return `<svg${cleaned} x="${qrX}" y="${qrY}" width="${qrSize}" height="${qrSize}">`;
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(`${meta.businessName} Menu QR`)}">
  <rect width="${width}" height="${height}" rx="28" fill="#FFFFFF"/>
  <rect x="0" y="0" width="${width}" height="12" rx="6" fill="${meta.color}"/>
  <text x="${width / 2}" y="58" text-anchor="middle" font-family="Arial, sans-serif" font-size="${nameSize}" font-weight="700" fill="#18181B">${escapeXml(meta.businessName)}</text>
  <text x="${width / 2}" y="93" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="${meta.color}">Menu QR</text>
  ${nestedSvg}
  <line x1="58" y1="472" x2="${width - 58}" y2="472" stroke="#E4E4E7" stroke-width="1"/>
  <text x="${width / 2}" y="507" text-anchor="middle" font-family="ui-monospace, monospace" font-size="13" fill="#52525B">${escapeXml(meta.detail)}</text>
  <text x="${width / 2}" y="538" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#A1A1AA">Scan to open this menu</text>
</svg>`;
}

async function writeQrAssets(url, svgPath, pngPath, meta) {
  const qrOptions = {
    errorCorrectionLevel: "M",
    margin: 2,
    color: { dark: meta.color, light: "#FFFFFF" },
  };

  const qrSvg = await QRCode.toString(url, { ...qrOptions, type: "svg" });
  fs.writeFileSync(svgPath, createLabeledQrSvg(qrSvg, meta), "utf8");

  await QRCode.toFile(pngPath, url, { ...qrOptions, width: 800 });
}

function readBusinessConfigs() {
  if (!fs.existsSync(clientsDir)) {
    throw new Error(`Business data directory not found: ${clientsDir}`);
  }

  return fs
    .readdirSync(clientsDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => {
      const config = JSON.parse(fs.readFileSync(path.join(clientsDir, file), "utf8"));

      if (!config.slug || !/^[a-z0-9-]+$/.test(config.slug)) {
        throw new Error(`${file} has an invalid slug`);
      }
      if (config.slug !== path.basename(file, ".json")) {
        throw new Error(`${file} slug must match the filename`);
      }
      if (!config.name?.en) {
        throw new Error(`${file} is missing name.en`);
      }

      return config;
    });
}

async function generateAllQRCodes() {
  const baseUrl = resolveBaseUrl();
  const configs = readBusinessConfigs();

  fs.rmSync(outputBaseDir, { recursive: true, force: true });
  fs.mkdirSync(outputBaseDir, { recursive: true });

  console.log("Animated Digital Menu - QR Generator");
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Platforms found: ${configs.length}\n`);

  const manifest = {
    baseUrl,
    platforms: [],
  };

  for (const config of configs) {
    const slug = config.slug;
    const businessName = config.name.en;
    const color = /^#[0-9a-fA-F]{6}$/.test(config.theme?.primary || "")
      ? config.theme.primary
      : "#18181B";
    const clientOutputDir = path.join(outputBaseDir, slug);
    fs.mkdirSync(clientOutputDir, { recursive: true });

    const menuUrl = buildMenuUrl(baseUrl, slug);
    const qrSvg = `/qr-codes/${slug}/${slug}.svg`;
    const qrPng = `/qr-codes/${slug}/${slug}.png`;

    await writeQrAssets(
      menuUrl,
      path.join(clientOutputDir, `${slug}.svg`),
      path.join(clientOutputDir, `${slug}.png`),
      {
        businessName,
        detail: getDisplayPath(menuUrl),
        color,
      }
    );

    manifest.platforms.push({
      slug,
      name: businessName,
      whatsappNumber: config.whatsappNumber,
      url: menuUrl,
      svg: qrSvg,
      png: qrPng,
    });

    console.log(`${businessName} (${slug})`);
    console.log(`  QR: ${menuUrl}`);
  }

  fs.writeFileSync(
    path.join(outputBaseDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );

  console.log(`\nQR codes written to ${outputBaseDir}`);
}

generateAllQRCodes().catch((error) => {
  console.error("QR generation failed:", error);
  process.exit(1);
});
