"use strict";

class Time {
  constructor(isMS, date, ms) {
    this.isMS = isMS;
    this.date = date;
    this.ms = ms;
  }

  static newDate() {
    return new Date();
  }


  static clockify(array) {
    const time = array.map(t => String(t).padStart(2, "0"));
    return `${time.join(":")} (UTC-5)`;
  }

  static clockifyNoTensInHours(array) {
    return `${array.join(":")} (UTC-5)`;
  }

  static secondify(hours, minutes, seconds) {
    return Math.floor(((hours * 60 * 60) + (minutes * 60) + (seconds)) / 0.864);
  }

  static dhmsFromMS(ms) {
    const days = Math.floor(ms / (3600000 * 24)),
      hours = Math.floor(ms % (3600000 * 24) / 3600000),
      minutes = Math.floor(ms % 3600000 / 60000),
      seconds = Math.floor(ms % 60000 / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      clock: Time.clockify([days, hours, minutes, seconds])
    };
  }

  static getTime() {
    return Time.decimalTime(false, Time.newDate(), 0);
  }

  static dateToHMS(Date) {
    return {
      hours: Date.getHours(),
      minutes: Date.getMinutes(),
      seconds: Date.getSeconds()
    };
  }

  static decimalTime(isMS, date, ms) {
    const hms = Time.dateToHMS(date);
    const dhms = Time.dhmsFromMS(ms);
    let seconds;

    if (isMS) seconds = Time.secondify(dhms.hours, dhms.minutes, dhms.seconds);
    else seconds = Time.secondify(hms.hours, hms.minutes, hms.seconds);

    const timeString = `0000${seconds.toString()}`.replace(/^.*(.{5})$/u, "$1");

    if (isMS) return Time.clockify([dhms.days, timeString.substr(0, 1), timeString.substr(1, 2), timeString.substr(3, 2)]);
    return Time.clockifyNoTensInHours([timeString.substr(0, 1), timeString.substr(1, 2), timeString.substr(3, 2)]);
  }
}

module.exports = { Time };