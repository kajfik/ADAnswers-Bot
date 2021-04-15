/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 3,
  name: "respec",
  description: "Describes what respec studies does",
  execute(message) {
    message.channel.send(`It resets your time studies and refunds all the TT when you next eternity`);
  }
};