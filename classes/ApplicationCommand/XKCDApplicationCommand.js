"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");

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
    const args = this.getArgs(interaction);
    interaction.reply(this.getArgMessage(args));

  }
}

module.exports = { XKCDApplicationCommand };