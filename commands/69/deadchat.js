/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "deadchat",
    
    description: "sends that one message from spec that he said that one time",
    check: true,
    sent: [`If chat is quiet, just move on and do something else instead of annoying people with what effectively amounts to "hey someone talk already"`]
  }),
};
