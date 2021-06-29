/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "justask",
    description: "sends a passive aggressive thing",
    number: 7,
    check: true,
    acceptableArgs: undefined,
    sent: ["please just ask your question. don't ask to ask. don't ask for topic experts or DMs. don't ping random users. skip the formalities and ask away! https://dontasktoask.com/"]
  })
};
