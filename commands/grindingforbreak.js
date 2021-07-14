/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 2,
    name: "grindingforbreak",
    description: "Describes how to reach Break Infinity.",
    check: true,
    sent: [`Get the 10,000 cost 2x IP then save up. On mobile you will need a total of 32,767 IP (2^15 - 1). You'll have to make an additional purchase on web, because the crunch buyers default interval is at 300 seconds - while mobiles is at 150 seconds. That means you need 65,535 IP (2^16 - 1) in total if you're playing on web. (You'll also need to complete C12 if you haven't already)`]
  })
};
