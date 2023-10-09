
import { VAchievement, VUnlock } from "../../../utils/types";
import { Colour } from "../../colours";
import { EmbedBuilder } from "discord.js";
import { footerText } from "../../../functions/Misc";
import { format } from "../../format";

interface VAchievements {
  [key: string]: VAchievement
}

interface VObject {
  info: string,
  reality: string,
  embeds: {
    unlocks: Function,
    achievements: Function
  },
  unlocks: Array<VUnlock>,
  achievements: VAchievements
}

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

export const V: VObject = {
  // eslint-disable-next-line max-len
  info: `V is a unique Celestial unlocked by completing Achievement ID 151, requiring 800 Antimatter Galaxies without buying the 8th Antimatter Dimension in your current Infinity. Once unlocked, V has additional requirements for full access. You must complete 10,000 Realities, have 1e60 unspent RM, and reach specific milestones in Eternities, Infinities, Dilated Time, and Replicanti, all within the same Reality. Upon meeting these requirements, you can enter V's Reality. However, the completion of the Reality is just the beginning. V has six requirements, each linked to progress within V's Reality, rewarding V-Achievements. V-Achievements persist after leaving V's Reality and can be completed multiple times. Completed V-Achievements unlock upgrades on the V tab and grant Space Theorems. Space Theorems allow the purchase of normally forbidden Time Studies, including multiple paths in the Pace Split and both Time Studies within a dark/light pair. They are replenished upon respeccing studies. Reducing goals with 2 V-Achievements makes certain V-Achievement requirements easier by spending Perk Points. The cost remains constant and applies to future tiers as well. Having 36 V-Achievements unlocks the next Celestial.`,
  // eslint-disable-next-line max-len
  reality: `All Dimension multipliers, Eternity Point gain, Infinity Point gain, and Dilated Time gain per second are square-rooted. The Replicanti interval is squared. The Exponential Glyph Alchemy effect is disabled. V does not have a direct reward from its Reality.`,
  embeds: {
    unlocks: VUnlocksEmbed,
    achievements: VAchievementEmbed
  },
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