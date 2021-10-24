/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "bankedinfinities",

    description: "describes banked infinities, what they do, and how to get them.",
    check: "bankedInfsCheck",
    sent: [`Banked Infinities work like regular Infinities, except they stay on Eternity. To get Banked Infinities, have Time Study 191 or Achievement 131 "No Ethical Consumption" (these two effects stack, meaning if you have both you'll get 10% of your infinities converted), grind infinities (method in spoiler below), and then Eternity.
    Method for obtaining: see \`/infinitygrinding\`!`]
  })
};
