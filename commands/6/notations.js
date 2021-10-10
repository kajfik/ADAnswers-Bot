"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 5,
    name: "notations",
    description: `Sends a link to the Notations GitHub repo.`,
    check: true,
    sent: ["Check out all notations in action at https://antimatter-dimensions.github.io/notations/"]
  })
};
