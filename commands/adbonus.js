/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "adbonus",
  description: "Sends ad bonus formulas/multipliers",
  execute(message) {
    message.channel.send(`DT: 2
EP: min(max(EP^0.01, 1.5), 1e10)
IP: max(IP^0.01, 2)
AD: 2`);
  }
};