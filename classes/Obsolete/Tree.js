"use strict";

const { TREE_CONSTANTS } = require("../../utils/databases/studies");

class Tree {
  constructor(theorems, path = "active") {
    this.theorems = theorems;
    this.path = path;
  }

  earlyEternity() {
    const tree = {};
    if (this.theorems <= 10) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT_EARLY];
    } else if (this.theorems <= 39) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.ANTIMATTER, 21, 33];
    } else if (this.theorems <= 44) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.INFINITY, 21, 33, 31];
    } else if (this.theorems <= 51) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.ANTIMATTER, 111, 21, 33, 31];
    } else {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.INFINITY, 111];
    }
    return tree;
  }

  secondSplit() {
    const path = this.realPath;
    const tree = {};
    // Laugh
    if (this.theorems <= 69) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.ANTIMATTER, 111, path, 21, 31];
    } else if (this.theorems <= 70) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.INFINITY, 111, path, 21, 33, 31, 41];
    } else if (this.theorems <= 84) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.ANTIMATTER, 111, path, 151, 161, 21, 33, 31];
    } else if (this.theorems <= 99) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.INFINITY, 111, path, 151, 161, 162, 21, 33, 31];
    } else if (this.theorems <= 122) {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.TIME, 111, path, 151, 161, 171, 162, TREE_CONSTANTS.EXTRA];
    } else {
      tree.ts = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.TIME, 111, TREE_CONSTANTS.ACTIVE, TREE_CONSTANTS.POST_SPLIT, TREE_CONSTANTS.EXTRA];
      tree.desc = "At 900 Total TT, this flips over into EC10 territory.";
    }
    return tree;
  }

  lightDark() {
    const BASE = [TREE_CONSTANTS.PRE_SPLIT, TREE_CONSTANTS.TIME, 111, TREE_CONSTANTS.ACTIVE, TREE_CONSTANTS.POST_SPLIT, TREE_CONSTANTS.EXTRA];

    const tree = {};
    if (this.theorems >= 13000) {
      tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226);
    } else if (this.theorems >= 12750) {
      tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226);
      tree.desc = "If you cannot get the last TT to unlock dilation, use /dilationgrind.";
    } else if (this.theorems >= 4945) {
      tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226);
    } else if (this.theorems >= 3925) {
      tree.ts = BASE.concat(191, 212, 223, 232, 192, 201, TREE_CONSTANTS.INFINITY, 211, 193, 214, 213);
    } else if (this.theorems >= 3712) {
      tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 193, 214);
    } else if (this.theorems >= 3542) {
      tree.ts = BASE.concat(191, 211, 212, 223, 232, 192, 193, 214);
    } else if (this.theorems >= 2692) {
      tree.ts = BASE.concat(191, 212, 223, 232, 193, 214, 211, 213);
    } else if (this.theorems >= 2272) {
      tree.ts = BASE.concat(191, 212, 223, 232, 211);
    } else if (this.theorems >= 2142) {
      tree.ts = BASE.concat(193, 214, 228, 234);
    } else if (this.theorems >= 1292) {
      tree.ts = BASE.concat(191, 212, 193, 214, 211, 213);
    } else {
      tree.ts = BASE.concat(191, 212, 211);
      tree.desc = "Do note: EC10 is done between the last list and this one. At this point, the active path is better than either idle or passive, so that is what's recommended by the bot.";
    }
    return tree;
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
    let tree;

    if (this.theorems <= 53) {
      tree = this.earlyEternity(this.theorem);
    } else if (this.theorems <= 317) {
      tree = this.secondSplit(this.theorem, this.realPath);
    } else {
      tree = this.lightDark(this.theorem);
    }
    return `${tree.desc === undefined
      ? ""
      : `${tree.desc} `}\`${tree.ts.join(",")}|0\``;
  }
}

module.exports = { Tree };
