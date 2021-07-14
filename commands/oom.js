"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "oom",
    number: 6,
    check: true,
    description: "describes what an OoM (Order of Magnitude) is",
    sent: [`An OoM (or **O**rder **o**f **M**agnitude) is the difference between the exponents of numbers, i.e. 1e100 -> 1e108 is a difference of 8 OoMs.`]
  }),
};