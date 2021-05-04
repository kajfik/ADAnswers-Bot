/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "c7",
  description: "shorthand for `++challenge c2`",
  execute(message) {
    execute(message, ["c2"], message.channel.id);
  }
};
