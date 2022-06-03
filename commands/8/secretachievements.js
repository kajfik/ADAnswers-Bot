"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "secretachievements",
    description: "Sends a link to the secret achievements guide.",
    check: true,
    sent: [`<https://antimatter-dimensions.fandom.com/wiki/Achievements#Secret_achievement_list>`]
  })
};