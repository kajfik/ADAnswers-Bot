/* eslint-disable max-len */
"use strict";

const { MetaApplicationCommand } = require("../classes/ApplicationCommand/MetaApplicationCommand");

module.exports = {
  command: new MetaApplicationCommand({
    number: 4,
    name: "meta",
    description: "internal bot information",
    check: "botCommandsCheck",
    // We send undefined because it's *actually* going to be an embed we make in MetaApplicationCommand
    sent: undefined,
  })
};
