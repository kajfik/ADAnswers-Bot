import { hideLinkEmbed, hyperlink } from "@discordjs/builders";
import { BaseCommandInteraction } from "discord.js";
import { ids } from "../config.json";

export function isHelper(interaction: BaseCommandInteraction): boolean | undefined {
  // Now that's an expression!
  return interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(ids.helperRole);
}

export function isEligibleForHelper(interaction: BaseCommandInteraction): boolean {
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

export function formatNumber(number: number) {
  const exponent = Math.floor(Math.log10(number));
  const mantissa = number / Math.pow(10, exponent);
  return `${mantissa.toFixed(2)}e${exponent}`;
}

export function toNumber(string: string) {
  const match = string.match(/^\d+/u);
  if (!match) return 0;
  return parseInt(match[0], 10);
}