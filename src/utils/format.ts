import Decimal from "break_infinity.js";

export function formatNumber(number: number) {
  if (number < 1000) return formatDecimalLessThan1000(number);
  const exponent = Math.floor(Math.log10(number));
  const mantissa = number / Math.pow(10, exponent);
  return `${mantissa.toFixed(2)}e${exponent}`;
}

export function formatDecimal(number: Decimal | number | string, decimals = 2) {
  const val = number instanceof Decimal ? number : new Decimal(number);
  if (val.lt(1000)) return formatDecimalLessThan1000(val);
  const exponent = Decimal.floor(val.log10());
  const mantissa = val.div(new Decimal(10).pow(exponent));
  return `${mantissa.toFixed(decimals)}e${exponent}`;
}

export function formatDecimalLessThan1000(number: Decimal | number) {
  if (number instanceof Decimal) return number.toFixed(2);
  if (Number.isInteger(number)) {
    return new Decimal(number).toFixed(0);
  }
  return new Decimal(number).toFixed(2);
}

export function formatPercents(number: number) {
  return `${Math.floor(number * 100)}%`;
}

export function format(value: Decimal | number | string): string {
  return formatDecimal(value);
}

export function formatInt(value: Decimal | number): string {
  return formatDecimal(value, 0);
}