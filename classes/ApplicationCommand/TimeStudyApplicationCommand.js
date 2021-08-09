"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");

/**
 * @class TimeStudyApplicationCommand
 * @extends ApplicationCommand
 * @classdesc Command for executing ec/eco/ecs/eternitychallenge/eternitychallengeorder/studytree/ts.js
 */
class TimeStudyApplicationCommand extends ApplicationCommand {
  /**
   * @inherentdoc
   */
  constructor(config) {
    super(config);
    this.ephemeral = config.ephemeral;
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

  /**
   * Checks if the command is TS or EC.
   * @return {boolean}
   */
  isTSorEC() {
    return this.name === "ec" || 
    this.name === "eternitychallenge" || 
    this.name === "ts" || 
    this.name === "studytree";
  }

  /**
   * Checks if the command is TS.
   * @return {boolean}
   */
  isTS() {
    return this.name === "ts" ||
    this.name === "studytree";
  }

  /** 
   * Checks if the command is EC.
   * @return {boolean}
   */
  isEC() {
    return this.name === "ec" ||
    this.name === "eternitychallenge";
  }

  /**
   * Checks if the command is ECO or EC.
   * @return {boolean}
   */
  isECOorEC() {
    return this.name === "ec" || 
    this.name === "eternitychallenge" || 
    this.name === "eco" || 
    this.name === "eternitychallengeorder";
  }

  /**
   * @inheritdoc
   * @return {Array}
   */
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

  /**
   * @inheritdoc
   */
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

    interaction.reply({ content: argMessage, ephemeral: this.ephemeral });
    if (this.isEC()) interaction.followUp({ content: argMessageWithDM, ephemeral: this.ephemeral });
  }
}

module.exports = { TimeStudyApplicationCommand };