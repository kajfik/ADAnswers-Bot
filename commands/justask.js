/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "justask",
    description: "sends a passive aggressive thing",
    number: 7,
    check: true,
    acceptableArgs: undefined,
    sent: ["please just ask your question. don't ask to ask. don't ask for topic experts or DMs. don't ping random users. skip the formalities and ask away! https://dontasktoask.com/"]
  })
};
