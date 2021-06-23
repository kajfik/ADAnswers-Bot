"use strict";

const functions = require("./functions");

class Command {
  constructor(config) {
    // Name is the name of the command. This is what's actually called in order to do a command
    // Number is the page it appears on.
    // Description is what appears on the help command.
    // Check is what's checked to see if the message works. Also used for getting the fail message.
    // AcceptableArgs is args that work in the command, when applicable.
    // Semt is an array with all the possible send messages.
    this.name = config.name;
    this.number = config.number;
    this.description = config.description;
    this.check = config.check;
    this.acceptableArgs = config.acceptableArgs;
    this.worky = config.worky;
    this.sent = config.sent;
  }

  // eslint-disable-next-line no-unused-vars
  execute(message, _args, id) {
    if (this.acceptableArgs === undefined) {
      if (this.getCheck(id, message)) message.channel.send(this.sent[0]);
      else message.channel.send(this.getFailMessage());
    }
  }

  getFailMessage() {
    return functions.getMessage("noWorky", { worky: this.check });
  }

  getCheck(id, message) {
    switch (this.check) {
    case "earlyGame": return functions.earlyGameCheck(id, message);
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

