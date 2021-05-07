/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic4",
  description: "shorthand for `++challenge ic4`",
  type: "shorthand",
  execute(message) {
    execute(message, ["ic4"], message.channel.id);
  }
};