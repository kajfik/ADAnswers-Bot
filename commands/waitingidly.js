/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 69,
    name: "waitingidly",
    description: "idly!",
    check: "botCommands",
    acceptableArgs: undefined,
    sent: [`got dang! this guy has done so much for AD in just the past year. he is a great guy who knows his stuff.`]
  })
};