/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  name: "eternitygrinding",
  number: 6,
  description: "describes how to eternity grind",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (functions.special.eternityGrindingCheck(id)) message.channel.send(`
    Eternity buyer to 0, crunch (theoretically best to worst) 2e308, 1e154,1e103, 1e77 (all with "x times last" setting)
Test which works the best for you. You might have to adjust the value a little bit.`);
    else message.channel.send("this command only works in bot commands, common channels, or early eternity channels!");
  }
};