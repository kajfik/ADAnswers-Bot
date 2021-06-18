"use strict";

const functions = require("../functions");

module.exports = {
  number: 3,
  name: "ep",
  description: "calculates the amount of IP required to get the number of EP specified. Works up to 1000.",
  execute(message, args, id) {
    if (functions.earlyEternityCheck(id, message)) {
      if (args[0] === undefined || Number.isNaN(args[0]) || args[0] === null) {
        message.channel.send(`Unknown arg ${args[0]} used in command \`++ep\``);
        return;
      }
      if (args[0] >= 1000) {
        message.channel.send(`In command \`++ep\`, you cannot use a number higher than 1000.`);
        return;
      }
      const ip = Math.ceil((308 * functions.misc.getBaseLog(5, args[0])) + 215.6);
      message.channel.send(`To get ${args[0]} EP, you need e${ip} Infinity Points.`);
    } else {
      message.reply(functions.getMessage("noWorky", { worky: "earlyEternity" }));
    }
  }
};