"use strict";

/* eslint-disable max-len */

const config = require("./config.json"); 

function earlyGameCheck(id) {
    return config.ids.earlyGame.includes(id) || config.ids.common.includes(id) || config.ids.botCommands.includes(id);
}

function breakCheck(id) {
    return config.ids.break.includes(id) || config.ids.common.includes(id) || config.ids.botCommands.includes(id);
}

function earlyEternityCheck(id) {
    return config.ids.earlyEternity.includes(id) || config.ids.common.includes(id) || config.ids.botCommands.includes(id);
}

function ecsCheck(id) {
    return config.ids.ecs.includes(id) || config.ids.common.includes(id) || config.ids.botCommands.includes(id);
}

function endgameCheck(id) {
    return config.ids.endgame.includes(id) || config.ids.common.includes(id) || config.ids.botCommands.includes(id);
}

function botCommandsCheck(id) {
    // 603002159864348703 is #bots in Earth's things
    // 722268615973273725 is #general in bot test server
    return config.ids.botCommands.includes(id) || id === "603002159864348703" || id === "722268615973273725";
}

function bankedInfsCheck(id) {
    return config.ids.common.includes(id) || config.ids.ecs[1] === id || config.ids.endgame.includes(id) || config.ids.botCommands.includes(id);
}

function dilationGrindCheck(id) {
    return config.ids.endgame.includes(id) || config.ids.common.includes(id) || config.ids.botCommands.includes(id) || config.ids.ecs[1] === id;
}

function earlyInfinityCheck(id) {
    return config.ids.earlyGame[1] === id || config.ids.common.includes(id) || config.ids.botCommands.includes(id);
}

function eternityGrindingCheck(id) {
    return earlyEternityCheck(id) || config.ids.ecs.includes(id);
}

function setCrunchAutoCheck(id) {
    return earlyGameCheck(id) || config.ids.break.includes(id);
}

function studytreeCheck(id) {
    return ecsCheck(id) || earlyEternityCheck(id);
}

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

module.exports = {
    earlyGameCheck,
    breakCheck,
    earlyEternityCheck,
    ecsCheck,
    endgameCheck,
    botCommandsCheck,
    misc: {
        sumAllCommands,
        getHelpDescription,
        getFooter,
        toNumber
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


