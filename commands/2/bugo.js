"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "bugo",
    number: 2,
    description: "sends that screenshot of the break infinity upgrade order spreadsheet",
    check: "breakCheck",
    sent: ["https://cdn.discordapp.com/attachments/351476683016241166/855129740222005278/unknown.png"]
  }),
};
