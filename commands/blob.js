/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 69,
  name: "blob",
  description: "blob",
  execute(message) {
    if (config.ids.botCommands.includes(message.channel.id)) message.channel.send("blob");
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};