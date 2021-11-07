"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({

    name: "iugo",
    description: "pre break infinity upgrade order routes",
    check: "earlyInfinityCheck",
    sent: [`https://cdn.discordapp.com/attachments/387798906333036546/906978039517306920/iugo_v3.jpeg`]
  })
};
