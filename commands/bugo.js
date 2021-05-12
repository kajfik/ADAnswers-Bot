"use strict";

const functions = require("../functions");

module.exports = {
  name: "bugo",
  number: 7,
  description: "sends that screenshot of the break infinity upgrade order spreadsheet",
  execute(message) {
    // eslint-disable-next-line max-len
    if (functions.breakCheck(message.channel.id, message)) message.channel.send("https://cdn.discordapp.com/attachments/387799020099338241/841595219250118716/BU.jpg");
  }
};
