"use strict";

const { execute } = require("./eternitychallengeorder");

module.exports = {
  name: "eco",
  number: 6,
  description: "shorthand for ++eternitychallengeorder",
  execute(message, args, id) {
    execute(message, args, id);
  }
};