export function useBrowserCheck() {
  let browser = "";

  const brand = (window.navigator as any).userAgentData?.brands[2]?.brand;
  if (brand === "Google Chrome") browser = "Chrome";
  if (brand === "Microsoft Edge") browser = "Edge";
  if (brand === "Mozilla Firefox") browser = "Firefox";
  if (brand === "Safari") browser = "Safari";
  if (brand === "Opera") browser = "Opera";
  if (brand === "Brave") browser = "Brave";
  if (brand === "Opera GX") browser = "Opera GX";
  if (brand === "Tor Browser") browser = "Tor Browser";
  if (brand === undefined) browser = "Chrome";
  return { browser };
}
