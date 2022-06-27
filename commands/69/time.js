"use strict";

const { TimeApplicationCommand } = require("../../classes/ApplicationCommand/TimeApplicationCommand");

module.exports = {
  command: new TimeApplicationCommand({
    name: "time",
    description: "Displays the current time, in Decimal time. https://en.wikipedia.org/wiki/Decimal_time",
    check: "botCommandsCheck",
    // Sent message stuff is handled in the class itself
    sent: undefined
  }),
};