/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 5,
    name: "dm",
    description: "Yes, you can use the bot in your DM's with it.",
    check: true,
    sent: [`You can use all of the bot's commands directly in DM's with the bot, or, if you prefer to not do that, you can use them in bot commands.
    
    Asking for some of the mid-Eternity commands will make the bot DM you instead of posting the response in the channel, to cut down on most of the spam.
    Make sure you have "receive DM's from server members" enabled in your privacy settings to be able to receive the information in your DMs.`]
  })
};
