/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 1,
  name: "dilationgrind",
  description: "sends a message pertaining to reaching dilation",
  execute(message) {
    if (functions.special.dilationGrindCheck(message.channel.id)) message.channel.send(`If you have 5e9/5b binfs and 1e6/1m eternities, do a long, all evens idle run to get to 13k TTs`);
    else message.channel.send("This command only works in Dilation channels, common channels, the last EC channel, or bot commands!");
  }
};