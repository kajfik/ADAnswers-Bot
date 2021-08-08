"use strict";

const PRE_SPLIT_EARLY = "11,21,33,31,41";
const PRE_SPLIT = "11,22,32,42,51,61";
const EXTRA = "21,31,41,33,62";
const ANTIMATTER = "71,81,91,101";
const INFINITY = "72,82,92,102";
const TIME = "73,83,93,103";
const ACTIVE = "121,131,141";
const PASSIVE = "122,132,142";
const IDLE = "123,133,143";
const POST_SPLIT = "151,161,171,181,162";

/**
 * Turns a string into a variable and returns it
 * @param {String} str takes the path string for studytree
 * @returns {String} the variables declared at the top
 */
function toPath(str = "active") {
  switch (str.toLowerCase()) {
    case "active": return ACTIVE;
    case "passive": return PASSIVE;
    case "idle": return IDLE;
    default: throw `Unknown argument: Expected path name (\`active\`, \`passive\`, \`idle\`) but found: --> ${str} <--`;
  }
}

/**
 * Creates a tree for early eternity
 * @param {Number} theorem
 * @returns {Object} object with the appropriate tree array
 */
function earlyEternity(theorem) {
  const tree = {};
  if (theorem <= 10) {
    tree.ts = [PRE_SPLIT_EARLY];
  } else if (theorem <= 39) {
    tree.ts = [PRE_SPLIT, ANTIMATTER, 21, 33];
  } else if (theorem <= 44) {
    tree.ts = [PRE_SPLIT, INFINITY, 21, 33, 31];
  } else if (theorem <= 51) {
    tree.ts = [PRE_SPLIT, ANTIMATTER, 111, 21, 33, 31];
  } else {
    tree.ts = [PRE_SPLIT, INFINITY, 111];
  }
  return tree;
}


/**
 * Creates a tree for second split
 * @param {Number} theorem number of time theorems
 * @param {String} path string with the path the user gives
 * @returns {Object} with the appropriate tree array and description
 */
function secondSplit(theorem, path) {
  const tree = {};
  if (theorem <= 69) {
    tree.ts = [PRE_SPLIT, ANTIMATTER, 111, path, 21, 31];
  } else if (theorem <= 70) {
    tree.ts = [PRE_SPLIT, INFINITY, 111, path, 21, 33, 31, 41];
  } else if (theorem <= 84) {
    tree.ts = [PRE_SPLIT, ANTIMATTER, 111, path, 151, 161, 21, 33, 31];
  } else if (theorem <= 99) {
    tree.ts = [PRE_SPLIT, INFINITY, 111, path, 151, 161, 162, 21, 33, 31];
  } else if (theorem <= 122) {
    tree.ts = [PRE_SPLIT, TIME, 111, path, 151, 161, 171, 162, EXTRA];
  } else {
    tree.ts = [PRE_SPLIT, TIME, 111, ACTIVE, POST_SPLIT, EXTRA];
    tree.desc = "At 900 Total TT, this flips over into EC10 territory.";
  }
  return tree;
}

/**
 * Creates a teree for light/dark time studies
 * @param {Number} theorem number of time theorems
 * @returns {Object} object with the appropriate tree array and description
 */
function lightDark(theorem) {
  const BASE = [PRE_SPLIT, TIME, 111, ACTIVE, POST_SPLIT, EXTRA];
  const tree = {};
  if (theorem >= 12500) {
    tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226);
    tree.desc = "If you cannot get the last TT to unlock dilation, use /dilationgrind.";
  } else if (theorem >= 4945) {
    tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226);
  } else if (theorem >= 3925) {
    tree.ts = BASE.concat(191, 212, 223, 232, 192, 201, INFINITY, 211, 193, 214, 213);
  } else if (theorem >= 3712) {
    tree.ts = BASE.concat(191, 211, 222, 212, 224, 232, 193, 214);
  } else if (theorem >= 3542) {
    tree.ts = BASE.concat(191, 211, 212, 223, 232, 192, 193, 214);
  } else if (theorem >= 2692) {
    tree.ts = BASE.concat(191, 212, 223, 232, 193, 214, 211, 213);
  } else if (theorem >= 2272) {
    tree.ts = BASE.concat(191, 212, 223, 232, 211);
  } else if (theorem >= 2142) {
    tree.ts = BASE.concat(193, 214, 228, 234);
  } else if (theorem >= 1292) {
    tree.ts = BASE.concat(191, 212, 193, 214, 211, 213);
  } else {
    tree.ts = BASE.concat(191, 212, 211);
    tree.desc = "Do note: EC10 is done between the last list and this one.";
  }
  return tree;
}

/**
 * Generates a tree based on the number of time theorems given
 * @param {Number} theorem number of time theorems
 * @param {String} path string with the appropriate numbers in it
 * @returns {String} string with the tree as well as the description when applicable
 */
function generateTree(theorem, path) {
  let tree;
  if (theorem <= 53) {
    tree = earlyEternity(theorem);
  } else if (theorem <= 317) {
    tree = secondSplit(theorem, path);
  } else {
    tree = lightDark(theorem);
  }
  return `${tree.desc === undefined
    ? ""
    : `${tree.desc} `}\`${tree.ts.join(",")}|0\``;
}

module.exports = {
  generateTree,
  lightDark,
  secondSplit,
  earlyEternity,
  toPath,
};