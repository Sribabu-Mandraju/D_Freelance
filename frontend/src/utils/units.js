// Utility helpers for currency unit conversions

// Convert a decimal USD amount (string or number) to USDC 6-decimal minor units as BigInt
// Example: "1" -> 1000000n, "12.3456789" -> 12345678n (fraction truncated to 6)
export function toUSDC6(value) {
  if (value === undefined || value === null) return 0n;
  const str = String(value).trim();
  if (str === "") return 0n;
  if (str.startsWith("-")) {
    throw new Error("Negative amounts are not supported");
  }
  const parts = str.split(".");
  const intPart = (parts[0] || "0").replace(/\D/g, "") || "0";
  const fracRaw = (parts[1] || "").replace(/\D/g, "");
  const fracPadded = (fracRaw + "000000").slice(0, 6);
  const base = 1_000_000n;
  return BigInt(intPart) * base + BigInt(fracPadded);
}

// Convert USDC 6-decimal minor units (BigInt or string/number) back to a decimal string
export function fromUSDC6(units) {
  const base = 1_000_000n;
  const v = typeof units === "bigint" ? units : BigInt(units || 0);
  const sign = v < 0n ? "-" : "";
  const abs = v < 0n ? -v : v;
  const whole = abs / base;
  const frac = abs % base;
  const fracStr = frac.toString().padStart(6, "0").replace(/0+$/, "");
  return sign + whole.toString() + (fracStr ? "." + fracStr : "");
}
