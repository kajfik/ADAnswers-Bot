/* eslint-disable max-len */
"use strict";

const { NewsCommand } = require("../classes/NewsCommand");

const newsMessageObject = {
  "listmobile": "<https://paste.ee/p/LGLeE>",
  "listweb": "<https://github.com/IvarK/IvarK.github.io/blob/master/javascripts/core/newsticker.js>"
};

module.exports = {
  command: new NewsCommand({
    number: 6,
    name: "news",
    description: "Args: `listmobile` and `listweb`. Explains what the news ticker is and where it came from",
    check: true,
    acceptableArgs: Object.keys(newsMessageObject),
    sent: [`The news ticker is an art form. Back in the day Antimatter Dimensions used to have a channel called news ticker suggestions, where people would suggest news messages as they saw fit. However, due to the horrible quality of these suggestions, the channel was shut down. However, the legacy of the channel still lives on in game, and you can read all of the messages as they come across the top. They were all community submitted or snuck in by the developers. For a list of them for mobile, use \`++news listmobile\`. For a list of them for web, use \`++news listweb\`.`],
    getArgMessage(arg) {
      if (this.acceptableArgs.includes(arg.toLowerCase())) return newsMessageObject[arg.toLowerCase()];
      return `Unknown arg in command news`;
    }
  })
};
