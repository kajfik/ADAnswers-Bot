"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "discordformatting",
    
    description: "returns a link to a list of discord formatting stuff",
    check: true,
    sent: ["<https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51>"]
  })
};
