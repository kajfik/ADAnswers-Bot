/* eslint-disable max-len */
"use strict";

const functions = require("../functions");
const { Command } = require("./Command");

class XKCDCommand extends Command {
  execute(message, args, id) {
    if (this.getCheck(id, message) && !isNaN(functions.misc.toNumber(args[0]))) message.channel.send(this.getArgMessage(args[0]));
    else if (this.getCheck(id, message) && isNaN(functions.misc.toNumber(args[0]))) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  XKCDCommand
};