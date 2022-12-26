import { ColorResolvable, EmbedBuilder, EmbedField } from "discord.js";
import { footerText, makeEnumeration } from "../../functions/Misc";
import { PerkInfo } from "../types";

const PERK_COLOURS = {
  ANTIMATTER: "#16a94d",
  INFINITY: "#b5813c",
  ETERNITY: "#b540df",
  DILATION: "#5ddd33",
  REALITY: "#026016",

  ACHIEVEMENTS: "#fbda4b",
  AUTOMATION: "#ff2a1f"
};

interface PerkList {
  [key: string]: {
    [key: string]: PerkInfo
  }
}

export const perks: PerkList = {
  achievement: {
    "ACH1": {
      id: "ACH1",
      name: "Achievement Timer Reduction 1",
      effect: "Reduce the Achievement timer to 20 minutes per Achievement (10 minute decrease).",
      prerequisites: ["START"],
    },
    "ACH2": {
      id: "ACH2",
      name: "Achievement Timer Reduction 2",
      effect: "Reduce the Achievement timer to 12 minutes per Achievement (8 minute decrease).",
      prerequisites: ["ACH1"],
    },
    "ACH3": {
      id: "ACH3",
      name: "Achievement Timer Reduction 3",
      effect: "Reduce the Achievement timer to 6 minutes per Achievement (6 minute decrease).",
      prerequisites: ["ACH2"],
    },
    "ACH4": {
      id: "ACH4",
      name: "Achievement Timer Reduction 4",
      effect: "Reduce the Achievement timer to 2 minutes per Achievement (4 minute decrease).",
      prerequisites: ["ACH3"],
    },
    "ACHNR": {
      id: "ACHNR",
      name: "Achievement No Reset",
      effect: "Reality no longer resets your Achievements.",
      prerequisites: ["ACH3"],
    },
  },
  antimatter: {
    "SAM": {
      id: "SAM",
      name: "Starting Antimatter",
      effect: "Start every reset with 5e130 antimatter.",
      prerequisites: ["START"],
    },
    "ANR": {
      id: "ANR",
      name: "Antimatter No Reset",
      effect: "Dimension Boosts and Antimatter Galaxies no longer reset Antimatter, Antimatter Dimensions, Tickspeed, or Dimensional Sacrifice.",
      prerequisites: ["SAM"],
    }
  },
  automation: {
    "TTS": {
      id: "TTS",
      name: "Single Time Theorem Autobuyer",
      effect: "Unlock a Time Theorem Autobuyer which buys single Time Theorems every tick.",
      prerequisites: ["ACT"],
    },
    "TTF": {
      id: "TTF",
      name: "Free Time Theorems",
      effect: "Purchasing Time Theorems no longer spends your Antimatter, Infinity Points, or Eternity Points.",
      prerequisites: ["TTS"],
    },
    "TTM": {
      id: "TTM",
      name: "Max Time Theorems Autobuyer",
      effect: "Upgrade the Time Theorem Autobuyer to buy max Time Theorems.",
      prerequisites: ["TTF"],
    },
    "PEC1": {
      id: "PEC1",
      name: "Passive Eternity Challenges 1",
      effect: "Auto-complete one Eternity Challenge every 60 minutes (real-time). ECs will be completed sequentially, requiring all previous ECs to be fully completed before progressing to the next EC.",
      prerequisites: ["IDL"],
    },
    "PEC2": {
      id: "PEC2",
      name: "Passive Eternity Challenges 2",
      effect: "Auto-complete one Eternity Challenge every 40 minutes (real-time).",
      prerequisites: ["PEC1"],
    },
    "PEC3": {
      id: "PEC3",
      name: "Passive Eternity Challenges 3",
      effect: "Auto-complete one Eternity Challenge every 20 minutes (real-time).",
      prerequisites: ["PEC2"],
    },
    "IDAS": {
      id: "IDAS",
      name: "Infinity Dimension Autobuyer Speed",
      effect: "Infinity Dimension autobuyers work x3 faster.",
      prerequisites: ["SIP1"],
    },
    "REPAS": {
      id: "REPAS",
      name: "Replicanti Autobuyer Speed",
      effect: "Replicanti autobuyers work x3 faster.",
      prerequisites: ["SIP2"],
    },
    "DAU": {
      id: "DAU",
      name: "Dilation Autobuyers for Upgrades",
      effect: "Unlock autobuyers for the repeatable Dilation Upgrades.",
      prerequisites: ["EU1", "TGR"],
    },
    "DAS": {
      id: "DAS",
      name: "Dilation Autobuyer Speed",
      effect: `Dilation Upgrade autobuyers work x3 faster.`,
      prerequisites: ["ATT"],
    }
  },
  infinity: {
    "SIP1": {
      id: "SIP1",
      name: "Starting Infinity Points 1",
      effect: "Start evert Eternity and Reality with 5e15 Infinity Points",
      prerequisites: ["SAM"],
    },
    "SIP2": {
      id: "SIP2",
      name: "Starting Infinity Points 2",
      effect: "Start evert Eternity and Reality with 5e130 Infinity Points",
      prerequisites: ["SIP1"],
    },
    "IDR": {
      id: "IDR",
      name: "Infinity Dimension Requirement Removal",
      effect: "Infinity Dimensions no longer have Antimatter requirements",
      prerequisites: ["SIP2"],
    },
  },
  eternity: {
    "EC5R": {
      id: "EC5R",
      name: "Eternity Challenge 5 Requirement Removal",
      effect: "Remove the Eternity Challenge 5 requirement from Time Study 62.",
      prerequisites: ["START"],
    },
    "ACT": {
      id: "ACT",
      name: "Active Path Buff",
      effect: "Active path multipliers are always maximized.",
      prerequisites: ["EC5R"],
    },
    "IDL": {
      id: "IDL",
      name: "Idle Path Buff",
      effect: "Idle path multipliers start as if you have spent 15 minutes in this Infinity/Eternity.",
      prerequisites: ["EC5R"],
    },
    "PASS": {
      id: "PASS",
      name: "Passive Path Buff",
      effect: "Improve Time Study 122 to x50 Eternity Points and Time Study 142 to x1e50 Infinity Points. In addition, Time Study 132 also makes Replicanti 3 times faster.",
      prerequisites: ["EC5R"],
    },
    "EC1R": {
      id: "EC1R",
      name: "Eternity Challenge 1 Requirement Removal",
      effect: "Remove the Eternity Challenge 1 requirement from Time Study 181.",
      prerequisites: ["PASS", "EC2R", "EC3R"],
    },
    "EC2R": {
      id: "EC2R",
      name: "Eternity Challenge 2 Requirement Removal",
      effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
      prerequisites: ["ACT", "EC1R"],
    },
    "EC3R": {
      id: "EC3R",
      name: "Eternity Challenge 3 Requirement Removal",
      effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
      prerequisites: ["IDL", "EC1R"],
    },
    "ECR": {
      id: "ECR",
      name: "Eternity Challenge Requirements Removal",
      effect: "Remove non-Time Theorem requirements for unlocking Eternity Challenges.",
      prerequisites: ["EC1R"],
    },
    "ECB": {
      id: "ECB",
      name: "Eternity Challenge Bulk Completion",
      effect: "You can complete multiple tiers of Eternity Challenges at once if you reach the goal for a higher completion of that challenge.",
      prerequisites: ["ECR"],
    },
    "SEP1": {
      id: "SEP1",
      name: "Starting Eternity Points 1",
      effect: "Start evert Reality with 10 Eternity Points",
      prerequisites: ["ANR", "SIP1", "STP"],
    },
    "SEP2": {
      id: "SEP2",
      name: "Starting Eternity Points 2",
      effect: "Start evert Reality with 5e3 Eternity Points",
      prerequisites: ["SEP1"],
    },
    "SEP3": {
      id: "SEP3",
      name: "Starting Eternity Points 3",
      effect: "Start evert Reality with 5e9 Eternity Points",
      prerequisites: ["SEP2"],
    },
    "EU1": {
      id: "EU1",
      name: "Eternity Upgrades 1",
      effect: "Automatically unlock the first row of Eternity Upgrades for free once you have Eternities.",
      prerequisites: ["START"],
    },
    "EU2": {
      id: "EU2",
      name: "Eternity Upgrades 2",
      effect: "The second row of Eternity Upgrades is automatically purchased at x1e10 times less than their original price",
      prerequisites: ["EU1", "DAU"],
    },

  },
  dilation: {
    "STP": {
      id: "STP",
      name: "Starting Tachyon Particles",
      effect: "After unlocking Dilation, gain 10 Tachyon Particles",
      prerequisites: ["SEP1", "TP1"],
    },
    "DILR": {
      id: "DILR",
      name: "Dilation Requirement Removal",
      effect: `Remove the Eternity Challenge 11, Eternity Challenge 12, and total Time Theorem requirements from Time Dilation unlock.`,
      prerequisites: ["DAU"],
    },
    "TGR": {
      id: "TGR",
      name: "Tachyon Galaxy No Reset",
      effect: "The 2nd rebuyable Dilation Upgrade no longer resets your Dilated Time.",
      prerequisites: ["TP1", "DAU"],
    },
    "TP1": {
      id: "TP1",
      name: "Retroactive Tachyon Particles 1",
      effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 1.5.`,
      prerequisites: ["STP", "TGR"],
    },
    "TP2": {
      id: "TP2",
      name: "Retroactive Tachyon Particles 2",
      effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.`,
      prerequisites: ["TP1"],
    },
    "TP3": {
      id: "TP3",
      name: "Retroactive Tachyon Particles 3",
      effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.5.`,
      prerequisites: ["TP2"],
    },
    "TP4": {
      id: "TP4",
      name: "Retroactive Tachyon Particles 4",
      effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 3.`,
      prerequisites: ["TP3"],
    },
    "UD1": {
      id: "UD1",
      name: "Dilation Upgrades 1",
      effect: `After unlocking Dilation, automatically unlock the second row of Dilation Upgrades for free.`,
      prerequisites: ["DAU"],
    },
    "UD2": {
      id: "UD2",
      name: "Dilation Upgrades 2",
      effect: `After unlocking Dilation, automatically unlock the third row of Dilation Upgrades for free.`,
      prerequisites: ["UD1"],
    },
    "ATT": {
      id: "ATT",
      name: `"Automatic Time Theorems" Automation`,
      effect: `Automatically purchase the passive Time Theorem generation Dilation Upgrade once you can afford it.`,
      prerequisites: ["UD2"],
    },
    "ATD": {
      id: "ATD",
      name: "Automatic Time Dimensions Unlock",
      effect: `Auto-unlock Time Dimensions 5-8 once you can afford them.`,
      prerequisites: ["ATT"],
    }
  },
  reality: {
    "START": {
      id: "START",
      name: "Starting Perk",
      effect: `Remove the achievement requirement from the Reality Study and allow you to choose from 4 different Glyphs on Reality.`,
      prerequisites: [],
    },
    "REAL": {
      id: "REAL",
      name: "Automatic Reality Purchasing",
      effect: `Auto-unlocks Reality once you have 1e4000 Eternity Points and have unlocked Time Dimension 8.`,
      prerequisites: ["ATD"],
    }
  }
};

