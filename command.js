/* eslint-disable no-negated-condition */
/* eslint-disable max-len */
"use strict";

const functions = require("./functions");

class Command {
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

  execute(message, args, id) {
    if (this.acceptableArgs === undefined) {
      if (this.getCheck(id, message)) message.channel.send(this.sent[0]);
      else message.channel.send(this.getFailMessage());
    } else if (this.acceptableArgs !== undefined) {
      if (this.getCheck(id, message)) message.channel.send(this.getArgMessage(args[0]));
      else if (args[0] === undefined) message.channel.send(functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
      else if (!(args[0] === undefined)) message.channel.send(functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
      else message.channel.send(functions.getMessage("shouldNeverAppear"));
    }
  }

  getFailMessage() {
    return functions.getMessage("noWorky", { worky: this.check });
  }

  getCheck(id, message) {
    switch (this.check) {
    case "earlyGame": return functions.earlyGameCheck(id, message);
    case "breakCheck": return functions.breakCheck(id, message);
    case "earlyEternity": return functions.earlyEternityCheck(id, message);
    case "bankedInfs": return functions.special.bankedInfsCheck(id, message);
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

