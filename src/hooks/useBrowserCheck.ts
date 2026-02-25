function detectBrowser() {
  const brand = (window.navigator as any).userAgentData?.brands[1]?.brand;
  if (brand === "Google Chrome") return "Chrome";
  if (brand === "Microsoft Edge") return "Edge";
  if (brand === "Mozilla Firefox") return "Firefox";
  if (brand === "Safari") return "Safari";
  if (brand === "Opera") return "Opera";
  if (brand === "Brave") return "Brave";
  if (brand === "Opera GX") return "Opera GX";
  if (brand === "Tor Browser") return "Tor Browser";
  if (brand === "") return "Chrome";
}

const browser: any = detectBrowser();

export function useBrowserCheck() {
  return { browser };
}
