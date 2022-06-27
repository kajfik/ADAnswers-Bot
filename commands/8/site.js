"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "site",
    description: "Says the game site + link to android version",
    check: true,
    sent: [`Web: https://ivark.github.io/
    Android version: <https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions>`],
  }),
};