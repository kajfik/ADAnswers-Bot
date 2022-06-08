"use strict";

const { getAffordableStudiesFromStudyList } = require("../../utils/databases/studies");
const { trees } = require("../../utils/databases/trees");


class Tree {
  constructor(theorems, path = "active") {
    this.theorems = Math.max(theorems, 0);
    this.path = path;
    this.trees = trees(this.path);
  }

  get realPath() {
    switch (this.path.toLowerCase()) {
      case "active": return "121,131,141";
      case "passive": return "122,132,142";
      case "idle": return "123,133,143";
      default: throw `Unknown argument: Expected path name (\`active\`, \`passive\`, \`idle\`) but found: --> ${str} <--`;
    }
  }

  generateTree() {
    for (const tree of this.trees) {
      if (this.theorems >= tree.requirement) {
        const affordableStudies = getAffordableStudiesFromStudyList(tree.ts, this.theorems);
        return `${tree.desc === undefined
          ? ""
          : `${tree.desc} `}\`${affordableStudies.join(",")}|0\``;
      }
    }
    return "Oh no! This message should never appear. Please submit a bug report to earth so that he can fix this.";
  }
}

module.exports = { Tree };
