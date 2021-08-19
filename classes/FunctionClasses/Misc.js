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
}

module.exports = { Misc };