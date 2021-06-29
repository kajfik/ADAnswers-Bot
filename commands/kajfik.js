/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 69,
  name: "kajfik",
  description: "kaj!",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id, message)) message.channel.send(`i have known kaj for just over two years now and in that time he has managed to bring AD to so many more people and help grow the community. he is just such a nice guy and gets stuff done.`);
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};