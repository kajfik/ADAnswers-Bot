/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c4",
  description: "shorthand for `++challenge c4`",
  type: "shorthand",
  execute(message) {
    execute(message, ["c4"], message.channel.id);
  }
};