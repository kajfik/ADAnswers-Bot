/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic5",
  description: "shorthand for `++challenge ic5`",
  execute(message) {
    execute(message, ["ic5"], message.channel.id);
  }
};