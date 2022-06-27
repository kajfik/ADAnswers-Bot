/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");
const { Misc } = require("../../classes/FunctionClasses/Misc");
const link = (content, url) => Misc.link(content, url);

module.exports = {
  command: new ApplicationCommand({
    name: "matterportal",
    description: "Matter Portal news tickers",
    check: true,
    sent: [`The story is called "Antimatter War" and it was written by Buck (one of the android version testers), you can find the original version ${link("here", "https://pastebin.pl/view/cb7a92ef")} \n
    You can also find a prequel to that story called "Matter Portal: Origins" ${link("here", "https://pastebin.pl/view/44b5585f")}`]
  })
};
