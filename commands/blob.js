/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "blob",
    number: 69,
    description: "blob",
    check: "botCommands",
    sent: ["blob"]
  })
};