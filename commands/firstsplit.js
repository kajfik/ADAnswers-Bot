/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 3,
  name: "firstsplit",
  description: "Describes how to progress on the time study tree pre-TS171",
  // eslint-disable-next-line no-unused-vars
  execute(message, _args, id) {
    if (functions.earlyEternityCheck(id, message)) message.channel.send(`AD when it lets you get further down the tree, ID when you have 7 spare TT, TD when you can afford 171 as well`);
    else message.channel.send("This command can only be used in Early Eternity channels, common channels, or bot commands!");
  }
};
