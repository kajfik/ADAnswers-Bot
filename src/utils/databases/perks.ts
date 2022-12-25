import { PerkInfo } from "../types";
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

const PERK_REQUIREMENT_TYPE = {
  NONE: "",
  ONE: (perk: string) => `${perk}`,
  OR: (perk: string, perk2: string) => `${perk} or ${perk2}`,
  // Sorry, Earth.
  OR3: (perk: string, perk2: string, perk3: string) => `${perk}, ${perk2}, or ${perk3}`
};

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
    effect: `Remove the achievement requirement from the Reality Study and allow you to choose from 4 different Glyphs on Reality.`,
    colour: PERK_COLOURS.REALITY,
    prerequisites: [],
    reqType: PERK_REQUIREMENT_TYPE.NONE
  },

  // Achievement Branch.
  "ACH1": {
    effect: "Reduce the Achievement timer to 20 minutes per Achievement (10 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACH2": {
    effect: "Reduce the Achievement timer to 12 minutes per Achievement (8 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACH3": {
    effect: "Reduce the Achievement timer to 6 minutes per Achievement (6 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACH4": {
    effect: "Reduce the Achievement timer to 2 minutes per Achievement (4 minute decrease).",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH3"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ACHNR": {
    effect: "Reality no longer resets your Achievements.",
    colour: PERK_COLOURS.ACHIEVEMENTS,
    prerequisites: ["ACH3"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },

  // Time Study branch
  "EC5R": {
    effect: "Remove the Eternity Challenge 5 requirement from Time Study 62.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Time Theorem / "active" subbranch.
  "ACT": {
    effect: "Active path multipliers are always maximized.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EC5R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TTS": {
    effect: "Unlock a Time Theorem Autobuyer which buys single Time Theorems every tick.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["ACT"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TTF": {
    effect: "Purchasing Time Theorems no longer spends your Antimatter, Infinity Points, or Eternity Points.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["TTS"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TTM": {
    effect: "Upgrade the Time Theorem Autobuyer to buy max Time Theorems.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["TTF"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Passive EC / "idle" subbranch.
  "IDL": {
    effect: "Idle path multipliers start as if you have spent 15 minutes in this Infinity/Eternity.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["EC5R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "PEC1": {
    effect: "Auto-complete one Eternity Challenge every 60 minutes (real-time). ECs will be completed sequentially, requiring all previous ECs to be fully completed before progressing to the next EC.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["IDL"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "PEC2": {
    effect: "Auto-complete one Eternity Challenge every 40 minutes (real-time).",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["PEC1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "PEC3": {
    effect: "Auto-complete one Eternity Challenge every 20 minutes (real-time).",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["PEC2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // EC streamline / "passive" subbranch,
  "PASS": {
    effect: "Improve Time Study 122 to x50 Eternity Points and Time Study 142 to x1e50 Infinity Points. In addition, Time Study 132 also makes Replicanti 3 times faster.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EC5R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "EC1R": {
    effect: "Remove the Eternity Challenge 1 requirement from Time Study 181.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["PASS", "EC2R", "EC3R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR3(this.prerequisites[0], this.prerequisites[1], this.prerequisites[2]);
    }
  },
  "EC2R": {
    effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["ACT", "EC1R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "EC3R": {
    effect: "Remove the Eternity Challenge 2 requirement from Time Study 181.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["IDL", "EC1R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "ECR": {
    effect: "Remove non-Time Theorem requirements for unlocking Eternity Challenges.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EC1R"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ECB": {
    effect: "You can complete multiple tiers of Eternity Challenges at once if you reach the goal for a higher completion of that challenge.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["ECR"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },

  // Recovery branch.
  "SAM": {
    effect: "Start every reset with 5e130 antimatter.",
    colour: PERK_COLOURS.ANTIMATTER,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ANR": {
    effect: "Dimension Boosts and Antimatter Galaxies no longer reset Antimatter, Antimatter Dimensions, Tickspeed, or Dimensional Sacrifice.",
    colour: PERK_COLOURS.ANTIMATTER,
    prerequisites: ["SAM"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Starting EP subbranch
  "SEP1": {
    effect: "Start evert Reality with 10 Eternity Points",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["ANR", "SIP1", "STP"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR3(this.prerequisites[0], this.prerequisites[1], this.prerequisites[2]);
    }
  },
  "SEP2": {
    effect: "Start evert Reality with 5e3 Eternity Points",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["SEP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "SEP3": {
    effect: "Start evert Reality with 5e9 Eternity Points",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["SEP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // TP1 and other Dilation stuff are in the Dilation Branch below.
  "STP": {
    effect: "After unlocking Dilation, gain 10 Tachyon Particles",
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["SEP1", "TP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  // Starting IP subbranch
  "SIP1": {
    effect: "Start evert Eternity and Reality with 5e15 Infinity Points",
    colour: PERK_COLOURS.INFINITY,
    prerequisites: ["SAM"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "IDAS": {
    effect: "Infinity Dimension autobuyers work x3 faster.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["SIP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "SIP2": {
    effect: "Start evert Eternity and Reality with 5e130 Infinity Points",
    colour: PERK_COLOURS.INFINITY,
    prerequisites: ["SIP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "REPAS": {
    effect: "Replicanti autobuyers work x3 faster.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["SIP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "IDR": {
    effect: "Infinity Dimensions no longer have Antimatter requirements",
    colour: PERK_COLOURS.INFINITY,
    prerequisites: ["SIP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },

  // Dilation Branch
  "EU1": {
    effect: "Automatically unlock the first row of Eternity Upgrades for free once you have Eternities.",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["START"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // EU2 through SEP1 are all annoying because you can get to them by going either via EU1 or SAM from START.
  "EU2": {
    effect: "The second row of Eternity Upgrades is automatically purchased at x1e10 times less than their original price",
    colour: PERK_COLOURS.ETERNITY,
    prerequisites: ["EU1", "DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "DAU": {
    effect: "Unlock autobuyers for the repeatable Dilation Upgrades.",
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["EU1", "TGR"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "DILR": {
    effect: `Remove the Eternity Challenge 11, Eternity Challenge 12, and total Time Theorem requirements from Time Dilation unlock.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Tachyon subbranch
  "TGR": {
    effect: "The 2nd rebuyable Dilation Upgrade no longer resets your Dilated Time.",
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP1", "DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "TP1": {
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 1.5.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["STP", "TGR"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.OR(this.prerequisites[0], this.prerequisites[1]);
    }
  },
  "TP2": {
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TP3": {
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 2.5.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "TP4": {
    effect: `When buying the "You gain 3 times more Tachyon Particles" Dilation Upgrade, multiply your current Tachyon Particle amount by 3.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["TP3"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  // Dilation Upgrades subbranch
  "UD1": {
    effect: `After unlocking Dilation, automatically unlock the second row of Dilation Upgrades for free.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["DAU"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "UD2": {
    effect: `After unlocking Dilation, automatically unlock the third row of Dilation Upgrades for free.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["UD1"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ATT": {
    effect: `Automatically purchase the passive Time Theorem generation Dilation Upgrade once you can afford it.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["UD2"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "DAS": {
    effect: `Dilation Upgrade autobuyers work x3 faster.`,
    colour: PERK_COLOURS.AUTOMATION,
    prerequisites: ["ATT"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "ATD": {
    effect: `Auto-unlock Time Dimensions 5-8 once you can afford them.`,
    colour: PERK_COLOURS.DILATION,
    prerequisites: ["ATT"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
  "REAL": {
    effect: `Auto-unlocks Reality once you have 1e4000 Eternity Points and have unlocked Time Dimension 8.`,
    colour: PERK_COLOURS.REALITY,
    prerequisites: ["ATD"],
    get reqType() {
      return PERK_REQUIREMENT_TYPE.ONE(this.prerequisites[0]);
    }
  },
};