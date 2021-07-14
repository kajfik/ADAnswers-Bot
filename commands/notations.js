"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 5,
    name: "notations",
    description: `Sends a link to the Notations GitHub repo.`,
    check: true,
    sent: ["Check out all notations in action at https://antimatter-dimensions.github.io/notations/"]
  })
};
