/* eslint-disable max-len */
"use strict";

const { XKCDApplicationCommand } = require("../classes/ApplicationCommand/XKCDApplicationCommand");
const functions = require("../utils/functions/functions");

module.exports = {
  command: new XKCDApplicationCommand({
    name: "xkcd",
    number: 7,
    description: "has an arg: XKCD number. sends the link to that xkcd",
    check: "botCommandsCheck",
    acceptableArgs: ["Any number"],
    sent: undefined,
    getArgMessage(arg) {
      const a = functions.misc.toNumber(arg);
      return `https://xkcd.com/${a}/`;
    },
    argInfo: {
      key: "xkcd",
      type: "number"
    }
  })
};