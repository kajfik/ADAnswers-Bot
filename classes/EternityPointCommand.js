/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");
const functions = require("../functions");

class EternityPointCommand extends Command {
  execute(message, args, id) {
    const a = functions.misc.toNumber(args[0]);
    if (!isNaN(a) && this.getCheck(id, message) && !(a > 1000)) message.channel.send(this.getArgMessage(a));
    else if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (!isNaN(a) && this.getCheck(id, message) && a > 1000) message.channel.send(`In command \`++ep\`, you cannot use a number higher than 1000.`);
    else if (isNaN(a) && this.getCheck(id, message)) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (!this.getCheck(id, message)) message.channel.send(this.getFailMessage());
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  EternityPointCommand
};