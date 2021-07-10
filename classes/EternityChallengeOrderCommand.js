/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");
const functions = require("../functions");

class EternityChallengeOrderCommand extends Command {
  execute(message, args, id) {
    const argMessage = this.getArgMessage(args[0]);
    const check = this.getCheck(id, message);
    const acceptableArgsIncludes = this.acceptableArgs.includes(args[0]);

    if (!acceptableArgsIncludes && functions.botCommandsCheck(id, message)) message.channel.send(this.sent[0]);
    else if (functions.botCommandsCheck(id, message) && acceptableArgsIncludes) message.channel.send(argMessage);
    else if (check && !acceptableArgsIncludes) message.author.send(this.sent[0]).catch(() => {
      message.reply("I can't DM you!");
    }).then(() => message.react("☑️"));
    else if (check && acceptableArgsIncludes) message.author.send(argMessage).catch(() => {
      message.reply("I can't DM you!");
    }).then(() => message.react("☑️"));
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  EternityChallengeOrderCommand
};