/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 69,
  name: "punk",
  description: "punk?",
  execute(message) {
    if (config.ids.botCommands.includes(message.channel.id)) message.channel.send(`i have never spoken to punk but i really like their modding style`);
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};