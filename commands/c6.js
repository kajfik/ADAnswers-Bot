/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c6",
  description: "shorthand for `++challenge c6`",
  execute(message) {
    execute(message, ["c6"], message.channel.id);
  }
};
