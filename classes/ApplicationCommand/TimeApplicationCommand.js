"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { getDecimalTimeFromNormalPeopleTimeLikeTheOneThatNormalPeopleUseFuckingTwentyFourHourTime, newDate } = require("../../utils/functions/time");

class TimeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    interaction.reply(`Currently ${getDecimalTimeFromNormalPeopleTimeLikeTheOneThatNormalPeopleUseFuckingTwentyFourHourTime(newDate(), false, 0, false, true)}`);
  }
}

module.exports = { TimeApplicationCommand };