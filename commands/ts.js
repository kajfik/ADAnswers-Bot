"use strict";

const { execute } = require("./studytree");

module.exports = {
  name: "ts",
  number: 6,
  description: "shorthand for ++studytree",
  type: "shorthand",
  execute(message, args, id) {
    execute(message, args, id);
  }
};