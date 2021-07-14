/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 69,
    name: "unsmith",
    description: ":unsmith:",
    check: "botCommands",
    sent: ["this command is dedicated to platonic. creator of synergism. love ya. go play synergism at https://pseudo-corp.github.io/SynergismOfficial/"]
  })
};
