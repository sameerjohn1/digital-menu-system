export interface OpenStatus {
  isOpen: boolean;
  textEn: string;
  textUr: string;
}

export function checkIsOpen(openTimeStr: string, closeTimeStr: string): OpenStatus {
  try {
    const [openH, openM] = openTimeStr.split(":").map(Number);
    const [closeH, closeM] = closeTimeStr.split(":").map(Number);

    const now = new Date();
    const currentH = now.getHours();
    const currentM = now.getMinutes();

    const currentMinutes = currentH * 60 + currentM;
    const openMinutes = openH * 60 + openM;
    let closeMinutes = closeH * 60 + closeM;

    let isOpen = false;

    if (closeMinutes < openMinutes) {
      // Crosses midnight, e.g. 18:00 to 02:00
      closeMinutes += 24 * 60;
      const adjustedCurrent = currentMinutes < openMinutes ? currentMinutes + 24 * 60 : currentMinutes;
      isOpen = adjustedCurrent >= openMinutes && adjustedCurrent < closeMinutes;
    } else {
      // Same day, e.g. 11:00 to 23:30
      isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;
    }

    const format12h = (h: number, m: number) => {
      const period = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 || 12;
      const displayM = m < 10 ? `0${m}` : m;
      return `${displayH}:${displayM} ${period}`;
    };

    if (isOpen) {
      const closeDisplay = format12h(closeH, closeM);
      return {
        isOpen: true,
        textEn: `Open Now • Closes at ${closeDisplay}`,
        textUr: `اب کھلا ہے • بند ہونے کا وقت: ${closeDisplay}`,
      };
    } else {
      const openDisplay = format12h(openH, openM);
      return {
        isOpen: false,
        textEn: `Closed • Opens at ${openDisplay}`,
        textUr: `فی الحال بند ہے • کھلنے کا وقت: ${openDisplay}`,
      };
    }
  } catch {
    return {
      isOpen: true,
      textEn: "Open Now",
      textUr: "اب کھلا ہے",
    };
  }
}
