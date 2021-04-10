/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "offlineticks",
  description: "offline ticks stuff",
  execute(message) {
    message.channel.send(`If you would like to have better offline progress and don't mind longer loading times you can increase the „Max offline ticks“ option up to 1m which represents 14 hours of accurate offline progress. Pressing the „speed up“ button calculates the rest of the offline ticks as if you had set the limit to 1k.
More info here: https://www.reddit.com/r/AntimatterDimensions/comments/esiji2/mobile_offline_ip_generation_is_significantly/ffa98qt`);
  }
};