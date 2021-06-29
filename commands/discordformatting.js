"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "discordformatting",
    number: 6,
    description: "returns a link to a list of discord formatting stuff",
    check: true,
    acceptableArgs: undefined,
    sent: ["<https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51>"]
  })
};
