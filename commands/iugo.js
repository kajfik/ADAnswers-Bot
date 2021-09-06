"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 1,
    name: "iugo",
    description: "pre break infinity upgrade order routes",
    check: "earlyInfinityCheck",
    sent: [`https://cdn.discordapp.com/attachments/387798906333036546/883417052159836250/upgrade_order-1.jpeg`]
  })
};