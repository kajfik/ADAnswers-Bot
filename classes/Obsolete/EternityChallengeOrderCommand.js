/* eslint-disable max-len */
"use strict";

const { Command } = require("../Command");
const functions = require("../functions");

class EternityChallengeOrderCommand extends Command {
  execute(message, args, id) {
    let argMessage;
    let check = this.getCheck(id, message);
    let acceptableArgsIncludes;

    if (message.content.length > 1000) {
      message.channel.send(`You cannot try to trigger a command over this length!`);
      return;
    }

    if (args[0] === undefined) {
      argMessage = this.sent[0];
      acceptableArgsIncludes = false;
    } else {
      argMessage = this.getArgMessage(args[0]);
      check = this.getCheck(id, message);
      acceptableArgsIncludes = this.acceptableArgs.includes(args[0]);
    }

    if (!acceptableArgsIncludes && functions.botCommandsCheck(id, message)) message.channel.send(argMessage);
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