/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 5,
  name: "dm",
  description: "Yes, you can use the bot in your DM's with it.",
  execute(message) {
    message.channel.send(`Asking for \`++ts\`, \`++ec\`, and \`++eco\` will make the bot DM you instead of posting the response in the channel, to cut down on most of the spam.
Make sure you have "receive DM's from server members" enabled in your privacy settings.
If you want you can use all of the bot's commands directly in DM's with the bot.`);
  }
};
