/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 5,
    name: "dm",
    description: "Yes, you can use the bot in your DM's with it.",
    check: true,
    sent: [`You can use all of the bot's commands directly in DM's with the bot, or, if you prefer to not do that, you can use them in bot commands.
    
    However, do note that with slash commands, any command you use will be only visible to you, but it will trigger an unread message in the channel you used it in.
    So, do still refrain from doing that.

    Asking for the challenge commands (i.e. \`++c10\`) or ||some of the mid-Eternity|| commands will make the bot DM you instead of posting the response in the channel, to cut down on most of the spam.
    Make sure you have "receive DM's from server members" enabled in your privacy settings to be able to receive the information in your DMs.`]
  })
};
