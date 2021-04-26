"use strict";

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
    return config.ids.botCommands.includes(id);
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

module.exports = {
    earlyGameCheck,
    breakCheck,
    earlyEternityCheck,
    ecsCheck,
    endgameCheck,
    botCommandsCheck,
    special: {
        bankedInfsCheck,
        dilationGrindCheck,
        earlyInfinityCheck,
        eternityGrindingCheck,
        setCrunchAutoCheck,
        studytreeCheck
    }
};


