/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c8",
  description: "shorthand for `++challenge c8`",
  execute(message) {
    execute(message, ["c8"], message.channel.id);
  }
};
