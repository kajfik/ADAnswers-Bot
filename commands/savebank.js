/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 5,
    name: "savebank",
    description: "Provides a link to Buck's save bank.",
    check: true,
    sent: [`https://buck4437.github.io/save-bank/ Check out Buck's save bank! If you've lost your save, try here and see if there's one close to your progress.`]
  })
};
