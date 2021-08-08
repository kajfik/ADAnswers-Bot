/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "columns",
    number: 1,
    description: "sends an image with the columns of infinity upgrades",
    check: "earlyGame",
    sent: [`https://cdn.discordapp.com/attachments/822306768624287744/839301389452967957/Screenshot_20210505-103747_b29a8b237ccc9257831c4b60110b5dac__01.jpg`]
  }),
};
