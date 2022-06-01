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
  "71": {
    id: 71,
    effect: "Dimensional Sacrifice affects all other Antimatter Dimensions with reduced effect",
    formula: "`sacrifice bonus ^ 0.25`",
    cost: 4,
    colour: STUDY_COLOURS.ANTIMATTER,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS61"],
    type: "antimatter"
  },
  "72": {
    id: 72,
    effect: "Dimensional Sacrifice affects 4th Infinity Dimension with greatly reduced effect",
    formula: "`sacrifice bonus ^ 0.04`",
    cost: 6,
    colour: STUDY_COLOURS.INFINITY,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS61"],
    type: "infinity"
  },
  "73": {
    id: 73,
    effect: "Dimensional Sacrifice affects 3rd Time Dimension with greatly reduced effect",
    formula: "`sacrifice bonus ^ 0.005`",
    cost: 5,
    colour: STUDY_COLOURS.TIME,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    prerequisites: ["TS61"],
    type: "time"
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
    type: "active"
  },
  "122": {
    id: 122,
    effect: `You gain ×35 more Eternity Points`,
    cost: 9,
    prerequisites: ["TS111"],
    colour: STUDY_COLOURS.PASSIVE,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "passive"
  },
  "123": {
    id: 123,
    effect: "You gain more Eternity Points based on time spent this Eternity",
    formula: "`sqrt(time in this eternity in seconds * 1.39)`",
    cost: 9,
    prerequisites: ["TS111"],
    colour: STUDY_COLOURS.IDLE,
    reqType: TS_REQUIREMENT_TYPE.ONE,
    type: "idle"
  },
  "224": {
    id: 224,
    effect: `Distant Galaxy cost scaling starts later(1 per 2000} Dim Boosts)`,
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