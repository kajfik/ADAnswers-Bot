"use strict";

const footerMessages = require("../footerMessages");

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
 * @returns {Object} object containing days, hours, minutes, seconds, and the clock used in /meta
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
  setInterval(setBotStatus, 30000, client);
}

const activityMessages = {
  all: [
    ` people here and in DMs since 1992 || ${footerMessages.random()}`,
    ` the wizarding world of slash commands || ${footerMessages.random()}`,
    ` you. || ${footerMessages.random()}`,
    ` Christmas music. || ${footerMessages.random()}`,
    ` 80s rock. || ${footerMessages.random()}`,
    ` my creator. || ${footerMessages.random()}`,
    ` the screams of horror while I take over the world. || ${footerMessages.random()}`,
    ` a cassette tape. || ${footerMessages.random()}`,
    ` vinyl. || ${footerMessages.random()}`,
    ` Huey Lewis and the News. || ${footerMessages.random()}`
  ],
  random() {
    return this.all[Math.floor(Math.random() * this.all.length)];
  }
};

/**
 * Changes the bot status, currently every minute.
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function setBotStatus(client) {
  client.user.setActivity(activityMessages.random(), { type: "LISTENING" });
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