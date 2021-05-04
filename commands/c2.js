/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 7,
  name: "c2",
  description: "shorthand for `++challenge c2`",
  execute(message) {
    execute(message, ["c2"], message.channel.id);
  }
};
