/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "161or162",
  description: "Explains whether to chose TS161 or TS162",
  execute(message) {
    message.channel.send(`Before completing EC2 at least once, TS161 is better mathematically. They essentially give the same effect, but TS161's effect is more immediate.`);
  }
};