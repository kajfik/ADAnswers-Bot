/* eslint-disable no-console */
"use strict";
const { isFunctionExpression } = require("typescript");
/* eslint-disable max-len */


// DO NOT TOUCH LIKE HALF OF THIS STUFF IT JUST WORKS LMAOOOOOOOOOOOO
// CONFIG LOOKS LIKE THIS https://i.imgur.com/WuAs6b5.png IF YOU NEED ME TO ADD
// ANYTHING TO IT THAT YOU MAY USE OUTSIDE OF ONE FILE

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

function botCommandsCheck(id, message) {
  // 603002159864348703 is #bots in Earth's things
  // 722268615973273725 is #general in bot test server
  return config.ids.botCommands.includes(id) || id === "603002159864348703" || id === "722268615973273725" || message.channel.type === "dm";
}

function commonCheck(id) {
  return config.ids.common.includes(id);
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
  return earlyEternityCheck(id, message) || config.ids.ecs.includes(id) || config.ids.endgame.includes(id);
}

function setCrunchAutoCheck(id, message) {
  return earlyGameCheck(id, message) || config.ids.break.includes(id);
}

function studytreeCheck(id, message) {
  return ecsCheck(id, message) || earlyEternityCheck(id, message) || endgameCheck(id, message);
}

function sumAllCommands(fields) {
  let sum = 0;
  for (const array of fields) {
    sum += array.length;
  }
  return sum;
}

function getHelpDescription(sum) {
  return `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sum} commands.\n It is encouraged (by me, at least), to use the bot in DMs! This helps reduce spam from the bot and will still function as normal!`;
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
  if (theorem >= 12500) {
    return [
      BASE.pushAll(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226),
      "If you cannot get the last TT to unlock dilation, use ++dilationgrind."
    ];
  }
  if (theorem >= 4945) {
    return [BASE.pushAll(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226), null];
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
  if (number < fieldsArray.length || number === 69) {
    return {
      color: `#${number === 69 ? `696969` : `${number - 1}${number - 1}${number - 1}${number - 1}${number - 1}${number - 1}`}`,
      title: `Help (p${number}/${fieldsArray.length - 1})`,
      description: getHelpDescription(sumAllCommands(fieldsArray)),
      fields: number === 69 ? fieldsArray[fieldsArray.length - 1] : fieldsArray[number - 1],
      timestamp: new Date(),
      footer: {
        text: getFooter(config.version)
      }
    }; 
  } 
  return {
    color: `#11aa22`,
    title: `Something is terribly wrong`,
    description: `Something has gone terribly wrong. This help page does not exist.`
  };
}

function isUndefined(val) {
  return val === undefined;
}

function help(message, fieldsArray, stuff) {
  if (stuff.command === "help" && botCommandsCheck(stuff.id, message)) {
    const a = toNumber(stuff.args[0]);
    if (Number.isNaN(a) || isUndefined(a) || a === null) {
      message.channel.send({ embed: constructEmbedObject(1, fieldsArray) });
      return;
    }
    try {
      message.channel.send({ embed: constructEmbedObject(a, fieldsArray) });
    } catch (err) {
      message.channel.send("Unknown input");
      // eslint-disable-next-line no-console
      console.log(err);
    }
  } else if (stuff.command === "help" && !botCommandsCheck(stuff.id, message)) {
    message.channel.send("Please use <#351479640755404820> for `++help`.");
  }
}

function convertMillisecondsToDigitalClock(ms) {
  const days = Math.floor(ms / (3600000 * 24)),
    hours = Math.floor(ms % (3600000 * 24) / 3600000),
    minutes = Math.floor(((ms % (3600000 * 24) % 3600000) / 60000)),
    seconds = Math.floor((((ms % (360000 * 24) % 3600000) % 60000) / 1000));
  return {
    days,
    hours,
    minutes,
    seconds,
    clock: `${days <= 9 ? `0${days}` : `${days}`}:${hours <= 9 ? `0${hours}` : `${hours}`}:${minutes <= 9 ? `0${minutes}` : `${minutes}`}:${seconds <= 9 ? `0${seconds}` : `${seconds}`}`
  };
}

function generateChannelMessage() {
  const a = config.ids;
  let b = "";
  let c = "";
  let d = "";
  let f = "";
  let g = "";
  a.common.forEach(id => {
    b += `<#${id}>`;
  });
  a.earlyGame.forEach(id => {
    c += `<#${id}>`;
  });
  a.break.forEach(id => {
    d += `<#${id}>`;
  });
  a.ecs.forEach(id => {
    f += `<#${id}>`;
  });
  a.endgame.forEach(id => {
    g += `<#${id}>`;
  });

  return `Bot Commands: All commands work here. <#${a.botCommands[0]}>
  Common: All commands besides miscellaneous commands work here. ${b}.
  Early game: Early game commands work here. ${c}
  Break: Break Infinity commands work here. ${d}
  Early Eternity: Early Eternity commands work here. <#${a.earlyEternity[0]}>
  ECs: EC commands work here. ${f}
  Endgame: Endgame/Dilation commands work here. ${g}`;
}

function getMessage(command, stuff = {}) {
  switch (command) {
  case "ts":
    return generateTree(stuff.theorem, stuff.path);
  default: 
    console.error("Unknown command for getMessage!");
    return "Something went wrong";
  }
}

module.exports = {
  earlyGameCheck,
  breakCheck,
  earlyEternityCheck,
  ecsCheck,
  endgameCheck,
  botCommandsCheck,
  commonCheck,
  constructEmbedObject,
  help,
  getMessage,
  misc: {
    sumAllCommands,
    getHelpDescription,
    getFooter,
    toNumber,
    convertMillisecondsToDigitalClock,
    isUndefined,
    generateChannelMessage
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
    studytreeCheck,
  },
};
