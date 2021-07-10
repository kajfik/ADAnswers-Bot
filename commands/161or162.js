/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({ 
    name: "161or162",
    number: 3,
    description: "Early Eternity command. Explains whether to chose TS161 or TS162", 
    check: "earlyEternity",
    acceptableArgs: undefined,
    sent: [`Before completing EC2 at least once, TS161 is better mathematically. They essentially give the same effect, but TS161's effect is more immediate.`] })
};
