/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    number: 5,
    name: "dm",
    description: "Yes, you can use the bot in your DM's with it.",
    check: true,
    acceptableArgs: undefined,
    sent: [`You can use all of the bot's commands directly in DM's with the bot, or, if you prefer to not do that, you can use them in bot commands.
    
    Asking for some of the mid-Eternity commands will make the bot DM you instead of posting the response in the channel, to cut down on most of the spam.
    Make sure you have "receive DM's from server members" enabled in your privacy settings to be able to receive the information in your DMs.`]
  })
};
