/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 5,
  name: "bankedinfinities",
  description: "describes banked infinities, what they do, and how to get them.",
  execute(message) {
    const id = message.channel.id;
    if (functions.special.bankedInfsCheck(id, message)) {
      message.channel.send(`Banked Infinities work like regular Infinities, except they stay on Eternity. To get Banked Infinities, have Time Study 191 or Achievement 131 "No Ethical Consumption" (these two effects stack, meaning if you have both you'll get 10% of your infinities converted), grind infinities (method in spoiler below), and then Eternity.
    Method for obtaining: see \`++infinitygrinding\`!`);
    } else {
      message.channel.send(`This commmand is only allowed in bot commands and its channels that it applies in.`);
    }
  }
};