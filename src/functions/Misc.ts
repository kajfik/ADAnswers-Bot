import { CommandInteraction, hideLinkEmbed, hyperlink } from "discord.js";
import Decimal from "break_infinity.js";
import { ids } from "../config.json";

export function isHelper(interaction: CommandInteraction): boolean | undefined {
  // Now that's an expression!
  return interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(ids.helperRole);
}

export function isEligibleForHelper(interaction: CommandInteraction): boolean {
  const roles = interaction.guild?.members.resolve(interaction.user)?.roles.cache;
  const eligibleRoles = ids.rolesGreaterThanOrEqualToInfinityDimension;
  const eligible = roles?.some(role => eligibleRoles.includes(role.id));
  return eligible as boolean;
}

export function link(content: string, url: string) {
  return hyperlink(content, hideLinkEmbed(url));
}

export function getBaseLog(x: number, y: number): number {
  return Math.log(y) / Math.log(x);
}

// eslint-disable-next-line max-params
export function makeEnumeration(items: Array<number>, separator = ", ", name = "", length2Separator: string) {
  if (items.length === 0) return "";
  if (items.length === 1) return `${name}${items[0]}`;
  if (items.length === 2) return `${name}${items[0]} ${length2Separator} ${name}${items[1]}`;
  const commaSeparated = items.slice(0, items.length - 1).join(separator);
  const last = items[items.length - 1];
  return `${name}${commaSeparated}, and ${name}${last}`;
}

export const footerText = () => (Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Art by MrKrutaman#1705`);

export function pluralise(word: string, count: number) {
  if (count === 1) {
    return word;
  }
  return `${word}s`;
}

export function quantify(word: string, count: number): string {
  return `${count} ${pluralise(word, count)}`;
}

export function formatNumber(number: number) {
  const exponent = Math.floor(Math.log10(number));
  const mantissa = number / Math.pow(10, exponent);
  return `${mantissa.toFixed(2)}e${exponent}`;
}

export function formatDecimal(number: Decimal | number) {
  const val = number instanceof Decimal ? number : new Decimal(number);
  if (val.lt(1000)) return formatDecimalLessThan1000(val);
  const exponent = Decimal.floor(val.log10());
  const mantissa = val.div(new Decimal(10).pow(exponent));
  return `${mantissa.toFixed(2)}e${exponent}`;
}

export function formatDecimalLessThan1000(number: Decimal) {
  return number.toFixed(2);
}

export function formatPercents(number: number) {
  return `${Math.floor(number * 100)}%`;
}

export function toNumber(string: string) {
  const match = string.match(/^\d+/u);
  if (!match) return 0;
  return parseInt(match[0], 10);
}

export function randomInArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

export function countWhere(array: Array<any>, predicate: Function) {
  let count = 0;
  for (const item of array) {
    if (predicate(item)) ++count;
  }
  return count;
}