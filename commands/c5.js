/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "c5",
  description: "shorthand for `++challenge c5`",
  execute(message) {
    execute(message, ["c5"], message.channel.id);
  }
};
