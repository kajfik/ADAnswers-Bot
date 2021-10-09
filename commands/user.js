"use strict";

const { UserApplicationCommand } = require("../classes/ApplicationCommand/UserApplicationCommand");

module.exports = {
  command: new UserApplicationCommand({
    number: 69,
    name: "user",
    description: "Get information about a user",
    check: "botCommandsCheck",
  })
};