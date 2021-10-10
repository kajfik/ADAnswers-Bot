/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({ 
    name: "1minuteinf", 
    number: 1, 
    description: "explains the UI change at infinity in under a minute",
    check: "earlyGameCheck",
    sent: [`When you infinity in under a minute, the UI changes on the screen. Instead of the Dimensions disappearing, they stay and the Big Crunch button appears on top of them. This is merely visual, and is there to prevent flickering.`],
  })
};
