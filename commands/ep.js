"use strict";

const { classes } = require("../command");
const functions = require("../functions");

module.exports = {
  command: new classes.com({
    number: 3,
    name: "ep",
    description: "calculates the amount of IP required to get the number of EP specified. Works up to 1000.",
    check: "earlyEternity",
    acceptableArgs: ["Any number"],
    sent: undefined,
    getArgMessage(arg) {
      if (arg > 1000) return `In command \`++ep\`, you cannot use a number higher than 1000.`;
      const ip = Math.ceil((308 * functions.misc.getBaseLog(5, arg)) + 215.6);
      return `To get ${arg} Eternity Points, you need e${ip} Infinity Points`;
    }
  })
};