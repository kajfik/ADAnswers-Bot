// Import { EmbedBuilder, EmbedField } from "discord.js";

const PERK_COLOURS = {
  ANTIMATTER: "#16a94d",
  INFINITY: "#b5813c",
  ETERNITY: "#b540df",
  DILATION: "#5ddd33",
  REALITY: "#026016",

  ACHIEVEMENTS: "#fbda4b",
  AUTOMATION: "#ff2a1f"
};

export type PerkInfo = {
  effect: string,
  colour: string,
  prerequisites: string[],
  reqType: string,
}

const PERK_REQUIREMENT_TYPE = {
  NONE: "",
  ONE: (perk: string) => `${perk}`,
  OR: (perk: string, perk2: string) => `${perk} or ${perk2}`
};

interface PerkList {
  [key: string]: PerkInfo
}

export const Perks: PerkList = {
  "START": {
    effect: `Remove the achievement requirement from the Reality Study and allow you to choose from 4 different Glyphs on Reality.`,
    colour: PERK_COLOURS.REALITY,
    prerequisites: [],
    reqType: PERK_REQUIREMENT_TYPE.NONE
  },
  "SAM": {
    effect: "Start every reset with 5e130 antimatter.",
    colour: PERK_COLOURS.ANTIMATTER,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  }
};