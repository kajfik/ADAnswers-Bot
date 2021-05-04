/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic1",
  description: "shorthand for `++challenge ic1`",
  type: "shorthand",
  execute(message) {
    execute(message, ["ic1"], message.channel.id);
  }
};
