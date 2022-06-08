"use strict";

const { TREE_CONSTANTS } = require("./studies");

module.exports = {
  trees(path) {
    let realPath = undefined;
    switch (path) {
      case "active":
        realPath = TREE_CONSTANTS.ACTIVE;
        break;
      case "passive":
        realPath = TREE_CONSTANTS.PASSIVE;
        break;
      case "idle":
        realPath = TREE_CONSTANTS.IDLE;
        break;
      default: throw `Unknown argument: Expected path name (\`active\`, \`passive\`, \`idle\`) but found: --> ${str} <--`;
    }
    const BASE = [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.TIME, 111, ...TREE_CONSTANTS.ACTIVE, ...TREE_CONSTANTS.POST_SPLIT, ...TREE_CONSTANTS.EXTRA];
    // All study trees must be sorted in descending order!
    return [
      // Light-Dark Paths
      {
        requirement: 13000,
        ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226)
      },
      {
        requirement: 12750,
        ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226),
        desc: "If you cannot get the last TT to unlock dilation, use /dilationgrind."
      },
      {
        requirement: 4945,
        ts: BASE.concat(191, 211, 222, 212, 224, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 193, 214, 228, 234, 213, 226),
      },
      {
        requirement: 3925,
        ts: BASE.concat(191, 212, 223, 232, 192, 201, ...TREE_CONSTANTS.INFINITY, 211, 193, 214, 213),
      },
      {
        requirement: 3712,
        ts: BASE.concat(191, 211, 222, 212, 224, 232, 193, 214),
      },
      {
        requirement: 3542,
        ts: BASE.concat(191, 211, 212, 223, 232, 192, 193, 214),
      },
      {
        requirement: 2692,
        ts: BASE.concat(191, 212, 223, 232, 193, 214, 211, 213),
      },
      {
        requirement: 2272,
        ts: BASE.concat(191, 212, 223, 232, 211),
      },
      {
        requirement: 2142,
        ts: BASE.concat(193, 214, 228, 234),
      },
      {
        requirement: 1292,
        ts: BASE.concat(191, 212, 193, 214, 211, 213),
      },
      {
        requirement: 318,
        ts: BASE.concat(191, 212, 211),
        desc: "Do note: EC10 is done between the last list and this one. At this point, the active path is better than either idle or passive, so that is what's recommended by the bot."
      },
      {
        requirement: 123,
        ts: [...BASE],
        desc: "At 900 Total TT, this flips over into EC10 territory."
      },
      // 2nd Split
      {
        requirement: 100,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.TIME, 111, ...realPath, 151, 161, 171, 162, ...TREE_CONSTANTS.EXTRA]
      },
      {
        requirement: 85,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.INFINITY, 111, ...realPath, 151, 161, 162, 21, 33, 31]
      },
      {
        requirement: 71,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.ANTIMATTER, 111, ...realPath, 151, 161, 21, 33, 31]
      },
      {
        requirement: 70,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.INFINITY, 111, ...realPath, 21, 33, 31, 41]
      },
      {
        requirement: 54,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.ANTIMATTER, 111, ...realPath, 21, 31]
      },
      // Early Eternity
      {
        requirement: 52,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.INFINITY, 111]
      },
      {
        requirement: 45,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.ANTIMATTER, 111, 21, 33, 31]
      },
      {
        requirement: 40,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.INFINITY, 21, 33, 31]
      },
      {
        requirement: 11,
        ts: [...TREE_CONSTANTS.PRE_SPLIT, ...TREE_CONSTANTS.ANTIMATTER, 21, 33]
      },
      {
        requirement: 0,
        ts: [...TREE_CONSTANTS.PRE_SPLIT_EARLY]
      }
    ];
  }
};