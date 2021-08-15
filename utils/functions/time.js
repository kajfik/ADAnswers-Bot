"use strict";

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
    clock: clockify([days, hours, minutes, seconds])
  };
}

/**
 * Turns Date into decimal time
 * @param {Date} date Date object. Has to be new Date() invoked.
 * @param {Boolean} isMS Says whether or not the time is in milliseconds.
 * @param {Number} ms Number of milliseconds.
 * @param {Boolean} needsTimeZone Whether or not the timezone is needed.
 * @returns {String} A string of the time in the format of "Days:Hours:Minutes:Seconds"
 */
// eslint-disable-next-line max-params
function getDecimalTimeFromNormalPeopleTimeLikeTheOneThatNormalPeopleUseFuckingTwentyFourHourTime(time, isMS = false, ms, needsDays = false, needsTimeZone = false) {
  let days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;
  if (isMS) {
    const dc = convertMillisecondsToDigitalClock(ms);
    days = dc.days;
    hours = dc.hours;
    minutes = dc.minutes;
    seconds = dc.seconds;
  } else {
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();
  }
  const ns = Math.floor(((hours * 60 * 60) + (minutes * 60) + (seconds)) / 0.864);
  // Courtesy of spec.
  const aa = `0000${ns.toString()}`.replace(/^.*(.{5})$/u, "$1");
  if (needsDays) return clockify([days, aa.substr(0, 1), aa.substr(1, 2), aa.substr(3, 2)]);
  return clockify([aa.substr(0, 1), aa.substr(1, 2), aa.substr(3, 2)], needsTimeZone);
}

function msToDecimal(ms) {
  return getDecimalTimeFromNormalPeopleTimeLikeTheOneThatNormalPeopleUseFuckingTwentyFourHourTime(0, true, ms, true);
}

const newDate = () => new Date();

let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;

/** 
 * Decimal time! very exciting stuff. Increments seconds variable by one, if seconds is greater than 59, it will reset to 0, and then on and on 
 */
function increaseSeconds() {
  seconds++;
  if (seconds > 99) {
    seconds = 0;
    minutes++;
    if (minutes > 99) {
      minutes = 0;
      hours++;
      if (hours > 9) {
        hours = 0;
        days++;
      }
    }
  }
}

/**
 * Clockifies an array of numbers.
 * @param {Array<Number>} array Array of numbers
 * @returns {String} clockified array
 */
function clockify(array, needsTimeZone = false) {
  const time = array.map(t => String(t).padStart(2, "0"));
  return `${time.join(":")}${needsTimeZone ? ` (UTC-${new Date().getTimezoneOffset() / 60})` : ""}`;
}

/**
 * Used solely in /meta for uptime, and also is a footer message
 * @param {Object} dhms Days, hours, minutes seconds, in an object.
 * @returns {String} A string of the time in the format of "Days:Hours:Minutes:Seconds"
 */
function decimalClock(dhms = {}) {
  if (dhms === {}) return clockify([days, hours, minutes, seconds]);
  return clockify([dhms.days, dhms.hours, dhms.minutes, dhms.seconds]);
}

module.exports = {
  convertMillisecondsToDigitalClock,
  decimalClock,
  increaseSeconds,
  clockify,
  getDecimalTimeFromNormalPeopleTimeLikeTheOneThatNormalPeopleUseFuckingTwentyFourHourTime,
  newDate,
  msToDecimal
};