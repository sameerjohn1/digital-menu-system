import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Production Base URL support with fallback
const args = process.argv.slice(2);
let customUrl = process.env.BASE_URL;
const urlFlagIndex = args.indexOf("--url");
if (urlFlagIndex !== -1 && args[urlFlagIndex + 1]) {
  customUrl = args[urlFlagIndex + 1];
}

const BASE_URL = customUrl || "https://animated-menu.pages.dev";
const clientsDir = path.join(rootDir, "data", "clients");
const outputBaseDir = path.join(rootDir, "public", "qr-codes");

async function generateAllQRCodes() {
  console.log(`\n========================================================`);
  console.log(`  Animated Digital Menu - Multi-Business QR Generator  `);
  console.log(`========================================================\n`);
  console.log(`📡 Production Base URL: ${BASE_URL}\n`);

  if (!fs.existsSync(clientsDir)) {
    console.error(`❌ Clients directory not found: ${clientsDir}`);
    process.exit(1);
  }

  const clientFiles = fs.readdirSync(clientsDir).filter((f) => f.endsWith(".json"));
  console.log(`Found ${clientFiles.length} business configurations in data/clients/\n`);

  const manifest = [];

  for (const file of clientFiles) {
    const filePath = path.join(clientsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const slug = content.slug;
    const clientName = content.name?.en || slug;
    const tablesCount = content.tablesCount !== undefined ? content.tablesCount : 10;
    const primaryColor = content.theme?.primary || "#000000";

    const clientOutputDir = path.join(outputBaseDir, slug);
    if (!fs.existsSync(clientOutputDir)) {
      fs.mkdirSync(clientOutputDir, { recursive: true });
    }

    console.log(`--------------------------------------------------------`);
    console.log(`🏢 [Business] ${clientName} (${slug})`);
    console.log(`   WhatsApp: ${content.whatsappNumber || "N/A"}`);
    console.log(`   Configured Tables: ${tablesCount}`);

    const businessEntry = {
      slug,
      name: clientName,
      whatsappNumber: content.whatsappNumber,
      mainUrl: `${BASE_URL}/menu/${slug}`,
      mainSvg: `/qr-codes/${slug}/main-menu.svg`,
      mainPng: `/qr-codes/${slug}/main-menu.png`,
      tables: [],
    };

    // 1. General Business QR Code (SVG and PNG)
    const mainUrl = `${BASE_URL}/menu/${slug}`;
    const mainSvgPath = path.join(clientOutputDir, "main-menu.svg");
    const mainPngPath = path.join(clientOutputDir, "main-menu.png");

    const mainSvg = await QRCode.toString(mainUrl, {
      type: "svg",
      margin: 2,
      color: { dark: primaryColor, light: "#FFFFFF" },
    });
    fs.writeFileSync(mainSvgPath, mainSvg);

    try {
      await QRCode.toFile(mainPngPath, mainUrl, {
        width: 600,
        margin: 2,
        color: { dark: primaryColor, light: "#FFFFFF" },
      });
    } catch {
      // Fallback if PNG generation fails in certain environments
    }

    console.log(`   ✓ Main QR: ${mainUrl}`);

    // 2. Table-Specific QR Codes (1 through tablesCount)
    for (let table = 1; table <= tablesCount; table++) {
      const tableUrl = `${BASE_URL}/menu/${slug}?table=${table}`;
      const svgPath = path.join(clientOutputDir, `table-${table}.svg`);
      const pngPath = path.join(clientOutputDir, `table-${table}.png`);

      const tableSvg = await QRCode.toString(tableUrl, {
        type: "svg",
        margin: 2,
        color: { dark: primaryColor, light: "#FFFFFF" },
      });
      fs.writeFileSync(svgPath, tableSvg);

      try {
        await QRCode.toFile(pngPath, tableUrl, {
          width: 600,
          margin: 2,
          color: { dark: primaryColor, light: "#FFFFFF" },
        });
      } catch {
        // Continue
      }

      businessEntry.tables.push({
        tableNumber: table,
        url: tableUrl,
        svg: `/qr-codes/${slug}/table-${table}.svg`,
        png: `/qr-codes/${slug}/table-${table}.png`,
      });
    }

    console.log(`   ✓ Generated ${tablesCount} table QR codes (SVG & PNG)`);
    manifest.push(businessEntry);
  }

  // Save manifest for fast browser preview in the QR gallery
  const manifestPath = path.join(outputBaseDir, "manifest.json");
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`--------------------------------------------------------`);
  console.log(`\n🎉 Success! All QR codes generated in: public/qr-codes/\n`);
}

generateAllQRCodes().catch((err) => {
  console.error("❌ Error generating QR codes:", err);
  process.exit(1);
});
