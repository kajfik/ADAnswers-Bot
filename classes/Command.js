/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

/**
 * Class representing a command. This handles all the backend of it and you only need to provide what is in the config.
 */
class Command {
  /**
   * Creates the command and assigns all the information to this
   * @param {Object} config Contains all the information about the command being passed in. Contains name, number, description, check, acceptable args, sent message, type of command (for shorthands), and the method to get messages with args.
   */
  constructor(config) {
    // Name is the name of the command. This is what's actually called in order to do a command
    // Number is the page it appears on.
    // Description is what appears on the help command.
    // Check is what's checked to see if the message works. Also used for getting the fail message.
    // AcceptableArgs is args that work in the command, when applicable.
    // Sent is an array with all the possible send messages. Sent being an array is a relic from an old system that I thought would work where it stores all the possible messages that can be sent, but instead I made getArgMessage().
    // Type is something only shorthand commands have and is used to remove them from the help command.
    this.name = config.name;
    this.number = config.number;
    this.description = config.description;
    this.check = config.check;
    this.acceptableArgs = config.acceptableArgs;
    this.sent = config.sent;
    this.type = config.type;
    this.getArgMessage = config.getArgMessage;
  }

  /**
   * Executes the command
   * @param {Object} message Object that contains all the information about the message.
   * @param {Array} args An array with the args provided by the user in the command message.
   * @param {String} id String with the ID of the channel the message was sent in.
   * @returns A successful command execution (when the response is sent) or a failure from an error.
   */
  execute(message, args, id) {
    if (this.acceptableArgs === undefined) {
      if (this.getCheck(id, message)) message.channel.send(this.sent[0]);
      else message.channel.send(this.getFailMessage());
    } else if (this.acceptableArgs !== undefined) {
      this.regularCommand(message, args, id);
    }
  }

  /**
   * Shorthand way to get the fail message using the check provided in the config.
   * @returns String with the failure message.
   */
  getFailMessage() {
    return functions.getMessage("noWorky", { worky: this.check });
  }

  /**
   * Turns the check provided in the config into a function.
   * @param {String} id String with the ID of the channel the message was sent in.
   * @param {Object} message Object that contains all the information about the message.
   * @returns True/false
   */
  getCheck(id, message) {
    if (functions.checkObject[this.check]) return functions.checkObject[this.check](id, message);
    throw `Unknown check.`;
  }

  /**
   * Does the regular command execution. Made to reduce clutter in the main execute() method.
   * @param {Object} message Object that contains all the information about the message.
   * @param {Array} args An array with the args provided by the user in the command message.
   * @param {String} id String with the ID of the channel the message was sent in.
   */
  regularCommand(message, args, id) {
    if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
    else if (this.getCheck(id, message) && this.acceptableArgs.includes(args[0].toLowerCase())) message.channel.send(this.getArgMessage(args[0].toLowerCase()));
    else if (!(args[0] === undefined)) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else message.channel.send(functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = { Command };

