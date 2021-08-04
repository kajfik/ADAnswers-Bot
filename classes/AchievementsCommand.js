/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");

class AchievementsCommand extends Command {
  execute(message, args) {
    if (message.content.length > 1995) {
      message.channel.send(`You cannot try to trigger a command over this length!`);
      return;
    }

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