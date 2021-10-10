/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    
    name: "firstsplit",
    description: "Describes how to progress on the time study tree pre-TS171",
    check: "earlyEternityCheck",
    sent: [`AD when it lets you get further down the tree, ID when you have 7 spare TT, TD when you can afford 171 as well`]
  })
};
