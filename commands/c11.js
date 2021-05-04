/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c11",
  description: "shorthand for `++challenge c11`",
  type: "shorthand",
  execute(message) {
    execute(message, ["c11"], message.channel.id);
  }
};
