import { PerkShopUpgrade, TeresaUnlock } from "../../types";
import { footerText, quantify } from "../../../functions/Misc";
import { Colour } from "../../colours";
import { EmbedBuilder } from "discord.js";
import { format } from "../../format";

interface TeresaObject {
  info: string,
  reality: {
    challenge: string,
    reward: string,
    formula: string,
  },
  mechanic: {
    reward: string,
    formula: string,
  },
  perkShop: Array<PerkShopUpgrade>,
  unlocks: Array<TeresaUnlock>,
}

export const TeresaRealityEmbed = () => new EmbedBuilder()
  .setTitle("Teresa's Reality")
  .setColor(Colour.teresa)
  .addFields(
    { name: "Challenge", value: Teresa.reality.challenge },
    { name: "Reward", value: `${Teresa.reality.reward}\nFormula: ${Teresa.reality.formula}` },
    { name: "Mechanic", value: `${Teresa.mechanic.reward} with formula ${Teresa.mechanic.formula}` }
  )
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export const TeresaPerkShopEmbed = () => new EmbedBuilder()
  .setTitle("Teresa's Perk Shop")
  .setColor(Colour.teresa)
  .addFields(Teresa.perkShop.map(buyable => (
    { name: `${buyable.name}`,
      value: `${buyable.description}\n**Cost:** ${quantify("Perk Point", buyable.initialCost)} (with x${buyable.increment} cost increase per purchase)\n**Cap:** ${buyable.cap}`
    })))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export const TeresaUnlockEmbed = () => new EmbedBuilder()
  .setTitle("Teresa's Unlocks")
  .setColor(Colour.teresa)
  .addFields(Teresa.unlocks.map(unlock => ({ name: `${format(unlock.requirement)} Reality Machines`, value: unlock.reward })))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export const Teresa: TeresaObject = {
  // eslint-disable-next-line max-len
  info: `Teresa, the first Celestial, is unlocked by obtaining all Reality Upgrades (Achievement 147). The main screen features a bar with a "Pour RM" button, allowing you to deposit RM into a container for a Reality Machine multiplier. Once poured, RM cannot be retrieved. Unlocking Teresa's Reality requires reaching 1e14 RM inside the container. Completing Teresa's Reality multiplies Glyph Sacrifice based on antimatter gained during the run. However, progress requires continuous pouring of RM. Reaching 1e21 RM in the container unlocks the next Celestial. Teresa's Reality can be repeated, with stronger rewards obtained by achieving higher antimatter amounts on subsequent runs.`,
  reality: {
    challenge: `Glyph Time Theorem generation is disabled. You gain less Infinity Points and Eternity Points (x^0.55). This Reality can be repeated for a stronger reward based on the antimatter gained within it.`,
    reward: "Improve GLyph Sacrifice power",
    formula: "x`max((log10(antimatter) / 1.5e8)^12, 1)`"
  },
  mechanic: {
    reward: "You can pour Reality Machines into a container for various unlocks, including Teresa's Reality, as well as a Reality Machine multiplier",
    formula: "x`max(250 * (poured / 1e24)^0.1, 1)`"
  },
  perkShop: [
    {
      name: "Glyph Level Increase",
      initialCost: 1,
      increment: 2,
      description: "Increase pre-Instability Glyph levels by 5%",
      cap: "11 purchases (20 with relevant Ra unlock)"
    },
    {
      name: "Reality Machine Increase",
      initialCost: 1,
      increment: 2,
      description: "Double Reality Machine gain",
      cap: "11 purchases (20 with relevant Ra unlock)"
    },
    {
      name: "Dilation Autobuyer Bulk",
      initialCost: 100,
      increment: 2,
      description: "Buy twice as many Dilation upgrades at once",
      cap: "4 purchases (14 with relevant Ra unlock)"
    },
    {
      name: "Autobuyer Speedup",
      initialCost: 1000,
      increment: 2,
      description: "Infinity Dimension, Time Dimension, Dilation, and Replicanti autobuyers are 2x faster",
      cap: "2 purchases (6 with relevant Ra unlock)"
    },
    {
      name: "Single Music Glyph",
      initialCost: 1,
      increment: 1,
      description: "Reveive a Music Glyph of a random type that is 80% of your highest level. Try clicking it!",
      cap: "None"
    },
    {
      name: "Multiple Music Glyph",
      initialCost: 1,
      increment: 1,
      description: "Fill all empty slots in your inventory with Music Glyphs.",
      cap: "None"
    },
  ],
  unlocks: [
    {
      requirement: 1e6,
      reward: "You start Reality with all Eternity Upgrades unlocked"
    },
    {
      requirement: 1e10,
      reward: "Unlock \"Undo\" of equipping a Glyph"
    },
    {
      requirement: 1e14,
      reward: "Unlock Teresa's Reality"
    },
    {
      requirement: 1e18,
      reward: "Unlock passive Eternity Point generation"
    },
    {
      requirement: 1e21,
      reward: "Unlock Effarig, Celestial of Ancient Relics."
    },
    {
      requirement: 1e24,
      reward: "Unlock Teresa's Perk Point Shop."
    }
  ]
};