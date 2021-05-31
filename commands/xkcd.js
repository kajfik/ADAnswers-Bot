/* eslint-disable max-len */
"use strict";

const functions = require("../functions.js");

module.exports = {
  name: "xkcd",
  number: 7,
  description: "has an arg: XKCD number. sends the link to that xkcd",
  execute(message, args, id) {
    if (functions.botCommandsCheck(id, message) && !isNaN(args[0])) message.channel.send(`https://xkcd.com/${args[0]}/`);
    else if (functions.botCommandsCheck(id, message) && isNaN(args[0])) message.channel.send(functions.getMessage("error", { args, name: "xkcd", acceptableArgs: ["a number of an XKCD"] }));
    else message.channel.send("This command only works in bot commands!");
  }
};