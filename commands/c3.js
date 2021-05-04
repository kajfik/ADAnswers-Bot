/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "c3",
  description: "shorthand for `++challenge c3`",
  execute(message) {
    execute(message, ["c3"], message.channel.id);
  }
};
