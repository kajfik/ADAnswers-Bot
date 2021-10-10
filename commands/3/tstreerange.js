"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "tstreerange",
    description: "Says why sometimes the bot will recommend a tree for more TT than you have",
    number: 4,
    check: "studyTreeCheck",
    // eslint-disable-next-line max-len
    sent: ["Sometimes, the bot may recommend a tree for more TT than you have. This is because the bot is programmed to do so, and is not a bug. Just copy the tree and import it, and it will buy what you can. The tree will still work, and it should provide you with the TT to get the rest of the tree eventually as well."]
  }),
};