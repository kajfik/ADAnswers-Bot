/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 8,
  name: "ic2",
  description: "shorthand for `++challenge ic2`",
  execute(message) {
    execute(message, ["ic2"], message.channel.id);
  }
};
