/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "contributors",
    number: 4,
    description: "sends a list of contributors and what they helped with! this bot would not be possible without them.",
    check: "botCommandsCheck",
    sent: [`Hellbach: basis for most of the commands, provided much of the information used in this bot,
    Kajfik: Code contributions, notably in eternitychallenge.js,
    L4R5: EC database,
    Ninjatsu: the EC spreadsheet used by many players, provided all of the information in the EC database
    Pez: commands.find() in commands.js`]
  }),
};
