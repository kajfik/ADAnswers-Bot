"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "bugo",
    number: 2,
    description: "sends that screenshot of the break infinity upgrade order spreadsheet",
    check: "breakCheck",
    acceptableArgs: undefined,
    sent: ["https://cdn.discordapp.com/attachments/351476683016241166/855129740222005278/unknown.png"]
  }),
};
