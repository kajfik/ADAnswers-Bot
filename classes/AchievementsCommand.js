/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");

class AchievementsCommand extends Command {
  constructor(config) {
    super(config);
    this.achievementsMessageObject = config.amo;
  }

  execute(message, args) {
    if (message.content.length > 1000) {
      interaction.channel.send(`You cannot try to trigger a command over this length!`);
      return;
    }

    if (args.length === 0) {
      message.channel.send(this.sent[0]);
    } else if (args.length !== 0 && !this.acceptableArgs.includes(args[0].toLowerCase())) {
      message.channel.send("This achievement is either useless or can be easily achieved.");
    } else this.regularCommand(interaction, args, interaction.channel.id);
  }
}

module.exports = {
  AchievementsCommand
};