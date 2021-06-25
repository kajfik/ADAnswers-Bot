/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const functions = require("./functions");

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
    // Sent is an array with all the possible send messages.
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
   * 
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
      // News is a really weird command because it doesn't require an arg, so some special cases are made here.
      if (args.length === 0 && this.name !== "news") {
        message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
        return;
      } 
      if (args.length === 0 && this.name === "news") {
        message.channel.send(this.sent[0]);
        return;
      }
      if (this.name === "studytree" || this.name === "ts") {
        if (functions.botCommandsCheck(id, message)) message.channel.send(this.getArgMessage(args));
        else if (this.getCheck(id, message)) message.author.send(this.getArgMessage(args)).catch(() => {
          message.reply("I can't DM you!");
        }).then(() => message.react("☑️"));
        else if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
        else if (!(args[0] === undefined)) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
        else message.channel.send(functions.getMessage("shouldNeverAppear"));
        return;
      }
      if (this.getCheck(id, message) && this.acceptableArgs.includes(args[0].toLowerCase())) message.channel.send(this.getArgMessage(args[0].toLowerCase()));
      else if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
      else if (!(args[0] === undefined)) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
      else message.channel.send(functions.getMessage("shouldNeverAppear"));
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
    switch (this.check) {
    case "earlyGame": return functions.earlyGameCheck(id, message);
    case "earlyInfinity": return functions.special.earlyInfinityCheck(id, message);
    case "setCrunchAutoCheck": return functions.special.setCrunchAutoCheck(id, message);
    case "breakCheck": return functions.breakCheck(id, message);
    case "earlyEternity": return functions.earlyEternityCheck(id, message);
    case "studyTreeCheck": return functions.special.studytreeCheck(id, message);
    case "eternityGrinding": return functions.special.eternityGrindingCheck(id, message);
    case "ecsCheck": return functions.ecsCheck(id, message);
    case "bankedInfs": return functions.special.bankedInfsCheck(id, message);
    case "dilationGrind": return functions.special.dilationGrindCheck(id, message);
    case "endgame": return functions.endgameCheck(id, message);
    case "botCommands": return functions.botCommandsCheck(id, message);
    case true: return true;
    default: throw `Unknown check.`;
    }
  }
}

module.exports = {
  classes: {
    com: Command
  }
};

