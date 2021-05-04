/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c5",
  description: "shorthand for `++challenge c5`",
  type: "shorthand",
  execute(message) {
    execute(message, ["c5"], message.channel.id);
  }
};
