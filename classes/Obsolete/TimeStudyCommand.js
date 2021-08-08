/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

// I'm keeping this because I don't really want to get rid of it, to be completely honest. It isn't used anywhere,
// but I want to keep it for posterity, I guess.

const { Command } = require("../Command");
const functions = require("../../utils/functions/functions");

// This also works for EC and all of the challenges

/**
 * @class TimeStudyCommand
 * @extends {Command}
 * Class representing a XKCD Command. Extends base {@link Command} class.
 * No constructor, as it has no extra data in the config provided in the command files where this class is used.
 */
class TimeStudyCommand extends Command {
  /**
   * @param {string} message - Message object that contains everything about the message.
   * @param {Array} args - Array of arguments that are passed to the command.
   * @param {string} id - ID of the channel the command was sent in
   */
  execute(message, args, id) {
    let argMessage;
    let argMessageWithDM;
    const check = this.getCheck(id, message);
    
    if (message.content.length > 1000) {
      message.channel.send(`You cannot try to trigger a command over this length!`);
      return;
    }

    if (this.type !== "shorthand" || this.name === "ts" || this.name === "ec") {
      argMessage = this.getArgMessage(args);
      argMessageWithDM = this.getArgMessage(args, true);
    } else if (this.type === "shorthand") {
      argMessage = this.sent[0];
      argMessageWithDM = this.sent[0];
    } 
    if (functions.botCommandsCheck(id, message)) message.channel.send(argMessage, { split: true });
    else if (check) message.author.send(argMessage, { split: true }).catch(() => {
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