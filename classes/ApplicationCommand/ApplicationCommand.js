/* eslint-disable no-negated-condition */
"use strict";

const { Command } = require("../Command");

const functions = require("../../functions");

class ApplicationCommand extends Command {
  constructor(config) {
    super(config);
    if (this.acceptableArgs !== undefined) {
      this.argKey = config.argInfo.key;
      this.argType = config.argInfo.type;
      if (this.name !== "ep") this.messageObject = config.messageObject;
    }
  }

  execute(interaction, id) {
    if (this.acceptableArgs === undefined) {
      if (this.getCheck(id, interaction)) interaction.reply({ content: this.sent[0], ephemeral: true });
      else interaction.reply({ content: this.getFailMessage(), ephemeral: true });
    } else if (this.acceptableArgs !== undefined) {
      this.regularCommand(interaction, [this.getArgs(interaction)], id);
    }
  }

  getArgs(interaction) {
    if (this.argType === "string") return interaction.options.getString(this.argKey);
    if (this.argType === "number") return interaction.options.getNumber(this.argKey);

    return `Unknown argType/argKey. Type: ${this.argType}, key: ${this.argKey}`;
  }

  getCheck(id, interaction) {
    if (typeof functions.checkObject[this.check] === "function") return functions.checkObject[this.check](id, interaction);
    if (typeof functions.checkObject[this.check] === "boolean") return functions.checkObject[this.check];
    throw new Error("Invalid check type");
  }

  send(interaction, sent) {
    interaction.reply({ content: sent, ephemeral: true });
  }

  doMissingArgCatch(interaction, args) {
    if (args[0] === undefined) {
      this.send(interaction, functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
    }
  }

  regularCommand(interaction, args, id) {
    if (args[0] === undefined) {
      this.doMissingArgCatch(interaction, args);
      return;
    }
    const sent = this.getArgMessage(args[0].toLowerCase());
    if (this.getCheck(id, interaction) && this.acceptableArgs.includes(args[0].toLowerCase())) this.send(interaction, sent);
    else if (!(args[0] === undefined)) this.send(interaction, functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else this.send(interaction, functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = { ApplicationCommand };