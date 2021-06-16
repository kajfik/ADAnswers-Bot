"use strict";

const functions = require("../functions");

module.exports = {
  number: 7,
  name: "helpnumbers",
  description: "sends what each of the help pages has on it",
  // eslint-disable-next-line no-unused-vars
  execute(message, _a, id) {
    if (functions.botCommandsCheck(id, message)) message.channel.send(`Page 1 covers until break infinity
    Page 2 rest of infinity era + achievements and swipe trick
    Page 3 is eternity
    Page 4 dilation, reality (there is also some space left to not have to do this again...), meta command, pins
    Page 5-6 some more common game info stuff
    Page 7 lore (5hours, justask, thanks,...and other miscellaneous bot functions)
    ||Page 69 is where the fun's at||`);
  }
};