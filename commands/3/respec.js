/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({

    name: "respec",
    description: "Describes what respec studies does",
    check: true,
    sent: [`It resets your Time Studies and refunds all the TT when you next Eternity. There are no costs or downsides to doing this, just remember to redistribute your TT after Eternity!`]
  })
};