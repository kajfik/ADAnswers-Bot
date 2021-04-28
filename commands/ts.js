"use strict";

const { execute } = require("./studytree");

module.exports = {
  name: "ts",
  number: 6,
  description: "shorthand for ++studytree",
  execute(message, args, id) {
    execute(message, args, id);
  }
};