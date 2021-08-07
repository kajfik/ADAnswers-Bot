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
      } else if (this.isTS()) {
        this.argKey[0] = config.argInfo.tt.key;
        this.argType[0] = config.argInfo.tt.type;
        this.argKey[1] = config.argInfo.path.key;
        this.argType[1] = config.argInfo.path.type;
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

  isTS() {
    return this.name === "ts" ||
    this.name === "studytree";
  }

  isEC() {
    return this.name === "ec" ||
    this.name === "eternitychallenge";
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
    if (this.isTS()) {
      args.push(interaction.options.getNumber("theorems"));
      args.push(interaction.options.getString("path"));
      return args;
    }
    if (this.argType === "string") args.push(interaction.options.getString(this.argKey));
    if (this.argType === "number") args.push(interaction.options.getNumber(this.argKey));
    return args;
  }

  execute(interaction) {
    let argMessage;
    let argMessageWithDM;
    let args;
    if (this.isECOorEC()) args = [this.getArgs(interaction).join("x")];
    else if (this.isTS()) {
      args = this.getArgs(interaction);
      if (!args[1]) args[1] = "active";
    }

    if (this.type !== "shorthand" || this.name === "ts" || this.name === "ec" || this.name === "eco") {
      argMessage = this.getArgMessage(args);
      argMessageWithDM = this.getArgMessage(args, true);
    } else if (this.type === "shorthand") {
      argMessage = this.sent[0];
      argMessageWithDM = this.sent[0];
    } 

    interaction.reply({ content: argMessage, ephemeral: true });
    if (this.isEC()) interaction.followUp({ content: argMessageWithDM, ephemeral: true });
  }
}

module.exports = { TimeStudyApplicationCommand };