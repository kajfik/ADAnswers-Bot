"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { Time } = require("../Time");

class TimeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    interaction.reply(`Currently ${Time.decimalTime(false, Time.newDate(), 0)}`);
  }
}

module.exports = { TimeApplicationCommand };