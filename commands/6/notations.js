"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({

    name: "notations",
    description: `Sends a link to the Notations GitHub repo.`,
    check: true,
    sent: ["Check out all notations in action at https://antimatter-dimensions.github.io/notations/"]
  })
};
