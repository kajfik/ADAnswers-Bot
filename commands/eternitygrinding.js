/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  name: "eternitygrinding",
  number: 3,
  description: "describes how to eternity grind",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (functions.special.eternityGrindingCheck(id, message)) message.channel.send(`
    Eternity buyer to 0, crunch (theoretically best to worst) 2e308, 1e154,1e103, 1e77 (all with "x times last" setting)
Test which works the best for you. You might have to adjust the value a little bit. Use ID+active path.
Help for later:
||ETERNITY FARMING: (Do this on long AFKs up to 1M)

Early on:

-Leave all your autobuyers on except for RGs. (try turning off galaxies, sacrifice)
-Try Crunch at multiples of a fair value (1e40-1e100?) to force ID buying
-Use ID/TD and Active paths.

Later (a few hundred thousand -> 1M) -- application of different parts may vary in time

-ND/TD and Active Paths.
-Turn off Galaxy, Sacrifice, Dimension Autobuyers, Crunch (as needed to approach .08s or lower avg times)
-Change 8th dim autobuyer to singles from 10s (seems to be associated with starting AM and 8th dim cost)
-Play with game update speed. 37-38ms may be ideal at some points. 33ms at the end.
-Tweak just about anything else you can find to tweak and see if it helps.
-Reach 1M and you're done!

Speed Markers:
Channel Base: .12s
~e400-1,000+EP+ Base: .1s
~600k eternities:.08s||`);
    else message.channel.send("this command only works in bot commands, common channels, or early eternity channels and beyond!");
  }
};
