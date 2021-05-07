/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c7",
  description: "shorthand for `++challenge c7`",
  type: "shorthand",
  execute(message) {
    execute(message, ["c7"], message.channel.id);
  }
};
