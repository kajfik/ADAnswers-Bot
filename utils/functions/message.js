/* eslint-disable no-console */
"use strict";

const { generateTree } = require("./tree");
const config = require("../config.json");

/**
 * Generates the message for /channel that contains all channels that each command works in
 * @returns {String} a string for the /channel command
 */
function generateChannelMessage() {
  const ids = config.ids;
  const idToStr = list => list.map(id => `<#${id}>`).join(" ");

  return `Bot Commands: All commands work here. <#${ids.botCommands[0]}>
  Common: All commands besides miscellaneous commands work here. ${idToStr(ids.common)}.
  Early game: Early game commands work here. ${idToStr(ids.earlyGame)}
  Break: Break Infinity commands work here. ${idToStr(ids.break)}
  Early Eternity: Early Eternity commands work here. <#${ids.earlyEternity[0]}>
  ECs: EC commands work here. ${idToStr(ids.ecs)}
  Endgame: Endgame/Dilation commands work here. ${idToStr(ids.endgame)}`;
}

/**
 * Gets a message to prevent repetitive code
 * @param {String} command string that contains what command is being used
 * @param {Object} stuff object that contains theorem, path for the case "ts", acceptable arguments, name of the command, and
 * @returns sends the message or sends an error message back to the code
 */
function getMessage(command, stuff = {}) {
  switch (command) {
    case "ts":
      return generateTree(stuff.theorem, stuff.path);
    case "channel":
      return generateChannelMessage();
    case "error":
      return `Unknown arg ${stuff.args[0]} in command ${stuff.name}. The args for this command are ${stuff.acceptableArgs.join(", ")}.`;
    case "noWorky":
      return noWorkyMessageObject[stuff.worky];
    case "missingArg":
      return `Command \`${stuff.name}\` requires an arg. The args for this command are ${stuff.acceptableArgs.join(", ")}.`;
    case "shouldNeverAppear":
      return `This message should never appear. If it does, let earth know with a screenshot of the message that caused it.`;
    default:
      console.error("Unknown command for getMessage!");
      return "Something went wrong";
  }
}

const use = `Use \`/channels\` to see which channels that is!`;
const noWorkyMessage = (channels, secondaryChannels) => `This command only works in the ${channels} channel(s),${secondaryChannels ? ` ${secondaryChannels} channels,` : ``} bot commands, or the common channels. ${use}`;
const noWorkyMessageObject = {
  "earlyGame": noWorkyMessage("early game"),
  "earlyInfinity": noWorkyMessage("early Infinity"),
  "breakCheck": noWorkyMessage("Break Infinity"),
  "setCrunchAutoCheck": noWorkyMessage("early Break Infinity"),
  "earlyEternity": noWorkyMessage("early Eternity"),
  "studyTreeCheck": noWorkyMessage("Eternity"),
  get "eternityGrinding"() { return this.studyTreeCheck; },
  "ecsCheck": noWorkyMessage("Eternity Challenge"),
  "ecsPlus": noWorkyMessage("Eternity Challenge", "endgame"),
  "botCommands": `This is a miscellaneous command and is only allowed in <#351479640755404820>`,
  "bankedInfs": `This command only works in the post-TS181 channel and on. You can also use <#351479640755404820>!`,
  "dilationGrind": `This command only works in the channel directly before Dilation, bot commands, or the common channels. ${use}`,
  "endgame": noWorkyMessage("endgame"),
  "e4000": noWorkyMessage("e4000 EP"),
  "ic4/5": noWorkyMessage("Break Infinity", "early Eternity"),
  "lateBreakCheck": noWorkyMessage("last Break Infinity")
};

module.exports = {
  getMessage,
  noWorkyMessage,
  generateChannelMessage, 
};