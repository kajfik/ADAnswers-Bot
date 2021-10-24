"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({

    name: "slightsmile",
    description: "kaj no",
    check: "botCommandsCheck",
    sent: ["\u{1F642}"]
  })
};
