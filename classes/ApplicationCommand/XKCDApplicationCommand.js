"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");

class XKCDApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    const args = this.getArgs(interaction);
    interaction.reply(this.getArgMessage(args));

  }
}

module.exports = { XKCDApplicationCommand };