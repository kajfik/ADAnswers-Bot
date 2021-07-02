/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");
const functions = require("../functions");

// This also works for EC

class TimeStudyCommand extends Command {
  execute(message, args, id) {
    if (functions.botCommandsCheck(id, message)) message.channel.send(this.getArgMessage(args));
    else if (this.getCheck(id, message)) message.author.send(this.getArgMessage(args)).catch(() => {
      message.reply("I can't DM you!");
    }).then(() => message.react("☑️"));
    else if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (!(args[0] === undefined)) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  TimeStudyCommand
};