"use strict";

/* eslint-disable max-len */

const config = require("./config.json");

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

function earlyGameCheck(id, message) {
  return config.ids.earlyGame.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

function breakCheck(id, message) {
  return config.ids.break.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

function earlyEternityCheck(id, message) {
  return config.ids.earlyEternity.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

function ecsCheck(id, message) {
  return config.ids.ecs.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

function endgameCheck(id, message) {
  return config.ids.endgame.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

// Message is any for no real reasonm
function botCommandsCheck(id, message) {
  // 603002159864348703 is #bots in Earth's things
  // 722268615973273725 is #general in bot test server
  return config.ids.botCommands.includes(id) || id === "603002159864348703" || id === "722268615973273725" || message.channel.type === "dm";
}

function bankedInfsCheck(id, message) {
  return config.ids.common.includes(id) || config.ids.ecs[1] === id || config.ids.endgame.includes(id) || botCommandsCheck(id, message);
}

function dilationGrindCheck(id, message) {
  return config.ids.endgame.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message) || config.ids.ecs[1] === id;
}

function earlyInfinityCheck(id, message) {
  return config.ids.earlyGame[1] === id || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

function eternityGrindingCheck(id, message) {
  return earlyEternityCheck(id, message) || config.ids.ecs.includes(id);
}

function setCrunchAutoCheck(id, message) {
  return earlyGameCheck(id, message) || config.ids.break.includes(id);
}

function studytreeCheck(id, message) {
  return ecsCheck(id, message) || earlyEternityCheck(id, message);
}

// This is any because im not exactly sure how to make it take an array of arrays
function sumAllCommands(fields) {
  let sum = 0;
  for (const array of fields) {
    sum += array.length;
  }
  return sum;
}

function getHelpDescription(sum) {
  return `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sum} commands.`;
}

function getFooter(ver) {
  return `This superfluous bot was created by @earth#1337. Bug him for more commands, or use "++meta suggest".\nUse ++help [number] to go to more pages of commands.\nBot version: ${ver}`;
}

function toNumber(string) {
  return parseInt(string, 10);
}

Array.prototype.pushAll = function(...entries) {
  entries.forEach(a => this.push(a));
  return this;
};

function toPath(str = "active") {
  switch (str.toLowerCase()) {
  case "active": return ACTIVE;
  case "passive": return PASSIVE;
  case "idle": return IDLE;
  default: throw `Unknown argument: Expected path name (\`active\`, \`passive\`, \`idle\`) but found: --> ${str} <--`;
  }
}

function earlyEternity(theorem) {
  if (theorem <= 13) {
    return [PRE_SPLIT_EARLY];
  }
  if (theorem <= 39) {
    return [PRE_SPLIT, ANTIMATTER, 21, 33];
  }
  if (theorem <= 44) {
    return [PRE_SPLIT, INFINITY, 21, 33, 31];
  }
  if (theorem <= 51) {
    return [PRE_SPLIT, ANTIMATTER, 111, 21, 33, 31];
  }
  return [PRE_SPLIT, INFINITY, 111];
}

function secondSplit(theorem, path) {
  if (theorem <= 69) {
    return [PRE_SPLIT, ANTIMATTER, 111, path, 21, 31];
  }
  if (theorem <= 70) {
    return [PRE_SPLIT, INFINITY, 111, path, 21, 33, 31, 41];
  }
  if (theorem <= 84) {
    return [PRE_SPLIT, ANTIMATTER, 111, path, 151, 161, 21, 33, 31];
  }
  if (theorem <= 99) {
    return [PRE_SPLIT, INFINITY, 111, path, 151, 161, 162, 21, 33, 31];
  }
  return [PRE_SPLIT, TIME, 111, path, 151, 161, 171, 162, EXTRA];
}

function lightDark(theorem) {
  const BASE = [PRE_SPLIT, TIME, 111, ACTIVE, POST_SPLIT, EXTRA];
  if (theorem >= 4945) {
    return [
      BASE.pushAll(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226),
      "If you cannot get the last TT to unlock dilation, use ++dilationgrind."
    ];
  }
  if (theorem >= 3925) {
    return [BASE.pushAll(191, 212, 223, 232, 192, 201, INFINITY, 211, 193, 214, 213), null];
  }
  if (theorem >= 3712) {
    return [BASE.pushAll(191, 211, 222, 212, 224, 232, 193, 214), null];
  }
  if (theorem >= 3542) {
    return [BASE.pushAll(191, 211, 212, 223, 232, 192, 193, 214), null];
  }
  if (theorem >= 2692) {
    return [BASE.pushAll(191, 212, 223, 232, 193, 214, 211, 213), null];
  }
  if (theorem >= 2272) {
    return [BASE.pushAll(191, 212, 223, 232, 211), null];
  }
  if (theorem >= 2142) {
    return [BASE.pushAll(193, 214, 228, 234), null];
  }
  if (theorem >= 1292) {
    return [BASE.pushAll(191, 212, 193, 214, 211, 213), null];
  }
  return [
    BASE.pushAll(191, 212, 211),
    "Do note: EC10 is done between this list and the next."
  ];
}

function generateTree(theorem, path) {
  let tree, desc = null;
  if (theorem <= 53) {
    tree = earlyEternity(theorem);
  } else if (theorem <= 122) {
    tree = secondSplit(theorem, path);
  } else if (theorem <= 317) {
    tree = [PRE_SPLIT, TIME, 111, ACTIVE, POST_SPLIT, EXTRA];
    desc = "At 900 Total TT, this flips over into EC10 territory.";
  } else {
    [tree, desc] = lightDark(theorem);
  }
  return `${desc === null ? "" : `${desc} `}\`${tree.join(",")}|0\``;
}

function constructEmbedObject(number, fieldsArray) {
  return {
    color: `#${number === 69 ? `696969` : `${number - 1}${number - 1}${number - 1}${number - 1}${number - 1}${number - 1}`}`,
    title: `Help (p${number}/${fieldsArray.length - 1})`,
    description: getHelpDescription(sumAllCommands(fieldsArray)),
    fields: fieldsArray[number - 1],
    timestamp: new Date(),
    footer: {
      text: getFooter(config.version)
    }
  };
}

module.exports = {
  earlyGameCheck,
  breakCheck,
  earlyEternityCheck,
  ecsCheck,
  endgameCheck,
  botCommandsCheck,
  constructEmbedObject,
  misc: {
    sumAllCommands,
    getHelpDescription,
    getFooter,
    toNumber
  },
  studytree: {
    toPath,
    earlyEternity,
    secondSplit,
    lightDark,
    generateTree
  },
  special: {
    bankedInfsCheck,
    dilationGrindCheck,
    earlyInfinityCheck,
    eternityGrindingCheck,
    setCrunchAutoCheck,
    studytreeCheck
  }
};
