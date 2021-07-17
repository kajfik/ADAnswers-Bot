/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");

class AchievementsCommand extends Command {
  execute(message, args) {
    if (args.length === 0) {
      message.channel.send(this.sent[0]);
    } else if (args.length !== 0 && !this.acceptableArgs.includes(args[0].toLowerCase())) {
      message.channel.send("This achievement is either useless or can be easily achieved.");
    } else this.regularCommand(message, args, message.channel.id);
  }
}

module.exports = {
  AchievementsCommand
};