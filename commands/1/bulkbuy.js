/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    
    name: "bulkbuy",
    description: "describes bulk buy",
    check: true,
    sent: [`This allows you to buy more than one set (ONLY on buy 10s) in one interval. This helps speed up runs overall when using autobuyers. At 512 bulk for all autobuyers on mobile and in the upcoming Reality update, bulk buy is maximised.
    Another explanation, courtesy of the mobile how to play: Once the interval of a Dimension Autobuyer is maxed, all future upgrades will double the amount the autobuyer purchases per tick. This can be disabled.`]
  }),
};
