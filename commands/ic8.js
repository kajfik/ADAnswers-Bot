/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic8",
  description: "shorthand for `++challenge ic8`",
  execute(message) {
    execute(message, ["ic8"], message.channel.id);
  }
};
