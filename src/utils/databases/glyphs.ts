import { EmbedBuilder, EmbedField } from "discord.js";
import { Colour } from "../colours";
import { GlyphInfo } from "../types";
import { capitalize } from "../extensions";
import { footerText } from "../../functions/Misc";

interface GlyphData {
  [key: string]: GlyphInfo
}

export const basicGlyphs: GlyphData = {
  power: {
    name: "power",
    colour: Colour.antimatter,
    emote: "<:glyph_power:586607087744843776>",
    altText: "Ω",
    effects: {
      "Bottom Left": {
        name: "Antimatter Dimensions Power",
        primary: true,
        effect: "Raise Antimatter Dimensions to a power. (^1.XX)",
        effectFormula: "1.015 + (Level)^0.2 * (1 + 2.5*Rarity)^0.4 / 75",
        stacking: "Additive, based on fraction after 1."
      },
      "Top Left": {
        name: "Antimatter Dimensions Multiplier",
        effect: "Multiply Antimatter Dimensions by a static multiplier.",
        effectFormula: "(Level * (1 + 2.5*Rarity)) ^ (Level * (1 + 2.5*Rarity))",
        stacking: "Multiplicative."
      },
      "Top Right": {
        name: "Dimension Boost Multiplier",
        effect: "Multiply the effect of Dimension Boosts.",
        effectFormula: "sqrt(Level * (1 + 2.5*Rarity))",
        stacking: "Multiplicative",
      },
      "Bottom Right": {
        name: "Buy 10 Multiplier",
        effect: "Multiply the multiplier from buying 10 Antimatter Dimensions.",
        effectFormula: "1 + Level * (1 + 2.5*Rarity) / 12",
        stacking: "Additive with itself, based on the fraction after 1; multiplicative with other boosts",
      }
    }
  },
  infinity: {
    name: "infinity",
    colour: Colour.infinity,
    emote: "<:glyph_infinity:586607119856304129>",
    altText: "∞",
    effects: {
      "Bottom Left": {
        name: "Infinity Dimension Power",
        primary: true,
        effect: "Raise Infinity Dimensions to a power. (^1.XX)",
        effectFormula: "1.007 + (Level)^0.21 * (1 + 2.5*Rarity)^0.4 / 75",
        stacking: "Additive, based on fraction after 1."
      },
      "Top Left": {
        name: "Infinity Power Conversion Exponent increase",
        effect: "Increase the Exponent used to convert Infinity Power into a multiplier on Antimatter Dimensions. (^7.00 -> ^7.XX)",
        effectFormula: "(Level)^0.2 * (1 + 2.5*Rarity)^0.4 / 25",
        stacking: "Additive",
      },
      "Top Right": {
        name: "Infinity Point Multiplier",
        effect: "Multiply Infinity Point gain by a static multipier.",
        effectFormula: "1.00e4 * (Level * (2 + 2.5*Rarity))^6",
        stacking: "Multiplicative",
      },
      "Bottom Right": {
        name: "Infinity Multiplier",
        effect: "Multiply Infinities by a static multiplier.",
        effectFormula: "2 * (Level * (1 + 2.5*Rarity))^1.5",
        stacking: "Multiplicative",
      }
    }
  },
  replication: {
    name: "replication",
    colour: Colour.replication,
    emote: "<:glyph_replication:586607179432460298>",
    altText: "Ξ",
    effects: {
      "Bottom Left": {
        name: "Replicanti Replication Speed",
        effect: "Multiply the speed of Replication (or, divide the Replicanti interval).",
        effectFormula: "3 * (Level * (1 + 2.5*Rarity)",
        stacking: "Multiplicative",
      },
      "Top Left": {
        name: "Replicanti Effect Power",
        effect: "Raise the effect of Replicanti on Infinity (and Time) Dimensions to a power. (^1.XX)",
        effectFormula: "1.1 + sqrt(Level) * (1 + 2.5*Rarity) / 25",
        stacking: "Additive, based on fraction after 1",
      },
      "Top Right": {
        name: "Dilated Time Multiplier based on Replicanti",
        effect: `Multiply Dilated Time gain based on current Replicanti amount.`,
        effectFormula: "3.00e-4 * (Level)^0.3 * (1 + 2.5 * Rarity)^0.65",
        stacking: `"Multiplicative"; this effect is multiplied by 1.00e4 on all glyphs with it, which are then multiplied together, and then divided by 1.00e4 at the end.
This makes the glyph stack reasonably while still providing a boost if you use very low level/rarity glyphs.`
      },
      "Bottom Right": {
        name: "Replication Glyph Level Effect",
        effect: "Increase the exponent in the Replicanti Glyph Level Factor (log(rep)^0.400 -> log(rep)^0.4XX)",
        effectFormula: "sqrt((Level)^0.25 * (1 + 2.5*Rarity)^0.4) / 50",
        stacking: "Additive; softcaps after total effect reaches + ^0.080"
      }
    }
  },
  time: {
    name: "time",
    colour: Colour.eternity,
    emote: "<:glyph_time:586607148985876501>",
    altText: "Δ",
    effects: {
      "Bottom Left": {
        name: "Time Dimension Power",
        primary: true,
        effect: "Raise Time Dimensions to a power. (^1.XX)",
        effectFormula: "1.01 + (Level)^0.32 * (1 + 2.5*Rarity)^0.45 / 75",
        stacking: "Additive, based on fraction after 1",
      },
      "Top Left": {
        name: "Game Speed Multiplier",
        effect: "Multiply Game speed, and effectively everything affected by it. See `/gamevsrealtime` for more information.",
        effectFormula: "1 + (Level)^0.3 * (1 + 2.5*Rarity)^0.65 / 20",
        stacking: "Multiplicative",
      },
      "Top Right": {
        name: "Eternity Multiplier",
        effect: "Multiply Eternities by a static multiplier.",
        effectFormula: "((Level + 3) * (1 + 2.5*Rarity))^0.9",
        stacking: "Multiplicative",
      },
      "Bottom Right": {
        name: "Eternity Point Multiplier",
        effect: "Multiply Eternity Point gain by a static Multiplier.",
        effectFormula: "100 * (Level * (1 + 2.5Rarity))^3",
        stacking: "Multiplicative",
      },
    }
  },
  dilation: {
    name: "dilation",
    colour: Colour.dilation,
    emote: "<:glyph_dilation:586607200626278421>",
    altText: "Ψ",
    effects: {
      "Bottom Left": {
        name: "Dilated Time Multiplier",
        effect: "Multiply Dilated Time by a static multiplier",
        effectFormula: "2 * (Level * (1 + 2.5*Rarity))^1.5",
        stacking: "Multiplicative",
      },
      "Top Left": {
        name: "Tachyon Galaxy Threshold Multiplier",
        effect: `"Multiply" (Divide) the threshold scaling for Tachyon Galaxies. Only affects the fraction after 1.`,
        effectFormula: "1 - ((Level)^0.17 * (1 + 2.5*Rarity)^0.35) / 100",
        stacking: "Multiplicative; this value is always less than 1.",
      },
      "Top Right": {
        name: "Time Theorem Generation",
        effect: "Passively Generate Time Theorems, even without the relevant Dilation Upgrade.",
        effectFormula: "sqrt(Level * (1 + 2.5*Rarity)) / 1.00e4",
        stacking: "Additive",
      },
      "Bottom Right": {
        name: "Dilated Antimatter Dimension Power",
        effect: "Raise all Antimatter Dimensions to a power, but only while in Time Dilation",
        effectFormula: "1.1 + (Level * (1 + 2.5*Rarity))^0.7 / 25",
        stacking: "Additive, based on fraction after 1."
      }
    }
  },
};

