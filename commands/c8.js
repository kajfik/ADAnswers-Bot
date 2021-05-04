/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "c8",
  description: "shorthand for `++challenge 8`",
  execute(message) {
    execute(message, ["c8"], message.channel.id);
  }
};
