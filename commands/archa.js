/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 69,
  name: "archa",
  description: "archa!",
  execute(message) {
    if (functions.botCommandsCheck(message.channel.id)) message.channel.send(`archa! really cool tester and stuff, real nice guy. there's no way you can hate archa.`);
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};