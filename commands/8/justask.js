/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "justask",
    description: "sends a passive aggressive thing",
    check: true,
    sent: ["please just ask your question. don't ask to ask. don't ask for topic experts or DMs. don't ping random users. skip the formalities and ask away! https://dontasktoask.com/"]
  })
};
