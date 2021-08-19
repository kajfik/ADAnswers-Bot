"use strict";

const config = require("../../utils/config.json");

class Message {
  constructor(command, stuff) {
    this.command = command;
    this.name = stuff.name;
    this.args = stuff.args;
    this.acceptableArgs = stuff.acceptableArgs;
    this.worky = stuff.worky;
  }

  noWorkyMessage(channels, secondaryChannels) {
    const use = `Use \`/channels\` to see which channels that is!`;
    return `This command only works in the ${channels} channel(s),${secondaryChannels ? ` ${secondaryChannels} channels,` : ``} bot commands, or the common channels. ${use}`;
  
  }

  get constants() {
    return {
      use: `Use \`/channels\` to see which channels that is!`,
      noWorkyMessageObject: {
        "earlyGameCheck": this.noWorkyMessage("early game"),
        "earlyInfinityCheck": this.noWorkyMessage("early Infinity"),
        "breakCheck": this.noWorkyMessage("Break Infinity"),
        "setCrunchAutoCheck": this.noWorkyMessage("early Break Infinity"),
        "earlyEternityCheck": this.noWorkyMessage("early Eternity"),
        "studyTreeCheck": this.noWorkyMessage("Eternity"),
        get "eternityGrindingCheck"() { return this.studyTreeCheck; },
        "ecsCheck": this.noWorkyMessage("Eternity Challenge"),
        "ecsPlusCheck": this.noWorkyMessage("Eternity Challenge", "endgame"),
        "botCommandsCheck": `This is a miscellaneous command and is only allowed in <#351479640755404820>`,
        "bankedInfsCheck": `This command only works in the post-TS181 channel and on. You can also use <#351479640755404820>!`,
        "dilationGrindCheck": `This command only works in the channel directly before Dilation, bot commands, or the common channels. Use \`/channels\` to see which channels that is!`,
        "endgameCheck": this.noWorkyMessage("endgame"),
        "e4000Check": this.noWorkyMessage("e4000 EP"),
        "weirdICsCheck": this.noWorkyMessage("Break Infinity", "early Eternity"),
        "lateBreakCheck": this.noWorkyMessage("last Break Infinity")
      }
    };
  }

  getMessage() {
    const CONSTS = this.constants;
    switch (this.command) {
      case "channel":
        return this.generateChannelMessage();
      case "error":
        return `Unknown arg ${this.args[0]} in command ${this.name}. The args for this command are ${this.acceptableArgs.join(", ")}.`;
      case "noWorky":
        return CONSTS.noWorkyMessageObject[this.worky];
      case "missingArg":
        return `Command \`${this.name}\` requires an arg. The args for this command are ${this.acceptableArgs.join(", ")}.`;
      case "shouldNeverAppear":
        return `This message should never appear. If it does, let earth know with a screenshot of the message that caused it.`;
      default:
        // eslint-disable-next-line no-console
        console.error("Unknown command for getMessage!");
        return "Something went wrong";
    }
  }

  generateChannelMessage() {
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
}

module.exports = { Message };