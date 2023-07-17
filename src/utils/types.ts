import { ColorResolvable } from "discord.js";
import { Model } from "sequelize";

export type AchievementInfo = {
  id: number;
  fullName: string;
  achievement: string;
  strategy?: string;
  reward?: string;
  rewardFormula?: string;
}

export type EC = {
  challenge: number,
  completion: number,
  tt: number,
  ip: string,
  note: null | string,
  tree: string,
  completionReqs?: string,
  unlock: {
    currency: string,
    amount: number | string,
    tt: number,
  }
}

export type GlyphEffect = {
  name: string,
  primary?: boolean,
  effect: string,
  effectFormula: string,
  stacking?: string,
  altered?: {
    name: string,
    effect: string,
    effectFormula: string,
    type: number
  }
}

export type GlyphSacrifice = {
  effect: string,
  effectFormula: string
}

export type GlyphInfo = {
  name: string,
  // The ID of the emote on the AD Discord server.
  emote: string,
  // An alternate character, used if the bot is in DMs or on another server.
  altText: string,
  // Effects start in the lower left corner and progress clockwise.
  effects: {
    [key: string]: GlyphEffect,
  },
  colour: ColorResolvable,
  sacrifice?: GlyphSacrifice
}

type APInfo = {
  amount: number
}

export type PerkInfo = {
  id: string,
  name: string,
  effect: string,
  prerequisites: string[],
  ap?: APInfo
}

export type Milestone = {
  amount: number,
  resource: string,
  effect: string,
  effectFormula: string,
}

export type StringIndexedStringObjectType = {
  [key: string]: string;
}

export type StudyInfo = {
  id: number;
  effect: string;
  formula?: string;
  cost: number;
  prerequisites: number[];
  reqType: string;
  type: string;
  additionalPrerequisites?: string[];
  exclusiveWith?: string;
  isBestWaifu?: string;
  hasGraph?: boolean;
  graph?: string;
  isTriad?: boolean
}

export type TagInfo = {
  top5commands: string;
  top5hours: string;
  top5users: string;
  top5players: string;
  requests: string;
  successes: string;
}

export type TimeNoDays = {
  hours: number;
  minutes: number;
  seconds: number;
}

export type TimeWithClock = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  clock: string;
}

export type Trees = {
  requirement: number,
  ts: number[],
  desc?: string
}

export type ChargedInfinityUpgrade = {
  effect: string
  formula: string
}

export type UpgradeInfo = {
  id: string;
  name: string;
  effect: string;
  requirement?: string;
  cost?: number | string;
  formula?: string;
  initialCost?: number;
  rebuyable?: boolean;
  formatNicely?: boolean;
  increment?: number;
  hasGraph?: boolean;
  graph?: string;
  charged?: ChargedInfinityUpgrade;
  strategy?: string
}

export type UserInfo = {
  fullPerson: string;
  rolesUnjoined: string[];
  roles: string;
  nick: string;
  joined: string;
  avatar: string;
  tag: Model<any, any> | null;
  tagInfo: Function
}

export type ECsAtTTInfo = {
  completions: string
  nextEC: EC,
  nextECs: string[],
  nextChallengeTT: number
}

export type Reagent = {
  resource: string,
  amount: number
}

export type AlchemyResource = {
  name: string,
  // Ra-Effarig level that the resource unlocks at
  unlocksAt: number,
  symbol: string,
  effect: string,
  effectFormula: string,
  // What ring the resource lies on
  tier: number,
  reagents?: Reagent[]
}

export type TeresaUnlock = {
  reward: string,
  requirement: number
}

export type PerkShopUpgrade = {
  name: string,
  initialCost: number,
  increment: number,
  description: string,
  cap: string
}

export type VAchievement = {
  name: string,
  description: string,
  // Completion
  values: Array<number | string>,
  currency: string
}

export type VUnlock = {
  reward: string,
  formula?: string,
  requirement: number
}

export type Memory = {
  level: number,
  effect: {
    effect: string,
    formula?: string
  }
}

export type RaCelestial = {
  name: string,
  chunkGain: {
    currency: string,
    formula: string
  },
  unlocks: {
    [key: string]: Memory
  }
}