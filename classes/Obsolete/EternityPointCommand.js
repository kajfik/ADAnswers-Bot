/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const { Command } = require("../Command");
const functions = require("../../utils/functions/functions");

class EternityPointCommand extends Command {
  execute(message, args, id) {
    const a = functions.misc.toNumber(args[0]);
    const argMessage = this.getArgMessage(a);
    const check = this.getCheck(id, message);
    const aIsNaN = isNaN(a);

    if (message.content.length > 1000) {
      message.channel.send(`You cannot try to trigger a command over this length!`);
      return;
    }

    if (!aIsNaN && check && !(a > 1000)) message.channel.send(argMessage);
    else if (args[0] === undefined) this.doMissingArgCatch(message, args);
    else if (!aIsNaN && check && a > 1000) message.channel.send(`In command \`++ep\`, you cannot use a number higher than 1000.`);
    else if (aIsNaN && check) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (!check) message.channel.send(this.getFailMessage());
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  EternityPointCommand
};