/* eslint-disable no-console */
"use strict";

const { increaseSeconds } = require("./time");
const { combined } = require("../messages");

/**
 * Starts intervals for the bot. Currently, the only interval being started is the switching bot status, and also decimal time
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function startIntervals(client) {
  setInterval(setBotStatus, 30000, client);
  setInterval(increaseSeconds, 864);
}

/**
 * Changes the bot status, currently every minute.
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function setBotStatus(client) {
  const next = combined.next();
  console.log(`Changed status to ${next}.`);
  client.user.setActivity(next, { type: "LISTENING" });
}

module.exports = {
  startIntervals,
  setBotStatus
};