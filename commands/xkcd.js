/* eslint-disable max-len */
"use strict";

const { classes } = require("../command.js");
const functions = require("../functions.js");

module.exports = {
  command: new classes.com({
    name: "xkcd",
    number: 7,
    description: "has an arg: XKCD number. sends the link to that xkcd",
    check: "botCommands",
    acceptableArgs: ["Any number"],
    sent: undefined,
    getArgMessage(arg) {
      const a = functions.misc.toNumber(arg);
      return `https://xkcd.com/${a}/`;
    }
  })
};