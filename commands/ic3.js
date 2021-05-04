/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic3",
  description: "shorthand for `++challenge ic3`",
  type: "shorthand",
  execute(message) {
    execute(message, ["ic3"], message.channel.id);
  }
};
