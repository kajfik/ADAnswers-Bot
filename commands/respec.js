/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 3,
    name: "respec",
    description: "Describes what respec studies does",
    check: true,
    acceptableArgs: undefined,
    sent: [`It resets your Time Studies and refunds all the TT when you next Eternity. There are no costs or downsides to doing this, just remember to redistribute your TT after Eternity!`]
  })
};