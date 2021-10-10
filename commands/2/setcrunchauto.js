/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    
    name: "setcrunchauto",
    description: "Describes how to set your crunch autobuyer.",
    check: "setCrunchAutoCheck",
    sent: [`Look at how much IP you would gain on crunch when you reach your peak IP/min, and set it to that. It will probably be about a second after you get your last galaxy (make sure your dimboosts are off, unless you have the bulk dimboost upgrade)`]
  })
};
