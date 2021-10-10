"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "helpnumbers",
    description: "sends what each of the help pages has on it",
    check: "botCommandsCheck", 
    sent: [`Page 1 covers until break infinity
    Page 2 rest of infinity era + achievements and swipe trick
    Page 3 is eternity, pre ECs
    Page 4 is ECs + Dilation
    Pages 5, 6, 7, 8 is some more common game info stuff and/or bot functions
    ||Page 69 is where the fun's at||`]
  })
};