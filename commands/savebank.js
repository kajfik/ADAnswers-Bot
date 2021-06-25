/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 5,
    name: "savebank",
    description: "Provides a link to Buck's save bank.",
    check: true,
    acceptableArgs: undefined,
    sent: [`https://buck4437.github.io/save-bank/ Check out Buck's save bank! If you've lost your save, try here and see if there's one close to your progress.`]
  })
};
