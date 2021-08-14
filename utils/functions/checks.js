"use strict";

const config = require("../config.json");

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
  return config.ids.botCommands.includes(id) || id === "603002159864348703" || id === "722268615973273725" || message.channel.type === "DM" || id === "873209506430066808";
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
  return botCommandsCheck(id, message) || config.ids.break[0] === id;
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
 * Checks if the ID specified matches the correct channels for requesting a reality command
 * @param {String} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function e4000Check(id, message) {
  return config.ids.endgame[1] === id || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified matches the correct channels for requesting a command
 * @param {String} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function ecsPlusCheck(id, message) {
  return config.ids.ecs.includes(id) || config.ids.endgame.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

/**
 * Checks if the ID specified matches the correct channels for requesting a command
 * @param {String} id the ID of the message channel.
 * @param {object} message object contains everything about the message.
 * @returns {Boolean}
 */
function weirdICsCheck(id, message) {
  return config.ids.earlyEternity.includes(id) || config.ids.break.includes(id) || config.ids.common.includes(id) || botCommandsCheck(id, message);
}

module.exports = {
  earlyGameCheck,
  ecsCheck,
  ecsPlusCheck,
  earlyEternityCheck,
  bankedInfsCheck,
  dilationGrindCheck,
  setCrunchAutoCheck,
  studytreeCheck,
  e4000Check,
  weirdICsCheck,
  commonCheck,
  endgameCheck,
  botCommandsCheck,
  breakCheck,
  earlyInfinityCheck,
  eternityGrindingCheck
};