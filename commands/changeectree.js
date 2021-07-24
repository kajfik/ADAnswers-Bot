"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "changeectree",
    description: "Describes how to change your tree for doing an EC",
    number: 4,
    check: "ecsCheck",
    // eslint-disable-next-line max-len
    sent: [`As long as you buy the EC before you respec and don't buy another, you won't need to complete the secondary requirement again. 
    For example, with EC3:
 - unlock EC3 with TD/Active
 - respec and eternity
 - Buy the recommended tree
 - unlock EC3`]
  }),
};