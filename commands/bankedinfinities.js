/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 5,
  name: "bankedinfinities",
  description: "describes banked infinities, what they do, and how to get them.",
  execute(message) {
    const id = message.channel.id;
    if (functions.special.bankedInfsCheck(id)) {
      message.channel.send(`Banked Infinities work like regular Infinities, except they stay on Eternity. To get Banked Infinities, have Time Study 191 or Achievement 131 "No Ethical Consumption" (these two effects stack, meaning if you have both you'll get 10% of your infinities converted), grind infinities (method in spoiler below), and then Eternity.
    Method: ||INFINITY FARMING: (Do this on long AFKs) ---- EC10 diminishing returns, reach at least 5 billion eventually (achievement)

Method:
-Normal IDLE build (Autobuy RG off -- good for EP later, use 225 with full tree ++ achievement at e20,000 replicanti)
             ----OR----
-PASSIVE (Autobuy RG on -- 11% faster infinities, no EP later, use 226 with full tree -- not recommended before very high EP -- 33ms required)

-Crunch 5s
-AutoGalaxy .4s (or .05s with a maximum galaxy count of the highest you reach in under 4.9 seconds)
-AutoDimboost .1s
-Get "high" IP before starting||`);
    } else {
      message.channel.send(`This commmand is only allowed in bot commands and its channels that it applies in.`);
    }
  }
};