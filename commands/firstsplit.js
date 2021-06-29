/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 3,
    name: "firstsplit",
    description: "Describes how to progress on the time study tree pre-TS171",
    check: "earlyEternity",
    acceptableArgs: undefined,
    sent: [`AD when it lets you get further down the tree, ID when you have 7 spare TT, TD when you can afford 171 as well`]
  })
};
