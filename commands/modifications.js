/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 6,
    name: "modifications",
    description: "Explains the modifications of AD",
    check: true,
    sent: [`There are many modifications of AD. Most are created by DB Aarex. He created one of the more popular mods, NG+3. Check the pins of <#475151691956748288> for more information.`]
  })
};
