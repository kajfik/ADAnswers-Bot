/* eslint-disable max-len */
"use strict";

const { Command } = require("./Command");

class NewsCommand extends Command {
  execute(message, args) {
    if (message.content.length > 1000) {
      message.channel.send(`You cannot try to trigger a command over this length!`);
      return;
    }
    
    if (args.length === 0) {
      message.channel.send(this.sent[0]);
    } else this.regularCommand(message, args, message.channel.id);
  }
}

module.exports = {
  NewsCommand
};