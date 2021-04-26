"use strict";

const functions = require("../functions");

module.exports = {
  number: 3,
  name: "slightsmile",
  description: "kaj no",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id)) message.channel.send("\u{1F642}");
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};
