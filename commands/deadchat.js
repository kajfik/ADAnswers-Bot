/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "deadchat",
    number: 7,
    description: "sends that one message from spec that he said that one time",
    check: true,
    acceptableArgs: undefined,
    sent: [`If chat is quiet, just move on and do something else instead of annoying people with what effectively amounts to "hey someone talk already"`]
  }),
};
