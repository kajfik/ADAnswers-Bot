/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");

class NewsCommand extends Command {
  execute(message, args) {
    if (args.length === 0) {
      message.channel.send(this.sent[0]);
    } else this.regularCommand(message, args, message.channel.id);
  }
}

module.exports = {
  NewsCommand
};