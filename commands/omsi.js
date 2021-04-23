/* eslint-disable max-len */
"use strict";

const config = require("../config.json");

module.exports = {
  number: 69,
  name: "omsi",
  description: "omsi!",
  execute(message) {
    if (config.ids.botCommands.includes(message.channel.id)) message.channel.send(`omsi is a really cool person! she's done a ton of work for AD and is all around a real neat person.`);
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};