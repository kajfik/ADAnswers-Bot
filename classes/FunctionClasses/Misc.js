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

  static getIdFromMention(mention) {
    let id = mention;
    if (!id) return null;
    if (id.startsWith("<@") && id.endsWith(">")) {
      id = id.slice(2, -1);
    }
    if (id.startsWith("!")) {
      id = id.slice(1);
    }
    if (id.startsWith("&")) {
      id = id.slice(1);
    }
    return id;
  }

  static capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

module.exports = { Misc };