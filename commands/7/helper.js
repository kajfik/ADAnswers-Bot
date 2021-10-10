/* eslint-disable max-len */
"use strict";

const { HelperApplicationCommand } = require("../../classes/ApplicationCommand/HelperApplicationCommand");

module.exports = {
  command: new HelperApplicationCommand({
    number: 7,
    name: "helper",
    description: "sends a consent form to become a designated helper",
    check: "botCommandsCheck",
    // We send undefined because it's *actually* going to be an embed we make in HelperApplicationCommand
    sent: undefined,
  })
};
