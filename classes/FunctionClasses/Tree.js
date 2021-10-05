"use strict";

const { trees } = require("../../utils/trees");


class Tree {
  constructor(theorems, path = "active") {
    this.theorems = Math.max(theorems, 0);
    this.path = path;
    this.trees = trees(this.path);
  }

  get constants() {
    return {
      PRE_SPLIT_EARLY: "11,21,33,31,41",
      PRE_SPLIT: "11,22,32,42,51,61",
      EXTRA: "21,31,41,33,62",
      ANTIMATTER: "71,81,91,101",
      INFINITY: "72,82,92,102",
      TIME: "73,83,93,103",
      ACTIVE: "121,131,141",
      PASSIVE: "122,132,142",
      IDLE: "123,133,143",
      POST_SPLIT: "151,161,171,181,162",
    };
  }

  get realPath() {
    switch (this.path.toLowerCase()) {
      case "active": return this.constants.ACTIVE;
      case "passive": return this.constants.PASSIVE;
      case "idle": return this.constants.IDLE;
      default: throw `Unknown argument: Expected path name (\`active\`, \`passive\`, \`idle\`) but found: --> ${str} <--`;
    }
  }

  generateTree() {
    for (const tree of this.trees) {
      if (this.theorems >= tree.requirement) {
        return `${tree.desc === undefined
          ? ""
          : `${tree.desc} `}\`${tree.ts.join(",")}|0\``;
      }
    }
    return "Oh no! This message should never appear. Please submit a bug report to earth so that he can fix this.";
  }
}

module.exports = { Tree };
