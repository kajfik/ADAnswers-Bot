/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 1,
  name: "earlyeternityprogression",
  description: "describes getting through the first few eternities",
  execute(message) {
    if (functions.earlyEternityCheck(message.channel.id, message)) {
      message.channel.send(`1.  First eternity's EP on TD1
2.  (Buying TS21 path + RESPEC) Eternity at e426IP for 3EP, spend all on TT
3.  (Buy TS42) Eternity at e500IP for 4 EP
(Buy TS51) Eternity at e614IP for 8EP
4.  Buy TS61, then get 100 eternities`);
    } else {
      message.channel.send("This only works in the common channels or Early Eternity channels!");
    }
  }
};