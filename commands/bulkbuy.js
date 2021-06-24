/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 2,
    name: "bulkbuy",
    description: "describes bulk buy",
    check: true,
    acceptableArgs: undefined,
    sent: [`This allows you to buy more than one set (ONLY on buy 10s) in one interval. This helps speed up runs overall when using autobuyers. At 512 bulk for all autobuyers on mobile and in the upcoming Reality update, bulk buy is maximised.`]
  }),
};
