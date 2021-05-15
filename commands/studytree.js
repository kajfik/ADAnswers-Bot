/* eslint-disable no-console */
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
        message.channel.send("Hey, what are you trying to do? No X allowed! Are you looking for `++ec`?");
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
        const sent = functions.getMessage("ts", { theorem, path });

        if (args.includes("show") && message.author.id === "213071245896450068") {
          message.channel.send(sent);
          return;
        }

        if (functions.botCommandsCheck(id, message) || functions.commonCheck(id)) {
          message.channel.send(sent);
        } else {
          message.author.send(sent).catch(() => {
            message.channel.send("Hey! I can't DM you!");
          }).then(() => {
            message.react("☑️");
          }).catch(() => {
            console.log("something went wrong while trying to add a reaction in command studytree.");
            console.log(`${message.url}`);
          }); 
        }
      } catch (e) {
        message.channel.send(e);
      }
    } else {
      message.channel.send("This command only works in bot commands, common channels, or EC channels!");
    }
  }
};
