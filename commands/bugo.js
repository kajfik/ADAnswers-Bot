"use strict";

const functions = require("../functions");

module.exports = {
  name: "bugo",
  number: 2,
  description: "sends that screenshot of the break infinity upgrade order spreadsheet",
  execute(message) {
    // eslint-disable-next-line max-len
    if (functions.breakCheck(message.channel.id, message)) message.channel.send("https://cdn.discordapp.com/attachments/351476683016241166/855129740222005278/unknown.png");
  }
};
