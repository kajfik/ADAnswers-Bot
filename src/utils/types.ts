import Decimal from "break_infinity.js";
import { Model } from "sequelize";

export type Trees = {
  requirement: number,
  ts: number[],
  desc?: string
}

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

export type StudyInfo = {
  id: number;
  effect: string;
  formula?: string;
  cost: number;
  colour: string;
  prerequisites: number[];
  reqType: string;
  type: string;
  additionalPrerequisites?: string[];
  exclusiveWith?: string;
  isBestWaifu?: string;
  hasGraph?: boolean;
  graph?: string;
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
}

export type StringIndexedStringObjectType = {
  [key: string]: string;
}

export type TimeWithClock = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  clock: string;
}

export type TimeNoDays = {
  hours: number;
  minutes: number;
  seconds: number;
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

export type TagInfo = {
  top5commands: string;
  top5hours: string;
  top5users: string;
  requests: string;
  successes: string;
}

export type BigCrunchAutobuyerObject = {
  interval: number
}

type Replicanti = {
  unl: boolean
  chance: number
  gal: number
  interval: number
}

type TimeStudies = {
  amcost: Decimal
  ipcost: Decimal
  epcost: Decimal
}

type EternityChallenges = {
  eterc1: number,
  eterc2: number,
  eterc3: number,
  eterc4: number,
  eterc5: number,
  eterc6: number,
  eterc7: number,
  eterc8: number,
  eterc9: number,
  eterc10: number,
  eterc11: number,
  eterc12: number,
}

type Dilation = {
  dilatedTime: number
}

// Since everything else is here, let's just put this here as well
export interface Player {
  galaxies: number,
  // Why is it called this again
  resets: number,
  // Why is it called this again
  money: Decimal,

  // Why is it called this again
  infinitied: number,
  challengeTimes: Array<number>

  infinityPoints: Decimal,
  infchallengeTimes: Array<number>

  replicanti: Replicanti

  eternities: number,
  eternityPoints: Decimal,
  timestudy: TimeStudies,

  eternityChalls: EternityChallenges,

  dilation: Dilation,

  autobuyers: Array<number | BigCrunchAutobuyerObject>,
}