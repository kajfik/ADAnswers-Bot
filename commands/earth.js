/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 69,
    name: "earth",
    description: "who i am n shit",
    check: "botCommandsCheck",
    sent: [`heyo! it's earth. i aint do much of nothin but i did make some stuff! check out my website at https://earthernsence.github.io/`]
  })
};