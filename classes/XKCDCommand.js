/* eslint-disable max-len */
"use strict";

const functions = require("../functions");
const { Command } = require("./Command");

class XKCDCommand extends Command {
  execute(message, args, id) {
    const argToNumber = functions.misc.toNumber(args[0]);
    const argMessage = this.getArgMessage(argToNumber);
    const check = this.getCheck(id, message);
    const argIsNaN = isNaN(argToNumber);

    if (check && !argIsNaN) message.channel.send(argMessage);
    else if (check && argIsNaN) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (args[0] === undefined) this.doMissingArgCatch(message, args);
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  XKCDCommand
};