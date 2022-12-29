import { footerText, makeEnumeration } from "./Misc";
import { Colour } from "../utils/colours";
import { EmbedBuilder } from "discord.js";
import { StudyInfo } from "../utils/types";
import { studies } from "../utils/databases/studies";

function getFields(studyInfo: StudyInfo) {
  const fields = [
    { name: "Effect", value: `${studyInfo.effect}` },
    { name: "Cost", value: `${studyInfo.cost} Time Theorems` },
  ];
  if (studyInfo.id === 11 || studyInfo.id === 10) {
    fields.push({ name: "Prerequisites", value: `None` });
  } else if (studyInfo.prerequisites.length === 0) {
    fields.push({ name: "Prerequisites", value: `${studyInfo.reqType}` });
  } else if (studyInfo.id >= 231) fields.push({ name: "Prerequisites", value: `${studyInfo.reqType}` });
  else fields.push({
    name: "Prerequisites",
    value: `${studyInfo.reqType} ${makeEnumeration<number>(studyInfo.prerequisites, ", TS", "TS", "or")} ${studyInfo.additionalPrerequisites ? `and ${studyInfo.additionalPrerequisites}` : ``}` });
  if (studyInfo.formula) {
    fields.push({ name: "Formula", value: `${studyInfo.formula}` });
  }
  if (studyInfo.exclusiveWith) {
    fields.push({ name: "Cannot be purchased if", value: `${studyInfo.exclusiveWith}` });
  }
  if (studyInfo.isBestWaifu) {
    fields.push({ name: "Is best waifu?", value: `${studyInfo.isBestWaifu}` });
  }
  return fields;
}

export const TimeStudy = (studyInfo: StudyInfo): EmbedBuilder => new EmbedBuilder()
  .setTitle(`Time Study ${studyInfo.id}`)
  .setColor(Colour[studyInfo.type])
  // .setColor(studyInfo.colour as ColorResolvable)
  .addFields(getFields(studyInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export function getAffordableStudiesFromStudyList(list: number[], theorems: number) {
  let remainingTheorems = theorems;
  const affordableStudies: number[] = [];
  for (const studyId of list) {
    const study = studies[`${studyId}`];
    if (study.cost <= remainingTheorems) {
      // If ANY of the study's prerequisites are in affordable studies, we can purchase it. Otherwise, we can't.
      // Some studies have multiple possible prerequisites, but we only need one of them in order for us to purchase the next study
      // Some studies have no prerequisites so we can always purchase them
      // TS11 has no prerequisites, so we have an extra OR to see if it's the study we're thinking about buying
      if (study.prerequisites.some(r => affordableStudies.includes(r)) || study.id === 11) {
        affordableStudies.push(studyId);
        remainingTheorems -= study.cost;
      }
    }
  }
  return affordableStudies;
}