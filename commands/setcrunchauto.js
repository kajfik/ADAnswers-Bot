/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 3,
  name: "setcrunchauto",
  description: "Describes how to set your crunch autobuyer.",
  execute(message) {
    message.channel.send(`Look at how much IP you would gain on crunch when you reach your peak IP/min, and set it to that. It will probably be about a second after you get your last galaxy (make sure your dimboosts are off, unless you have the bulk dimboost upgrade)`);
  }
};