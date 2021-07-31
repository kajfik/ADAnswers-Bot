/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");
const functions = require("../functions");

// This also works for EC and all of the challenges

class TimeStudyCommand extends Command {
  execute(message, args, id) {
    let argMessage;
    let argMessageWithDM;
    const check = this.getCheck(id, message);

    if (this.type !== "shorthand" || this.name === "ts" || this.name === "ec") {
      argMessage = this.getArgMessage(args);
      argMessageWithDM = this.getArgMessage(args, true);
    } else if (this.type === "shorthand") {
      argMessage = this.sent[0];
      argMessageWithDM = this.sent[0];
    } 
    if (functions.botCommandsCheck(id, message)) message.channel.send(argMessage);
    else if (check) message.author.send(argMessage).catch(() => {
      message.reply("I can't DM you!");
    }).then(() => {
      message.react("☑️");
      if (this.name === "eternitychallenge" || this.name === "ec") message.author.send(argMessageWithDM);
    });
    else if (!check) message.channel.send(this.getFailMessage());
    else if (args[0] === undefined) this.doMissingArgCatch(message, args);
    else if (!(args[0] === undefined)) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  TimeStudyCommand
};