"use strict";

const { hyperlink, hideLinkEmbed } = require("@discordjs/builders");
const { ids } = require("../../utils/config.json");

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

  static formatNumber(number) {
    const exponent = Math.floor(Math.log10(number));
    const mantissa = number / Math.pow(10, exponent);
    return `${mantissa.toFixed(2)}e${exponent}`;
  }

  static link(content, link) {
    return hyperlink(content, hideLinkEmbed(link));
  }

  static isHelper(rolesIDArray) {
    return rolesIDArray.includes(ids.helperRole);
  }

  // eslint-disable-next-line max-params
  static makeEnumeration(items, separator = ", ", name = "", length2Separator) {
    if (items.length === 0) return "";
    if (items.length === 1) return `${name}${items[0]}`;
    if (items.length === 2) return `${name}${items[0]} ${length2Separator} ${name}${items[1]}`;
    const commaSeparated = items.slice(0, items.length - 1).join(separator);
    const last = items[items.length - 1];
    return `${name}${commaSeparated}, and ${name}${last}`;
  }
}

module.exports = { Misc };