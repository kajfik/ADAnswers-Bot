/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 69,
    name: "kajfik",
    description: "kaj!",
    check: "botCommandsCheck",
    sent: [`i have known kaj for just over two years now and in that time he has managed to bring AD to so many more people and help grow the community. he is just such a nice guy and gets stuff done.`]
  })
};