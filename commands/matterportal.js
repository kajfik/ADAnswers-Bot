/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 7,
    name: "matterportal",
    description: "Matter Portal news tickers",
    check: true,
    sent: [`The story is called "Antimatter War" and it was written by Buck (one of the android version testers), you can find the original version here: <https://pastebin.pl/view/cb7a92ef> \n
    You can also find a prequel to that story called "Matter Portal: Origins" here: <https://pastebin.pl/view/44b5585f>`]
  })
};
