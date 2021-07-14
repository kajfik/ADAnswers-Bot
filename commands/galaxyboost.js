"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 1,
    name: "galaxyboost",
    description: "compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy",
    check: "earlyGame",
    // eslint-disable-next-line max-len
    sent: ["The top equation shows the power of 0 galaxies and 100 tickspeed upgrades, while the bottom equation shows the power of just 1 galaxy and 100 tickspeed upgrades. The boost is about ~5.8x, and it will only get better! https://i.imgur.com/X026AsW.png"]
  })
};
