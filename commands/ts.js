"use strict";

const { execute } = require("./studytree");

module.exports = {
  name: "ts",
  number: 6,
  description: "shorthand for ++studytree",
  type: "shorthand",
  // eslint-disable-next-line max-params
  execute(message, args, id, weirdStuff) {
    execute(message, args, id, weirdStuff);
  }
};