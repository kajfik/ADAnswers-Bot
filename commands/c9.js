/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "c9",
  description: "shorthand for `++challenge c9`",
  type: "shorthand",
  execute(message) {
    execute(message, ["c9"], message.channel.id);
  }
};