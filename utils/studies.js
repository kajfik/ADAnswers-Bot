"use strict";

const { MessageEmbed } = require("discord.js");

const footerText = () => (Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Art by MrKrutaman#1705`);

const TS_REQUIREMENT_TYPE = {
  AT_LEAST_ONE: "At least one of",
  ALL: "All of",
  ONE: "",
};

const STUDY_COLOURS = {
  NORMAL: "#b640dd",
  ANTIMATTER: "#16a94d",
  INFINITY: "#b5813c",
  get TIME() { return this.NORMAL; },
  ACTIVE: "#e6241b",
  PASSIVE: "#632fb3",
  IDLE: "#297bfb",
  DARK: "#000000",
  LIGHT: "#ffffff"
};

const studies = {
  "11": {
    id: 11,
    effect: "Tickspeed affects 1st Time Dimension with reduced effect",
    formula: "`reciprocal((((Tickspeed / 1000) ^ 0.005) * 0.95) + (((Tickspeed / 1000) ^ 0.0003) * 0.05))`",
    cost: 1,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["None"],
    type: "normal"
  },
  "21": {
    id: 21,
    effect: `Improve Replicanti multiplier formula to (log2(x) ^ 2) + x ^ 0.032`,
    cost: 3,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS11"],
    type: "normal"
  },
  "22": {
    id: 22,
    effect: "Replicanti interval limit 50ms -> 1ms",
    cost: 2,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS11"],
    type: "normal"
  },
  "31": {
    id: 31,
    effect: `Powers up bonuses that are based on your Infinities`,
    formula: `\`(Bonuses ^ 4)\``,
    cost: 3,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS21"],
    type: "normal"
  },
  "32": {
    id: 32,
    effect: "You gain more Infinities based on Dimension Boosts",
    formula: "×`dimension boosts`",
    cost: 2,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS22"],
    type: "normal"
  },
  "33": {
    id: 33,
    effect: "You keep half of your Replicanti Galaxies on Infinity",
    cost: 2,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS22"],
    type: "normal"
  },
  "41": {
    id: 41,
    effect: "All Galaxies give a ×1.2 multiplier to Infinity Points gained",
    cost: 4,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS31"],
    type: "normal"
  },
  "42": {
    id: 42,
    effect: "Antimatter Galaxy requirement increases by 52 8th Dimensions instead of 60",
    cost: 6,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS32"],
    type: "normal"
  },
  "51": {
    id: 51,
    effect: "You gain ×1e15 more Infinity Points",
    cost: 3,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    prerequisites: ["TS41", "TS42"],
    type: "normal"
  },
  "61": {
    id: 61,
    effect: "You gain ×15 more Eternity Points",
    cost: 3,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS51"],
    type: "normal"
  },
  "62": {
    id: 62,
    effect: "You gain Replicanti 3 times faster",
    cost: 3,
    prerequisites: ["TS42", "1 or more EC5 completion"],
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "normal"
  },
  // Dimension path studies
  "71": {
    id: 71,
    effect: "Dimensional Sacrifice affects all other Antimatter Dimensions with reduced effect",
    formula: "`sacrifice bonus ^ 0.25`",
    cost: 4,
    colour: STUDY_COLOURS.ANTIMATTER,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS61"],
    type: "antimatter",
    exclusiveWith: "Infinity or Time branch"
  },
  "72": {
    id: 72,
    effect: "Dimensional Sacrifice affects 4th Infinity Dimension with greatly reduced effect",
    formula: "`sacrifice bonus ^ 0.04`",
    cost: 6,
    colour: STUDY_COLOURS.INFINITY,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS61"],
    type: "infinity",
    exclusiveWith: "Antimatter or Time branch"
  },
  "73": {
    id: 73,
    effect: "Dimensional Sacrifice affects 3rd Time Dimension with greatly reduced effect",
    formula: "`sacrifice bonus ^ 0.005`",
    cost: 5,
    colour: STUDY_COLOURS.TIME,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS61"],
    type: "time",
    exclusiveWith: "Antimatter or Infinity branch"
  },
  "81": {
    id: 81,
    effect: "Base Dimension Boost power becomes ×10",
    cost: 4,
    colour: STUDY_COLOURS.ANTIMATTER,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS71"],
    type: "antimatter",
    exclusiveWith: "Infinity or Time branch"
  },
  "82": {
    id: 82,
    effect: "Dimension Boosts affect Infinity Dimensions",
    cost: 6,
    colour: STUDY_COLOURS.INFINITY,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS72"],
    type: "infinity",
    exclusiveWith: "Antimatter or Time branch"
  },
  "83": {
    id: 83,
    effect: "Dimension Boost multiplier based on tick upgrades gained from TDs",
    cost: 5,
    colour: STUDY_COLOURS.TIME,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS73"],
    type: "time",
    exclusiveWith: "Antimatter or Infinity branch"
  },
  "111": {
    id: 111,
    effect: "Make the Infinity Point formula better",
    formula: "`log(x / 307.8)` -> `log(x / 285)`",
    cost: 12,
    colour: STUDY_COLOURS.NORMAL,
    reqType: TS_REQUIREMENT_TYPE.AT_LEAST_ONE,
    prerequisites: ["TS101", "TS102", "TS103"],
    type: "normal"
  },
  "121": {
    id: 121,
    effect: `You gain more EP based on how fast your last ten Eternities were`,
    formula: "`250 / average time per eternity`, capped at 50",
    cost: 9,
    prerequisites: ["TS111"],
    colour: STUDY_COLOURS.ACTIVE,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "active",
    exclusiveWith: "Passive or Idle branch"
  },
  "122": {
    id: 122,
    effect: `You gain ×35 more Eternity Points`,
    cost: 9,
    prerequisites: ["TS111"],
    colour: STUDY_COLOURS.PASSIVE,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "passive",
    exclusiveWith: "Active or Idle branch"
  },
  "123": {
    id: 123,
    effect: "You gain more Eternity Points based on time spent this Eternity",
    formula: "`sqrt(time in this eternity in seconds * 1.39)`",
    cost: 9,
    prerequisites: ["TS111"],
    colour: STUDY_COLOURS.IDLE,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "idle",
    exclusiveWith: "Active or Passive branch"
  },
  "224": {
    id: 224,
    effect: `Distant Galaxy cost scaling starts later (1 per 2000 Dim Boosts)`,
    formula: "`floor(boosts / 2000)`",
    cost: 900,
    prerequisites: ["TS212"],
    colour: STUDY_COLOURS.DARK,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    exclusiveWith: "TS223",
    type: "dark"
  },
  "225": {
    id: 225,
    effect: "You gain extra Replicanti Galaxies based on your Replicanti amount",
    formula: "`floor(log10(replicanti) / 1000)`",
    cost: 900,
    prerequisites: ["TS213"],
    colour: STUDY_COLOURS.LIGHT,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    exclusiveWith: "TS226",
    type: "light"
  }
};

function getFields(studyInfo) {
  const fields = [
    { name: "Effect", value: `${studyInfo.effect}` },
    { name: "Cost", value: `${studyInfo.cost} Time Theorems` },
    { name: "Prerequisites", value: `${studyInfo.reqType} ${studyInfo.prerequisites.join(", ")}` }
  ];
  if (studyInfo.formula) {
    fields.push({ name: "Formula", value: `${studyInfo.formula}` });
  }
  if (studyInfo.exclusiveWith) {
    fields.push({ name: "Cannot be purchased if", value: `${studyInfo.exclusiveWith} is purchased` });
  }
  return fields;
}

const TimeStudy = studyInfo => new MessageEmbed()
  .setTitle(`Time Study ${studyInfo.id}`)
  .setColor(studyInfo.colour)
  .addFields(getFields(studyInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

module.exports = {
  studies,
  TimeStudy
};