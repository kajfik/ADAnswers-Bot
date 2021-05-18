/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 2,
  name: "setcrunchauto",
  description: "Describes how to set your crunch autobuyer.",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (functions.special.setCrunchAutoCheck(id, message)) message.channel.send(`Look at how much IP you would gain on crunch when you reach your peak IP/min, and set it to that. It will probably be about a second after you get your last galaxy (make sure your dimboosts are off, unless you have the bulk dimboost upgrade)`);
    else message.channel.send("This command only works in early game channels, common channels, or bot commands!");
  }
};
