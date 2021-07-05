/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");
const functions = require("../functions");

class EternityChallengeOrderCommand extends Command {
  execute(message, args, id) {
    if (!this.acceptableArgs.includes(args[0]) && functions.botCommandsCheck(id, message)) message.channel.send(this.sent[0]);
    else if (functions.botCommandsCheck(id, message) && this.acceptableArgs.includes(args[0])) message.channel.send(this.getArgMessage(args[0]));
    else if (this.getCheck(id, message) && !this.acceptableArgs.includes(args[0])) message.author.send(this.sent[0]).catch(() => {
      message.reply("I can't DM you!");
    }).then(() => message.react("☑️"));
    else if (this.getCheck(id, message) && this.acceptableArgs.includes(args[0])) message.author.send(this.getArgMessage(args[0])).catch(() => {
      message.reply("I can't DM you!");
    }).then(() => message.react("☑️"));
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  EternityChallengeOrderCommand
};