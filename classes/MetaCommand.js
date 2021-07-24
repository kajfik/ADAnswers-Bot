/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");
const functions = require("../functions");

class MetaCommand extends Command {
  execute(message, args, id) {
    if (args[0] === undefined) {
      this.doMissingArgCatch(message, args);
      return;
    }
    const argMessage = this.getArgMessage(args[0].toLowerCase());
    const check = this.getCheck(id, message);

    if (check && args[0] !== "ping" && args[0] !== "uptime") message.channel.send(argMessage);
    else if (check && args[0] === "ping") message.channel.send(argMessage).then(sentMessage => {
      sentMessage.edit(`Pong! Time taken: ${sentMessage.createdTimestamp - message.createdTimestamp}ms`);
    });
    else if (check && args[0] === "uptime") message.channel.send(argMessage).then(sentMessage => {
      sentMessage.edit(`The bot has been up for ${functions.misc.convertMillisecondsToDigitalClock(message.client.uptime).clock}`);
    });
    else if (args[0] !== undefined) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (!check) message.channel.send(this.getFailMessage());
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  MetaCommand
};