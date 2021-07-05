/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 6,
    name: "bottombuttons",
    description: "shows what the bottom buttons are",
    check: true,
    acceptableArgs: undefined,
    sent: [`You can use bottom buttons in Android version to buy some resources quickly. By default, you can see only Max button, but you can show all buttons by changing option Bottom buttons to ALL.

    E - ||\`E\`ternity||
    C - ||Big \`C\`runch||
    G - Antimatter \`G\`alaxy
    D - \`D\`imension Boost
    R - ||\`R\`eplicanti Galaxy||
    M/Max - \`M\`ax all (1st ~ 8th Dim and Tickspeed)`]
  }),
};