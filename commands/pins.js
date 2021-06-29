/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 4,
    name: "pins",
    description: "pins",
    check: true,
    acceptableArgs: undefined,
    sent: [`pins. read them.`]
  })
};
