/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 2,
  name: "achievements",
  description: "sends link to achievements guide",
  execute(message) {
    message.channel.send("Check out this cool guide by Hellbach! https://docs.google.com/document/d/1C8W_lt9EPxpu9wIloWZo5CPDdZ4ItP1-IU1Vs3x7lEg");
  }
};