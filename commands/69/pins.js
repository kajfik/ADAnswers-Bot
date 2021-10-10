/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    
    name: "pins",
    description: "pins",
    check: true,
    sent: [`pins. read them.`]
  })
};
