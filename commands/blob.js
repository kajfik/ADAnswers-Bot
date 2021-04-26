/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 69,
  name: "blob",
  description: "blob",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id)) message.channel.send("blob");
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};