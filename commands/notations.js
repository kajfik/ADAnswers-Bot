"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 5,
    name: "notations",
    description: `Sends a link to the Notations GitHub repo.`,
    check: true,
    acceptableArgs: undefined,
    sent: ["Check out all notations in action at https://antimatter-dimensions.github.io/notations/"]
  })
};
