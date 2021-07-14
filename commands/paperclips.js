/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    number: 7,
    name: "paperclips",
    description: "Explanation of the origin of paperclips.",
    check: true,
    sent: [`The paperclips are a reference to another great incremental game: Universal Paperclips https://www.decisionproblem.com/paperclips/. \nYou can get a useless paperclip in the Android version of AD by clicking on a newsticker that says "Click here to disassemble the news ticker for a trace amount of useless paperclips."\n When you click on it, the news ticker is hidden (which can be re-enabled in Options -> News), and you get a popup that says "+1 useless paperclip".\n The news ticker was submitted by a Discord user named Buck in the #news-ticker-suggestions channel.`]
  })
};
