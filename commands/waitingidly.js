/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 69,
    name: "waitingidly",
    description: "idly!",
    check: "botCommandsCheck",
    sent: [`got dang! this guy has done so much for AD in just the past year. he is a great guy who knows his stuff.`]
  })
};