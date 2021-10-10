"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 1,
    name: "dimboostorgalaxy",
    description: "tells you if you should do a dimboost or galaxy",
    check: true,
    sent: ["Galaxy if you can afford it, Dimboost if you are trying to reach being able to afford it."]
  })
};