export const specialGlyphs: GlyphData = {
  effarig: {
    name: "effarig",
    colour: Colour.effarig,
    // AD doesn't have emotes for Effarig, Cursed, or Reality, so they get the text
    emote: "Ϙ",
    altText: "Ϙ",
    effects: {

    }
  },
  cursed: {
    name: "cursed",
    colour: "#000000",
    emote: "⸸",
    altText: "⸸",
    effects: {
      "Bottom Left": {
        name: "Cursed Galaxies",
        effect: "Reduce the effectiveness of all Galaxies.",
        effectFormula: "level ^ -0.03",
        stacking: "Multiplicative"
      },
      "Top Left": {
        name: "Cursed Tickspeed",
        effect: "The threshold for Tickspeed Upgrades from Time Dimensions is increased.",
        effectFormula: "max(log(level), 1)",
        stacking: "Additive"
      },
      "Top Right": {
        name: "Cursed Dimensions",
        effect: "Reduce all Dimension multipliers.",
        effectFormula: "level ^ -0.035",
        stacking: "Multiplicative"
      },
      "Bottom Right": {
        name: "Cursed EP",
        effect: "Divide EP gain.",
        effectFormula: "10 ^ (-level / 10)",
        stacking: "Multiplicative"
      }
    }
  },
  reality: {
    name: "reality",
    colour: Colour.reality,
    emote: "Ϟ",
    altText: "Ϟ",
    effects: {
      "Bottom Left": {
        name: "Equipped Glyph Level Increase",
        effect: "Increase the effective level of equipped basic Glyphs",
        effectFormula: "floor(sqrt(level * 90))",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      },
      "Top Left": {
        name: "Galaxy Strength Increase",
        effect: "Increase the strength of all Galaxies",
        effectFormula: "1 + sqrt(level / 1000000)",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      },
      "Top Right": {
        name: "Reality Amplifier Amplifier",
        effect: "Multipliers from Reality Upgrade Amplifiers are increased",
        effectFormula: "1 + level / 125000",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      },
      "Bottom Right": {
        name: "Dilation Glyph Level Effect",
        effect: "Dilated Time factor for Glyph level is increased",
        effectFormula: "0.1",
        stacking: "More than one Reality Glyph cannot be equipped simultaneously, dummy!"
      }
    }
  }
};

function FieldsGetter(glyphInfo: GlyphInfo): EmbedField[] {
  const effects = glyphInfo.effects;
  const fields: EmbedField[] = [];
  for (const location in effects) {
    fields.push({
      name: `${location}: ${effects[location].name}`,
      value: effects[location].effect,
      inline: false
    });
  }
  return fields;
}

function SymbolGetter(glyphInfo: GlyphInfo, isADServer: boolean) {
  if (isADServer) return glyphInfo.emote;
  return glyphInfo.altText;
}

export const GlyphEmbedGetter = (glyphInfo: GlyphInfo, isADServer: boolean) => new EmbedBuilder()
  .setTitle(`**${SymbolGetter(glyphInfo, isADServer)}** ${capitalize(glyphInfo.name)}`)
  .setColor(glyphInfo.colour)
  .addFields(FieldsGetter(glyphInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });