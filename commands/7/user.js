"use strict";

const { UserApplicationCommand } = require("../../classes/ApplicationCommand/UserApplicationCommand");

module.exports = {
  command: new UserApplicationCommand({
    
    name: "user",
    description: "Get information about a user",
    check: "botCommandsCheck",
  })
};