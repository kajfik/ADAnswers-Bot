/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "c12",
  description: "shorthand for `++challenge c12`",
  execute(message) {
    execute(message, ["c12"], message.channel.id);
  }
};
