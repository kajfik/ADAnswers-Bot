/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 6,
    name: "modifications",
    description: "Explains the modifications of AD",
    check: true,
    acceptableArgs: undefined,
    sent: [`There are many modifications of AD. Most are created by DB Aarex. He created one of the more popular mods, NG+3. Check the pins of <#475151691956748288> for more information.`]
  })
};
