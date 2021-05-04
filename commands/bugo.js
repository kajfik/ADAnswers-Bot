"use strict";

const functions = require("../functions");

module.exports = {
  name: "bugo",
  number: 8,
  description: "sends that screenshot of the break infinity upgrade order spreadsheet (Mobile)",
  execute(message) {
    // eslint-disable-next-line max-len
    if (functions.breakCheck(message.channel.id, message)) message.channel.send("https://cdn.discordapp.com/attachments/387799020099338241/812839326509301761/Screenshot_20210221-011030.jpg");
  }
};