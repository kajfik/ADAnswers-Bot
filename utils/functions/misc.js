"use strict";

/**
 * Parses a number using parseInt(), just shorthand
 * @param {String} string parses a string and turns it to a Number
 * @returns {Number}
 */
function toNumber(string) {
  return parseInt(string, 10);
}

/**
 * Check if value is undefined
 * @param {Any} val can be anything
 * @returns {Boolean}
 */
function isUndefined(val) {
  return val === undefined;
}

/**
 * Does exactly what it says on the tin
 * @param {Number} ms mumber of milliseconds as specified by the input
 * @returns {Object} object containing days, hours, minutes, seconds, and the clock used in ++meta uptime
 */
function convertMillisecondsToDigitalClock(ms) {
  const days = Math.floor(ms / (3600000 * 24)),
    hours = Math.floor(ms % (3600000 * 24) / 3600000),
    minutes = Math.floor(ms % 3600000 / 60000),
    seconds = Math.floor(ms % 60000 / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    clock: [days, hours, minutes, seconds]
      .map(t => String(t).padStart(2, "0"))
      .join(":")
  };
}

/**
 * Starts intervals for the bot. Currently, the only interval being started is the switching bot status.
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function startIntervals(client) {
  setInterval(setBotStatus, 60000, client);
}

let which = true;

/**
 * Changes the bot status, currently every minute.
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function setBotStatus(client) {
  if (which) {
    client.user.setActivity(" people here and in DMs since 1992 || created by earth#1337 || use ++help!", { type: "LISTENING" });
    which = !which;
  } else if (!which) {
    client.user.setActivity(" people here and in DMs since 1992 || created by earth#1337 || You can use the bot in DMs, too!", { type: "LISTENING" });
    which = !which;
  }
}

/**
 * The following function calculates the logarithm of y with base x
 * @param {Number} x base of the logarithm
 * @param {Number} y number being inputted as the logarithm
 * @returns {Number}
 */
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

module.exports = {
  getBaseLog,
  setBotStatus,
  startIntervals,
  convertMillisecondsToDigitalClock,
  isUndefined,
  toNumber
};