"use strict";


const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 69,
    name: "tamtf",
    description: "teach a man to fish... (basically me saying that the bot is the greatest thing ever)",
    check: true,
    sent: [`give a man an answer for AD using ADAB, feed him for a day. teach a man to use ADAB and feed for a lifetime...`],
  }),
};