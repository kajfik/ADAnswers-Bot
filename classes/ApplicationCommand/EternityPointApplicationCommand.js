/* eslint-disable no-negated-condition */
"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const functions = require("../../utils/functions");

/**
 * @class EternityPointApplicationCommand
 * @extends ApplicationCommand
 * @classdesc Class for executing ep.js
 */
class EternityPointApplicationCommand extends ApplicationCommand {
  /**
   * Executes the command.
   * @param {Object} interaction - The interaction object used for the command that contains all useful information
   */
  execute(interaction) {
    const args = [this.getArgs(interaction)];
    const id = interaction.channelId;
    const a = functions.misc.toNumber(args[0]);
    const argMessage = this.getArgMessage(a);
    const check = this.getCheck(id, interaction);
    const aIsNaN = isNaN(a);

    if (!aIsNaN && check && !(a > 1000)) this.send(interaction, argMessage);
    else if (args[0] === undefined) this.doMissingArgCatch(interaction, args);
    else if (!aIsNaN && check && a > 1000) this.send(interaction, `In command \`++ep\`, you cannot use a number higher than 1000.`);
    else if (aIsNaN && check) this.send(interaction, functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (!check) this.send(interaction, this.getFailMessage());
    else this.send(interaction, functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = { EternityPointApplicationCommand };