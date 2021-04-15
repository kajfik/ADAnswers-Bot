/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 3,
  name: "sacrifice",
  description: "describes when to sac",
  execute(message) {
    message.channel.send(`I recommend sacing after you buy 10 8th dims and the multiplier is >2x`);
  }
};