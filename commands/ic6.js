/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic6",
  description: "shorthand for `++challenge ic6`",
  type: "shorthand",
  execute(message) {
    execute(message, ["ic6"], message.channel.id);
  }
};
