/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "ic3",
  description: "shorthand for `++challenge ic3`",
  execute(message) {
    execute(message, ["ic3"], message.channel.id);
  }
};
