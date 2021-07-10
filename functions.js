/* eslint-disable no-negated-condition */
/* eslint-disable no-console */
"use strict";
/* eslint-disable max-len */


// DO NOT TOUCH LIKE HALF OF THIS STUFF IT JUST WORKS LMAOOOOOOOOOOOO
// CONFIG LOOKS LIKE THIS https://i.imgur.com/WuAs6b5.png IF YOU NEED ME TO ADD
// ANYTHING TO IT THAT YOU MAY USE OUTSIDE OF ONE FILE

const config = require("./config.json");
const Sequelize = require("sequelize");

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
 * Checks if the ID specified is for early game channels.
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function earlyGameCheck(id, message) {
  return config.ids.earlyGame.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified is for break infinity channels.
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function breakCheck(id, message) {
  return config.ids.break.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified is for early eternity channels.
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function earlyEternityCheck(id, message) {
  return config.ids.earlyEternity.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified is for EC channels.
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function ecsCheck(id, message) {
  return config.ids.ecs.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified is for endgame channels
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function endgameCheck(id, message) {
  return config.ids.endgame.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified is bot commands, #bots in earth's things, #general in bot test server, or if the command was used in DMs
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function botCommandsCheck(id, message) {
  // 603002159864348703 is #bots in Earth's things
  // 722268615973273725 is #general in bot test server
  return config.ids.botCommands.includes(id) || id === "603002159864348703" || id === "722268615973273725" || message.channel.type === "dm";
}

/**
 * Checks if the ID specified is for common channels
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function commonCheck(id) {
  return config.ids.common.includes(id);
}

/**
 * Checks if the ID specified matches the correct channels for banked infinities
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function bankedInfsCheck(id, message) {
  return config.ids.common.includes(id) || config.ids.ecs[1] === id || config.ids.endgame.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified matches the correct channels for dilation grind
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function dilationGrindCheck(id, message) {
  return config.ids.endgame.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message) || config.ids.ecs[1] === id;
}

/**
 * Checks if the ID specified is for early infinity channels
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function earlyInfinityCheck(id, message) {
  return config.ids.earlyGame[1] === id || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified matches the correct channels for eternity grinding
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function eternityGrindingCheck(id, message) {
  return earlyEternityCheck(id, message) || config.ids.ecs.includes(id) || config.ids.endgame.includes(id);
}

/**
 * Checks if the ID specified matches the correct channels for setting the crunch autobuyer
 * @param {string} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function setCrunchAutoCheck(id, message) {
  return earlyGameCheck(id, message) || config.ids.break.includes(id);
}

/**
 * Checks if the ID specified matches the correct channels for requesting a study tree
 * @param {String} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function studytreeCheck(id, message) {
  return ecsCheck(id, message) || earlyEternityCheck(id, message) || endgameCheck(id, message);
}

/**
 * Sums all commands for the help command
 * @param {Array} fields array
 * @returns {Number} the number of commands, based on the fieldsArray array that's passed in
 */
function sumAllCommands(fields) {
  let sum = 0;
  for (const array of fields) {
    sum += array.length;
  }
  return sum;
}

/**
 * The help description used in the help command
 * @param {Number} sum of all commands
 * @returns {String} the help description string
 */
function getHelpDescription(sum) {
  return `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sum} commands.\n It is encouraged (by me, at least), to use the bot in DMs! This helps reduce spam from the bot and will still function as normal!`;
}

/**
 * The footer used in the help command
 * @param {String} version of the bot
 * @returns {String} the footer string for help
 */
function getFooter(ver) {
  return `This superfluous bot was created by @earth#1337. Bug him for more commands, or use "++meta suggest".\nUse ++help [number] to go to more pages of commands.\nBot version: ${ver}`;
}

/**
 * Parses a number using parseInt(), just shorthand
 * @param {String} string parses a string and turns it to a Number
 * @returns {Number}
 */
function toNumber(string) {
  return parseInt(string, 10);
}

/**
 * Pushes all entries of an array to another
 * @param  {...Array} entries takes all entries of an array and pushes it
 * @returns {Array} the modified array
 */
Array.prototype.pushAll = function(...entries) {
  entries.forEach(a => this.push(a));
  return this;
};

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
    tree.ts = BASE.pushAll(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226);
    tree.desc = "If you cannot get the last TT to unlock dilation, use ++dilationgrind.";
  } else if (theorem >= 4945) {
    tree.ts = BASE.pushAll(191, 211, 222, 212, 224, 232, 192, 201, INFINITY, 193, 214, 228, 234, 213, 226);
  } else if (theorem >= 3925) {
    tree.ts = BASE.pushAll(191, 212, 223, 232, 192, 201, INFINITY, 211, 193, 214, 213);
  } else if (theorem >= 3712) {
    tree.ts = BASE.pushAll(191, 211, 222, 212, 224, 232, 193, 214);
  } else if (theorem >= 3542) {
    tree.ts = BASE.pushAll(191, 211, 212, 223, 232, 192, 193, 214);
  } else if (theorem >= 2692) {
    tree.ts = BASE.pushAll(191, 212, 223, 232, 193, 214, 211, 213);
  } else if (theorem >= 2272) {
    tree.ts = BASE.pushAll(191, 212, 223, 232, 211);
  } else if (theorem >= 2142) {
    tree.ts = BASE.pushAll(193, 214, 228, 234);
  } else if (theorem >= 1292) {
    tree.ts = BASE.pushAll(191, 212, 193, 214, 211, 213);
  } else {
    tree.ts = BASE.pushAll(191, 212, 211);
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

/**
 * Constructs an embed object for each help page
 * @param {Number} number help number specified by user
 * @param {Array} fieldsArray array of the fields specified in bot.js
 * @returns {Object} object containing all information about the embed
 */
function constructEmbedObject(number, fieldsArray) {
  if (number < fieldsArray.length || number === 69) {
    const hex = number === 69 ? "696969" : Math.round(number / fieldsArray.length * 255).toString(16).repeat(3);
    return {
      color: `#${hex}`,
      title: `Help (p${number}/${fieldsArray.length - 1})`,
      description: getHelpDescription(sumAllCommands(fieldsArray)),
      fields: number === 69
        ? fieldsArray[fieldsArray.length - 1]
        : fieldsArray[number - 1],
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

/**
 * Check if value is undefined
 * @param {Any} val can be anything
 * @returns {Boolean}
 */
function isUndefined(val) {
  return val === undefined;
}

/**
 * The actual help command that does stuff
 * @param {Object} message object that contains all information about the message
 * @param {Array} fieldsArray array of all fields specified in bot.js
 * @param {Object} stuff object with stuff such as ID, args, command
 * @returns sends the message, so it doesn't return anything
 */
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

/**
 * Does exactly what it says on the tin
 * @param {Number} ms mumber of milliseconds as specified by the input
 * @returns {Object} object containing days, hours, minutes, seconds, and the clock used in ++meta uptime
 */
function convertMillisecondsToDigitalClock(ms) {
  const days = Math.floor(ms / (3600000 * 24)),
    hours = Math.floor(ms % (3600000 * 24) / 3600000),
    minutes = Math.floor(ms % 3600000 / 60000),
    seconds = Math.floor(ms % 60000 / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    clock: [days, hours, minutes, seconds]
      .map(t => String(t).padStart(2, "0"))
      .join(":")
  };
}

/**
 * Generates the message for ++channel that contains all channels that each command works in
 * @returns {String} a string for the ++channel command
 */
function generateChannelMessage() {
  const ids = config.ids;
  const idToStr = list => list.map(id => `<#${id}>`).join(" ");

  return `Bot Commands: All commands work here. <#${ids.botCommands[0]}>
  Common: All commands besides miscellaneous commands work here. ${idToStr(ids.common)}.
  Early game: Early game commands work here. ${idToStr(ids.earlyGame)}
  Break: Break Infinity commands work here. ${idToStr(ids.break)}
  Early Eternity: Early Eternity commands work here. <#${ids.earlyEternity[0]}>
  ECs: EC commands work here. ${idToStr(ids.ecs)}
  Endgame: Endgame/Dilation commands work here. ${idToStr(ids.endgame)}`;
}

/**
 * Gets a message to prevent repetitive code
 * @param {String} command string that contains what command is being used
 * @param {Object} stuff object that contains theorem, path for the case "ts", acceptable arguments, name of the command, and
 * @returns sends the message or sends an error message back to the code
 */
function getMessage(command, stuff = {}) {
  switch (command) {
  case "ts":
    return generateTree(stuff.theorem, stuff.path);
  case "channel":
    return generateChannelMessage();
  case "error":
    return `Unknown arg ${stuff.args[0]} in command ${stuff.name}. The args for this command are ${stuff.acceptableArgs.join(", ")}.`;
  case "noWorky":
    return noWorkyMessage(stuff.worky);
  case "missingArg":
    return `Command \`${stuff.name}\` requires an arg. The args for this command are ${stuff.acceptableArgs.join(", ")}.`;
  case "shouldNeverAppear":
    return `This message should never appear. If it does, let earth know with a screenshot of the message that caused it.`;
  default:
    console.error("Unknown command for getMessage!");
    return "Something went wrong";
  }
}

/**
 * Gets the message for case "noWorky" in getMessage
 * @param {String} worky String that is used in the switch statment to get a message.
 * @returns {String} String with the message
 */
function noWorkyMessage(worky) {
  switch (worky) {
  case "earlyGame": return `This command only works in the early game channels or the common channels. Use \`++channels\` to see which channels that is!`;
  case "earlyInfinity": return `This command only works in the early infinity channels or the common channels.`;
  case "setCrunchAutoCheck": return `This command only works in the channels it applies in.`;
  case "breakCheck": return `This command only works in the break infinity channels or the common channels. Use \`++channels\` to seee which channels that is!`;
  case "earlyEternity": return `This command only works in the early Eternity channels, bot commands, or the common channels! Use \`++channels\` to see which channels that is!`;
  case "studyTreeCheck": return `This command only works in the Eternity channels, bot commands, or the common channels! Use \`++channels\` to see which ochannels that is!`;
  case "eternityGrinding": return `This command only works in the Eternity channels, bot commands, or the common channels. Use \`++channels\` to see which channels that is!`;
  case "ecs": return `This command only works in the Eternity Challenge channels, bot commands, or the common channels. Use \`++channels\` to see which channels that is!`;
  case "botCommands": return `This is a miscellaneous command and is only allowed in <#351479640755404820>`;
  case "bankedInfs": return `This command only works in the post-TS181 channel and on. You can also use <#351479640755404820>!`;
  case "dilationGrind": return `This command only works in the channel directly before Dilation, bot commands, or the common channels. Use \`++channels\` to see which channels that is!`;
  case "endgame": return `This command only works in the endgame channels, bot commands, or the common channels. Use \`++channels\` to see which channels that is!`;
  case true: return `This check should never appear and is only here to say hi. How are you guys doing?`;
  default: return `What kind of error message are you trying to get?`;
  }
}

/**
 * Starts intervals for the bot. Currently, the only interval being started is the switching bot status.
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function startIntervals(client) {
  setInterval(setBotStatus, 60000, client);
}

let which = true;

/**
 * Changes the bot status, currently every minute.
 * @param {Object} client This is the discord Client object that was declared in bot.js.
 */
function setBotStatus(client) {
  if (which) {
    client.user.setActivity(" people here and in DMs since 1992 || created by earth#1337 || use ++help!", { type: "LISTENING" });
    which = !which;
  } else if (!which) {
    client.user.setActivity(" people here and in DMs since 1992 || created by earth#1337 || You can use the bot in DMs, too!", { type: "LISTENING" });
    which = !which;
  }
}

/**
 * The following function calculates the logarithm of y with base x
 * @param {Number} x base of the logarithm
 * @param {Number} y number being inputted as the logarithm
 * @returns {Number}
 */
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
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
  noWorkyMessage,
  misc: {
    sumAllCommands,
    getHelpDescription,
    getFooter,
    toNumber,
    convertMillisecondsToDigitalClock,
    isUndefined,
    generateChannelMessage,
    getBaseLog
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
  },
  internal: {
    startIntervals,
    setBotStatus,
  }
};
