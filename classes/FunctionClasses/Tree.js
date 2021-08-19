"use strict";

class Tree {
  constructor(theorems, path) {
    this.theorems = theorems;
    if (path) this.path = path;
    else this.path = "active";
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

  earlyEternity() {
    const CONSTS = this.constants;
    const tree = {};
    if (this.theorems <= 10) {
      tree.ts = [CONSTS.PRE_SPLIT_EARLY];
    } else if (this.theorems <= 39) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.ANTIMATTER, 21, 33];
    } else if (this.theorems <= 44) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.INFINITY, 21, 33, 31];
    } else if (this.theorems <= 51) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.ANTIMATTER, 111, 21, 33, 31];
    } else {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.INFINITY, 111];
    }
    return tree;
  }

  secondSplit() {
    const CONSTS = this.constants;
    const path = this.realPath;
    const tree = {};
    // Laugh
    if (this.theorems <= 69) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.ANTIMATTER, 111, path, 21, 31];
    } else if (this.theorems <= 70) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.INFINITY, 111, path, 21, 33, 31, 41];
    } else if (this.theorems <= 84) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.ANTIMATTER, 111, path, 151, 161, 21, 33, 31];
    } else if (this.theorems <= 99) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.INFINITY, 111, path, 151, 161, 162, 21, 33, 31];
    } else if (this.theorems <= 122) {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.TIME, 111, path, 151, 161, 171, 162, CONSTS.EXTRA];
    } else {
      tree.ts = [CONSTS.PRE_SPLIT, CONSTS.TIME, 111, CONSTS.ACTIVE, CONSTS.POST_SPLIT, CONSTS.EXTRA];
      tree.desc = "At 900 Total TT, this flips over into EC10 territory.";
    }
    return tree;
  }

  lightDark() {
    const CONSTS = this.constants;
    const BASE = [CONSTS.PRE_SPLIT, CONSTS.TIME, 111, CONSTS.ACTIVE, CONSTS.POST_SPLIT, CONSTS.EXTRA];

    const tree = {};
    if (this.theorems >= 13000) {
      tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, CONSTS.INFINITY, 193, 214, 228, 234, 213, 226);
    } else if (this.theorems >= 12750) {
      tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, CONSTS.INFINITY, 193, 214, 228, 234, 213, 226);
      tree.desc = "If you cannot get the last TT to unlock dilation, use /dilationgrind.";
    } else if (this.theorems >= 4945) {
      tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, CONSTS.INFINITY, 193, 214, 228, 234, 213, 226);
    } else if (this.theorems >= 3925) {
      tree.ts = BASE.concat(191, 212, 223, 232, 192, 201, CONSTS.INFINITY, 211, 193, 214, 213);
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