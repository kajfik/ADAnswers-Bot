/* eslint-disable max-len */
"use strict";

const NOW = Date();

function convertMillisecondsToDigitalClock(ms) {
  const hours = Math.floor(ms / 3600000), 
    minutes = Math.floor((ms % 3600000) / 60000),
    seconds = Math.floor(((ms % 360000) % 60000) / 1000);
  return {
    hours,
    minutes,
    seconds,
    clock: `${hours}:${minutes}:${seconds}`
  };
}
module.exports = {
  number: 1,
  name: "meta",
  description: "Args: `lastRestart`, `uptime`, `ping`. internal bot information",
  execute(message, args) {
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
    default:
      message.channel.send(`Meta command not found.`);
    }
  }
};