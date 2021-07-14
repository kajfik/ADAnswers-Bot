"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "discordformatting",
    number: 6,
    description: "returns a link to a list of discord formatting stuff",
    check: true,
    sent: ["<https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51>"]
  })
};
