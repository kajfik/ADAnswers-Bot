/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic7",
  description: "shorthand for `++challenge ic7`",
  execute(message) {
    execute(message, ["ic7"], message.channel.id);
  }
};
