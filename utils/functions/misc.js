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
  isUndefined,
  toNumber,
};