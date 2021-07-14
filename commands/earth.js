/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 69,
    name: "earth",
    description: "who i am n shit",
    check: "botCommands",
    sent: [`heyo! it's earth. i aint do much of nothin but i did make some stuff! check out my website at https://earthernsence.github.io/`]
  })
};