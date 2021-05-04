/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c10",
  description: "shorthand for `++challenge c10`",
  execute(message) {
    execute(message, ["c10"], message.channel.id);
  }
};
