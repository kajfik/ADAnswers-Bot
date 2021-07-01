"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 1,
    name: "dimboostorgalaxy",
    description: "tells you if you should do a dimboost or galaxy",
    check: true,
    acceptableArgs: undefined,
    sent: ["Galaxy if you can afford it, Dimboost if you are trying to reach being able to afford it."]
  })
};
