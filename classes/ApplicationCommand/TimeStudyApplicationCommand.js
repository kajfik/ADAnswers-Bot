"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");

class TimeStudyApplicationCommand extends ApplicationCommand {
  constructor(config) {
    super(config);
    if (this.acceptableArgs !== undefined) {
      this.argKey = [];
      this.argType = [];
      if (this.isECOorEC()) {
        this.argKey[0] = config.argInfo.ec.key;
        this.argType[0] = config.argInfo.ec.type;
        this.argKey[1] = config.argInfo.completion.key;
        this.argType[1] = config.argInfo.completion.type;
      } else {
        this.argKey = config.argInfo.key;
        this.argType = config.argInfo.type;
      }
    }
  }

  isTSorEC() {
    return this.name === "ec" || 
    this.name === "eternitychallenge" || 
    this.name === "ts" || 
    this.name === "studytree";
  }

  isECOorEC() {
    return this.name === "ec" || 
    this.name === "eternitychallenge" || 
    this.name === "eco" || 
    this.name === "eternitychallengeorder";
  }

  getArgs(interaction) {
    const args = [];
    if (this.isECOorEC()) {
      args.push(interaction.options.getNumber("ec"));
      args.push(interaction.options.getNumber("completion"));
      return args;
    }
    if (this.argType === "string") args.push(interaction.options.getString(this.argKey));
    if (this.argType === "number") args.push(interaction.options.getNumber(this.argKey));
    return args;
  }

  execute(interaction) {
    let argMessage;
    let argMessageWithDM;
    const args = [this.getArgs(interaction).join("x")];

    if (this.type !== "shorthand" || this.name === "ts" || this.name === "ec" || this.name === "eco") {
      argMessage = this.getArgMessage(args);
      argMessageWithDM = this.getArgMessage(args, true);
    } else if (this.type === "shorthand") {
      argMessage = this.sent[0];
      argMessageWithDM = this.sent[0];
    } 

    interaction.reply({ content: argMessage, ephemeral: true });
    if (this.isTSorEC()) interaction.followUp({ content: argMessageWithDM, ephemeral: true });
  }
}

module.exports = { TimeStudyApplicationCommand };