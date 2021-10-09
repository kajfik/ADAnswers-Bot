"use strict";

class Misc {
  static toNumber(value) {
    return parseInt(value, 10);
  }

  static isUndefined(val) {
    return typeof val === "undefined";
  }

  static getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  }

  static randomInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  static pluralise(word, count) {
    if (count === 1) {
      return word;
    }
    return `${word}s`;
  }
}

module.exports = { Misc };