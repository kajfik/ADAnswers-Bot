/* eslint-disable no-negated-condition */
/* eslint-disable complexity */
/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 4,
  name: "studytree",
  description: `Has a shorthand: \`++ts\`. Generates a Time Study tree based on your total Time Theorems.
  Args: your total Time Theorems. Beginning at 54 TT, the command will take a second argument: \`active\`, \`passive\`, or \`idle\`. The argument is optional, and the default value is \`active\`.`,
  execute(message, args, id) {
    if (functions.special.studytreeCheck(id, message)) {
      if (args[0] === (null || undefined) || args === []) {
        message.channel.send(`Error: Argument missing for command \`++studytree\``);
        return;
      }
      if (args[0].includes("x")) {
        message.channel.send("Hey, what are you trying to do? No X allowed!");
        return;
      }
      try {
        if (args[0] === undefined) {
          message.channel.send(`Error: Argument missing for command \`++studytree\``);
        }
        const theorem = Math.abs(Math.floor(args[0]));
        if (isNaN(theorem)) {
          message.channel.send(`Unknown argument: Expected Number for command \`++studytree\` but found: --> ${args[0]} <--`);
        }
        const path = functions.studytree.toPath(args[1]);
        if (functions.botCommandsCheck(id, message)) {
          message.channel.send(functions.studytree.generateTree(theorem, path));
        } else {
          message.author.send(functions.studytree.generateTree(theorem, path)).catch(() => {
            message.channel.send("Hey! I can't DM you!");
          }
          ); 
        }
      } catch (e) {
        message.channel.send(e);
      }
    } else {
      message.channel.send("This command only works in bot commands, common channels, or EC channels!");
    }
  }
};
