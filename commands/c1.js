/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c1",
  description: "shorthand for `++challenge c1`",
  execute(message) {
    execute(message, ["c1"], message.channel.id);
  }
};
