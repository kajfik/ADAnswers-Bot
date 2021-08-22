"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { Message } = require("../FunctionClasses/Message");

/**
 * @class XKCDApplicationCommand
 * @extends ApplicationCommand
 * @classdesc Command for executing xkcd.js
 */
class XKCDApplicationCommand extends ApplicationCommand {
  /**
   * Executes the command.
   * @param {Object} interaction - The interaction object used for the command that contains all useful information
   */
  execute(interaction) {
    if (!this.getCheck(interaction.channelId, interaction)) {
      interaction.reply({ content: new Message("noWorky", { worky: this.check }).getMessage(), ephemeral: true });
      return;
    }
    const args = this.getArgs(interaction);
    this.send(interaction, this.getArgMessage(args));

  }
}

module.exports = { XKCDApplicationCommand };