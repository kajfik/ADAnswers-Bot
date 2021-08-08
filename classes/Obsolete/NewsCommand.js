/* eslint-disable max-len */
"use strict";

const { Command } = require("../Command");

// I'm keeping this because I don't really want to get rid of it, to be completely honest. It isn't used anywhere,
// but I want to keep it for posterity, I guess.

/**
 * @class NewsCommand
 * @extends {Command}
 * Class representing a news command. Extends base {@link Command} class.
 * No constructor, as it has no extra data in the config provided in the command files where this class is used.
 */
class NewsCommand extends Command {
  /**
   * @param {string} message - Message object that contains everything about the message.
   * @param {Array} args - Array of arguments that are passed to the command.
   */
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