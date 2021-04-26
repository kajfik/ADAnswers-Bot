/* eslint-disable max-len */
"use strict";

const NOW = Date();

function convertMillisecondsToDigitalClock(ms) {
  const days = Math.floor(ms / (3600000 * 24)),
    hours = Math.floor(ms % (3600000 * 24) / 3600000),
    minutes = Math.floor(((ms % (3600000 * 24) % 3600000) / 60000)),
    seconds = Math.floor((((ms % (360000 * 24) % 3600000) % 60000) / 1000));
  return {
    days,
    hours,
    minutes,
    seconds,
    clock: `${days <= 9 ? `0${days}` : `${days}`}:${hours <= 9 ? `0${hours}` : `${hours}`}:${minutes <= 9 ? `0${minutes}` : `${minutes}`}:${seconds <= 9 ? `0${seconds}` : `${seconds}`}`
  };
}

const functions = require("../functions");

module.exports = {
  number: 2,
  name: "meta",
  description: "Args: `lastRestart`, `uptime`, `ping`, `suggest`. internal bot information",
  execute(message, args, id) {
    if (functions.botCommandsCheck(id)) {
      switch (args[0]) {
      case "lastRestart":
        message.channel.send(NOW);
        break;
      case "uptime":
        message.channel.send(`The bot has been up for ${convertMillisecondsToDigitalClock(message.client.uptime).clock}`);
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