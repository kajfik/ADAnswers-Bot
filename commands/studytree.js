/* eslint-disable no-negated-condition */
/* eslint-disable complexity */
/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 4,
  name: "studytree",
  description: `Generates a Time Study tree based on your total Time Theorems.
  Args: your total Time Theorems. Beginning at 54 TT (and until 120 TT), the command will take a second argument: \`active\`, \`passive\`, or \`idle\`. The argument is optional, and the default value is \`active\`.`,
  execute(message, args, id) {
    if (functions.special.studytreeCheck(id, message)) {
      try {
        if (args[0] === undefined) {
          throw `Error: Argument missing for command \`++${this.name}\``;
        }
        const theorem = Math.abs(Math.floor(args[0]));
        if (isNaN(theorem)) {
          throw `Unknown argument: Expected Number for command \`++${this.name}\` but found: --> ${args[0]} <--`;
        }
        const path = functions.studytree.toPath(args[1]);
        message.channel.send(functions.studytree.generateTree(theorem, path));
      } catch (e) {
        message.channel.send(e);
      }
    } else {
      message.channel.send("This command only works in bot commands, common channels, or EC channels!");
    }
  }
};
