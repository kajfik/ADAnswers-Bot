"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");
const { Misc } = require("../../classes/FunctionClasses/Misc");
const link = (content, url) => Misc.link(content, url);

module.exports = {
  command: new ApplicationCommand({
    name: "notations",
    description: `Sends a link to the Notations GitHub repo.`,
    check: true,
    sent: [`Check out all notations in action ${link("here", "https://antimatter-dimensions.github.io/notations/")}`]
  })
};
