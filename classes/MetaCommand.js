/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");
const functions = require("../functions");

class MetaCommand extends Command {
  execute(message, args, id) {
    if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (this.getCheck(id, message) && args[0] !== "ping" && args[0] !== "uptime") message.channel.send(this.getArgMessage(args[0]));
    else if (this.getCheck(id, message) && args[0] === "ping") message.channel.send(this.getArgMessage(args[0])).then(sentMessage => {
      sentMessage.edit(`Pong! Time taken: ${sentMessage.createdTimestamp - message.createdTimestamp}ms`);
    });
    else if (this.getCheck(id, message) && args[0] === "uptime") message.channel.send(this.getArgMessage(args[0])).then(sentMessage => {
      sentMessage.edit(`The bot has been up for ${functions.misc.convertMillisecondsToDigitalClock(message.client.uptime).clock}`);
    });
    else if (args[0] !== undefined) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = {
  MetaCommand
};