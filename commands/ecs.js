/* eslint-disable max-len */
"use strict";

const { execute } = require("./challenge");

module.exports = {
  number: 5,
  name: "ecs",
  description: "shorthand for `++challenge ecs`",
  execute(message) {
    execute(message, ["ecs"]);
  }
};