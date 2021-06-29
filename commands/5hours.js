/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "5hours",
    number: 7,
    description: "Explains the long-standing 5 hours joke",
    check: true,
    acceptableArgs: undefined,
    sent: [`The 5 hours joke is a reference to an even older joke from a time when AD updates were quite frequent. As a response to that, Acamaeda made a news message suggestion: "Antimatter Dimensions: the next update is always 5 hours away. Always." and the rest is history.`]
  }),
};
