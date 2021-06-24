/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "bankedinfinities",
    number: 3,
    description: "describes banked infinities, what they do, and how to get them.",
    check: "bankedInfs",
    acceptableArgs: undefined,
    sent: [`Banked Infinities work like regular Infinities, except they stay on Eternity. To get Banked Infinities, have Time Study 191 or Achievement 131 "No Ethical Consumption" (these two effects stack, meaning if you have both you'll get 10% of your infinities converted), grind infinities (method in spoiler below), and then Eternity.
    Method for obtaining: see \`++infinitygrinding\`!`]
  })
};
