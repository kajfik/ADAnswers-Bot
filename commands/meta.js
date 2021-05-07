/* eslint-disable max-len */
"use strict";

const NOW = Date();

const functions = require("../functions");

module.exports = {
  number: 2,
  name: "meta",
  description: "Args: `lastRestart`, `uptime`, `ping`, `suggest`, `invite`. internal bot information",
  execute(message, args, id) {
    if (functions.botCommandsCheck(id, message)) {
      switch (args[0]) {
      case "lastRestart":
        message.channel.send(NOW);
        break;
      case "uptime":
        message.channel.send(`The bot has been up for ${functions.misc.convertMillisecondsToDigitalClock(message.client.uptime).clock}`);
        break;
      case "ping":
        message.channel.send(`Pinging...`).then(sent => {
          sent.edit(`Pong! Time taken: ${sent.createdTimestamp - message.createdTimestamp}ms`);
        });
        break;
      case "suggest":
        message.channel.send(`Submit an issue on GitHub at <https://github.com/earthernsence/ADAnswers-Bot/issues> to suggest more commands!`);
        break;
      case "invite":
        message.channel.send(`If, for whatever reason, you wish to invite me to your server, go to https://discord.com/api/oauth2/authorize?client_id=830197123378053172&permissions=84992&scope=bot.`);
        break;
      default:
        message.channel.send(`Meta command not found.`);
      }
    } else {
      message.channel.send("This command only works in bot commands!");
    }
  }
};