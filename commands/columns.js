/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  name: "columns",
  number: 2,
  description: "sends an image with the columns of infinity upgrades",
  execute(message) {
    if (functions.earlyGameCheck(message.channel.id, message)) message.channel.send(`https://cdn.discordapp.com/attachments/822306768624287744/839301389452967957/Screenshot_20210505-103747_b29a8b237ccc9257831c4b60110b5dac__01.jpg`);
    else message.channel.send("That command is only allowed in early game channels!");
  }
};
