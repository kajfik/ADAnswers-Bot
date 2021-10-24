/* eslint-disable max-len */
"use strict";

const { XKCDApplicationCommand } = require("../../classes/ApplicationCommand/XKCDApplicationCommand");
const { Misc } = require("../../classes/FunctionClasses/Misc");

module.exports = {
  command: new XKCDApplicationCommand({
    name: "xkcd",

    description: "has an arg: XKCD number. sends the link to that xkcd",
    check: "botCommandsCheck",
    acceptableArgs: ["Any number"],
    sent: undefined,
    getArgMessage(arg) {
      const a = Misc.toNumber(arg);
      return `https://xkcd.com/${a}/`;
    },
    argInfo: {
      key: "xkcd",
      type: "number"
    }
  })
};