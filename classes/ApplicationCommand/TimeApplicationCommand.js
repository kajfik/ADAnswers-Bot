"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { Time } = require("../FunctionClasses/Time");
const { Message } = require("../FunctionClasses/Message");

class TimeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    if (!this.getCheck(interaction.channelId, interaction)) {
      interaction.reply({ content: new Message("noWorky", { worky: this.check }).getMessage(), ephemeral: true });
      return;
    }
    interaction.reply(`Currently ${Time.decimalTime(false, Time.newDate(), 0)}`);
  }
}

module.exports = { TimeApplicationCommand };