function FieldGetter(perkInfo: PerkInfo): EmbedField[] {
  const fields: EmbedField[] = [
    { name: "Effect", value: perkInfo.effect, inline: false },
  ];
  if (perkInfo.prerequisites.length !== 0) fields.push({ name: "Requires Perks", value: makeEnumeration<string>(perkInfo.prerequisites), inline: false });
  return fields;
}

const AchievementPerk = (perkInfo: PerkInfo) => new EmbedBuilder()
  .setTitle(perkInfo.name)
  .setColor(PERK_COLOURS.ACHIEVEMENTS as ColorResolvable)
  .addFields(FieldGetter(perkInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const AntimatterPerk = (perkInfo: PerkInfo) => new EmbedBuilder()
  .setTitle(perkInfo.name)
  .setColor(PERK_COLOURS.ANTIMATTER as ColorResolvable)
  .addFields(FieldGetter(perkInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const AutomationPerk = (perkInfo: PerkInfo) => new EmbedBuilder()
  .setTitle(perkInfo.name)
  .setColor(PERK_COLOURS.AUTOMATION as ColorResolvable)
  .addFields(FieldGetter(perkInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const InfinityPerk = (perkInfo: PerkInfo) => new EmbedBuilder()
  .setTitle(perkInfo.name)
  .setColor(PERK_COLOURS.INFINITY as ColorResolvable)
  .addFields(FieldGetter(perkInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const EternityPerk = (perkInfo: PerkInfo) => new EmbedBuilder()
  .setTitle(perkInfo.name)
  .setColor(PERK_COLOURS.ETERNITY as ColorResolvable)
  .addFields(FieldGetter(perkInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const DilationPerk = (perkInfo: PerkInfo) => new EmbedBuilder()
  .setTitle(perkInfo.name)
  .setColor(PERK_COLOURS.DILATION as ColorResolvable)
  .addFields(FieldGetter(perkInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const RealityPerk = (perkInfo: PerkInfo) => new EmbedBuilder()
  .setTitle(perkInfo.name)
  .setColor(PERK_COLOURS.REALITY as ColorResolvable)
  .addFields(FieldGetter(perkInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

interface EmbedGetters {
  [key: string]: Function;
}

export const PerkEmbedGetters: EmbedGetters = {
  achievement: AchievementPerk,
  antimatter: AntimatterPerk,
  automation: AutomationPerk,
  infinity: InfinityPerk,
  eternity: EternityPerk,
  dilation: DilationPerk,
  reality: RealityPerk
};

/* eslint-disable multiline-comment-style */
/*
interface PerkList {
  [key: string]: PerkInfo
}

export const Perks: PerkList = {
  // The branches are:
  // Achievement Branch
  // Time Study Branch
  // Recovery Branch
  // Dilation Branch
  // I took the naming scheme provided to me by a compiled document
  // from the Reality-to-Cel1-unlock channel.

  "START": {
    id: "START",
    name: "Perk Tree Root",
    effect: `Remove the achievement requirement from the Reality Study and allow you to choose from 4 different Glyphs on Reality.`,
    colour: PERK_COLOURS.REALITY,
    prerequisites: [],
    reqType: PERK_REQUIREMENT_TYPE.NONE
  },

  // Achievement Branch.
  "ACH1": {
    id: "ACH1",
    name: "Achievement Timer Reduction 1",
    effect: "Reduce the Achievement timer to 20 minutes per Achievement (10 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACH2": {
    id: "ACH2",
    name: "Achievement Timer Reduction 2",
    effect: "Reduce the Achievement timer to 12 minutes per Achievement (8 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACH3": {
    id: "ACH3",
    name: "Achievement Timer Reduction 3",
    effect: "Reduce the Achievement timer to 6 minutes per Achievement (6 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACH4": {
    id: "ACH4",
    name: "Achievement Timer Reduction 4",
    effect: "Reduce the Achievement timer to 2 minutes per Achievement (4 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH3"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACHNR": {
    id: "ACHNR",
    name: "Achievement Never Reset",
    effect: "Reality no longer resets your Achievements.",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH3"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },

  // Time Study branch
  "EC5R": {
    id: "EC5R",
    name: "Eternity Challenge 5 Requirement Removal",
    effect: "Remove the Eternity Challenge 5 requirement from Time Study 62.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Time Theorem / "active" subbranch.
  "ACT": {
    id: "ACT",
    name: "Active Path Buff",
    effect: "Active path multipliers are always maximized.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EC5R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TTS": {
    id: "TTS",
    name: "Single Time Theorem Autobuyer",
    effect: "Unlock a Time Theorem Autobuyer which buys single Time Theorems every tick.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["ACT"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TTF": {
    id: "TTF",
    name: "Free Time Theorems",
    effect: "Purchasing Time Theorems no longer spends your Antimatter, Infinity Points, or Eternity Points.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["TTS"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TTM": {
    id: "TTM",
    name: "Max Time Theorems Autobuyer",
    effect: "Upgrade the Time Theorem Autobuyer to buy max Time Theorems.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["TTF"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Passive EC / "idle" subbranch.
  "IDL": {
    id: "IDL",
    name: "Idle Path Buff",
    effect: "Idle path multipliers start as if you have spent 15 minutes in this Infinity/Eternity.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EC5R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "PEC1": {
    id: "PEC1",
    name: "Passive Eternity Challenges 1",
    effect: "Auto-complete one Eternity Challenge every 60 minutes (real-time). ECs will be completed sequentially, requiring all previous ECs to be fully completed before progressing to the next EC.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["IDL"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "PEC2": {
    id: "PEC2",
    name: "Passive Eternity Challenges 2",
    effect: "Auto-complete one Eternity Challenge every 40 minutes (real-time).",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["PEC1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "PEC3": {
    id: "PEC3",
    name: "Passive Eternity Challenges 3",
    effect: "Auto-complete one Eternity Challenge every 20 minutes (real-time).",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["PEC2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // EC streamline / "passive" subbranch,
  "PASS": {
    id: "PASS",
    name: "Passive Path Buff",
    effect: "Improve Time Study 122 to x50 Eternity Points and Time Study 142 to x1e50 Infinity Points. In addition, Time Study 132 also makes Replicanti 3 times faster.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EC5R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "EC1R": {
    id: "C1R",
    name: "Eternity Challenge 1 Requirement Removal",
    effect: "Remove the Eternity Challenge 1 requirement from Time Study 181.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["PASS", "EC2R", "EC3R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR3(this.prerequisites[0], this.prerequisites[1], this.prerequisites[2]);
    }
  },
  "EC2R": {
    id: "EC2R",
    name: "Eternity Challenge 2 Requirement Removal",
    effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["ACT", "EC1R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "EC3R": {
    id: "EC3R",
    name: "Eternity Challenge 3 Requirement Removal",
    effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["IDL", "EC1R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "ECR": {
    id: "ECR",
    name: "Eternity Challenge Requirements Removal",
    effect: "Remove non-Time Theorem requirements for unlocking Eternity Challenges.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EC1R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ECB": {
    id: "ECB",
    name: "Eternity Challenge Bulk Completion",
    effect: "You can complete multiple tiers of Eternity Challenges at once if you reach the goal for a higher completion of that challenge.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["ECR"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },

  // Recovery branch.
  "SAM": {
    id: "SAM",
    name: "Starting Antimatter",
    effect: "Start every reset with 5e130 antimatter.",
    colour: PERK_COLOURS.ANTIMATTER,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ANR": {
    id: "ANR",
    name: "Antimatter No Reset",
    effect: "Dimension Boosts and Antimatter Galaxies no longer reset Antimatter, Antimatter Dimensions, Tickspeed, or Dimensional Sacrifice.",
    colour: PERK_COLOURS.ANTIMATTER,
    prerequisites: ["SAM"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Starting EP subbranch
  "SEP1": {
    id: "SEP1",
    name: "Starting Eternity Points 1",
    effect: "Start evert Reality with 10 Eternity Points",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["ANR", "SIP1", "STP"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR3(this.prerequisites[0], this.prerequisites[1], this.prerequisites[2]);
    }
  },
  "SEP2": {
    id: "SEP2",
    name: "Starting Eternity Points 2",
    effect: "Start evert Reality with 5e3 Eternity Points",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["SEP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "SEP3": {
    id: "SEP3",
    name: "Starting Eternity Points 3",
    effect: "Start evert Reality with 5e9 Eternity Points",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["SEP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // TP1 and other Dilation stuff are in the Dilation Branch below.
  "STP": {
    id: "STP",
    name: "Starting Tachyon Particles",
    effect: "After unlocking Dilation, gain 10 Tachyon Particles",
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["SEP1", "TP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  // Starting IP subbranch
  "SIP1": {
    id: "SIP1",
    name: "Starting Infinity Points 1",
    effect: "Start evert Eternity and Reality with 5e15 Infinity Points",
    colour: PERK_COLOURS.INFINITY,
    prerequisites: ["SAM"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "IDAS": {
    id: "IDAS",
    name: "Infinity Dimension Autobuyer Speed",
    effect: "Infinity Dimension autobuyers work x3 faster.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["SIP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "SIP2": {
    id: "SIP2",
    name: "Starting Infinity Points 2",
    effect: "Start evert Eternity and Reality with 5e130 Infinity Points",
    colour: PERK_COLOURS.INFINITY,
    prerequisites: ["SIP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "REPAS": {
    id: "REPAS",
    name: "Replicanti Autobuyer Speed",
    effect: "Replicanti autobuyers work x3 faster.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["SIP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "IDR": {
    id: "IDR",
    name: "Infinity Dimension Requirement Removal",
    effect: "Infinity Dimensions no longer have Antimatter requirements",
    colour: PERK_COLOURS.INFINITY,
    prerequisites: ["SIP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },

  // Dilation Branch
  "EU1": {
    id: "EU1",
    name: "Eternity Upgrades 1",
    effect: "Automatically unlock the first row of Eternity Upgrades for free once you have Eternities.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // EU2 through SEP1 are all annoying because you can get to them by going either via EU1 or SAM from START.
  "EU2": {
    id: "EU2",
    name: "Eternity Upgrades 2",
    effect: "The second row of Eternity Upgrades is automatically purchased at x1e10 times less than their original price",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EU1", "DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "DAU": {
    id: "DAU",
    name: "Dilation Autobuyers for Upgrades",
    effect: "Unlock autobuyers for the repeatable Dilation Upgrades.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["EU1", "TGR"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "DILR": {
    id: "DILR",
    name: "Dilation Requirement Removal",
    effect: `Remove the Eternity Challenge 11, Eternity Challenge 12, and total Time Theorem requirements from Time Dilation unlock.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Tachyon subbranch
  "TGR": {
    id: "TGR",
    name: "Tachyon Galaxy Never Reset",
    effect: "The 2nd rebuyable Dilation Upgrade no longer resets your Dilated Time.",
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP1", "DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "TP1": {
    id: "TP1",
    name: "Retroactive Tachyon Particles 1",
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 1.5.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["STP", "TGR"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "TP2": {
    id: "TP2",
    name: "Retroactive Tachyon Particles 2",
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TP3": {
    id: "TP3",
    name: "Retroactive Tachyon Particles 3",
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.5.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TP4": {
    id: "TP4",
    name: "Retroactive Tachyon Particles 4",
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 3.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP3"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Dilation Upgrades subbranch
  "UD1": {
    id: "UD1",
    name: "Dilation Upgrades 1",
    effect: `After unlocking Dilation, automatically unlock the second row of Dilation Upgrades for free.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "UD2": {
    id: "UD2",
    name: "Dilation Upgrades 2",
    effect: `After unlocking Dilation, automatically unlock the third row of Dilation Upgrades for free.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["UD1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ATT": {
    id: "ATT",
    name: `"Automatic Time Theorems" Automation`,
    effect: `Automatically purchase the passive Time Theorem generation Dilation Upgrade once you can afford it.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["UD2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "DAS": {
    id: "DAS",
    name: "Dilation Autobuyer Speed",
    effect: `Dilation Upgrade autobuyers work x3 faster.`,
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["ATT"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ATD": {
    id: "ATD",
    name: "Automatic Time Dimensions Unlock",
    effect: `Auto-unlock Time Dimensions 5-8 once you can afford them.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["ATT"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "REAL": {
    id: "REAL",
    name: "Automatic Reality Purchasing",
    effect: `Auto-unlocks Reality once you have 1e4000 Eternity Points and have unlocked Time Dimension 8.`,
    colour: PERK_COLOURS.REALITY,
    prerequisites: ["ATD"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
};
*/