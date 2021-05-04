/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "c11",
  description: "shorthand for `++challenge c11`",
  execute(message) {
    execute(message, ["c11"], message.channel.id);
  }
};
