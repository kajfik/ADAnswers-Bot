
import { VAchievement, VUnlock } from "../../../utils/types";
import { Colour } from "../../colours";
import { EmbedBuilder } from "discord.js";
import { footerText } from "../../../functions/Misc";
import { format } from "../../format";

interface VAchievements {
  [key: string]: VAchievement
}

interface VObject {
  unlocks: Array<VUnlock>,
  achievements: VAchievements
}

export const V: VObject = {
  unlocks: [
    {
      reward: "You can spend Perk Points to reduce the goal requirement of all tiers of each V-Achievement.",
      requirement: 2
    },
    {
      reward: "Antimatter Dimension power based on total Space Theorems",
      formula: "`1 + sqrt(ST) / 100`",
      requirement: 5
    },
    {
      reward: "Achievement multiplier reduces Auto-EC completion time",
      formula: "`60 * 20 / achievement multiplier` minutes for full completion",
      requirement: 10
    },
    {
      reward: "Unlock the ability to Automatically Purge Glyphs on Reality",
      requirement: 16
    },
    {
      reward: "Achievement multiplier affects Black Hole power",
      requirement: 30
    },
    {
      reward: "Reduce the Space Theorem cost of Time Studies by 2. Unlock Ra, Celestial of the Forgotten",
      requirement: 36
    }
  ],
  achievements: {
    "glyphknight": {
      name: "Glyph Knight",
      description: "Unlock Reality with at most x Glyphs equipped.",
      values: [5, 4, 3, 2, 1, 0],
      currency: "Glyphs equipped"
    },
    "antistellar": {
      name: "AntiStellar",
      description: "Have x total galaxies from all types.",
      values: [4000, 4300, 4600, 4900, 5200, 5500],
      currency: "total Galaxies"
    },
    "se7en": {
      name: "Se7en deadly matters",
      description: "Get x Infinity Points in Eternity Challenge 7.",
      values: ["1e600000", "1e720000", "1e840000", "1e960000", "1e1080000", "1e1200000"],
      currency: "Infinity Points in EC7"
    },
    "youngboy": {
      name: "Young Boy",
      description: "Get x Antimatter in Eternity Challenge 12 without unlocking Time Dilation",
      values: [400e6, 450e6, 500e6, 600e6, 700e6, 800e6],
      currency: "Antimatter in EC12"
    },
    "eternalsunshine": {
      name: "Eternal Sunshine",
      description: "Get x Eternity Points",
      values: ["1e7000", "1e7600", "1e8200", "1e8800", "1e9400", "1e10000"],
      currency: "Eternity Points"
    },
    "matterception": {
      name: "Matterception",
      description: "Get x Dimension Boosts while Dilated and inside Eternity Challenge 5.",
      values: [51, 52, 53, 54, 55, 56],
      currency: "Dimension Boosts while Dilated inside EC5"
    },
    "requiem": {
      name: "Requiem for a Glyph",
      description: "Unlock Reality with at most x Glyphs equipped for the entire Reality.",
      values: [-1, -4, -7, -10, -13],
      currency: "Glyphs equipped"
    },
    "postdestination": {
      name: "Post-destination",
      description: "Get 400,000 Time Theorems with a /x Black Hole or slower, without discharging or entering EC12",
      values: ["1e100", "1e150", "1e200", "1e250", "1e300"],
      currency: "Inverted Black Hole speed"
    },
    "shutterglyph": {
      name: "Shutter Glyph",
      description: "Reach a Glyph of level x",
      values: [6500, 7000, 8000, 9000, 10000],
      currency: "Glyph level"
    }
  }
};

export const VUnlocksEmbed = () => new EmbedBuilder()
  .setTitle("V Unlocks")
  .setColor(Colour.v)
  .addFields(V.unlocks.map(unlock => ({ name: `${unlock.requirement} ST Unlock`, value: `${unlock.reward}\n${unlock.formula ? `Formula: ${unlock.formula}` : ""}`, inline: false })))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export const VAchievementEmbed = (achievement: VAchievement) => new EmbedBuilder()
  .setTitle(achievement.name)
  .setColor(Colour.v)
  .addFields(
    { name: "Requirement", value: achievement.description, inline: false },
    { name: "Unlocks at...", value: `${achievement.values.map(value => format(value)).join(", ")} ${achievement.currency}`, inline: false }
  )
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });