/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "archa",
    number: 69,
    description: "archa!",
    check: "botCommandsCheck",
    sent: [`archa! really cool tester and stuff, real nice guy. there's no way you can hate archa.`]
  })
};