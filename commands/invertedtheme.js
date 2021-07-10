/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

// This is a command I'm only migrating because I'm sure someone will post about it somewhere at some point.
// It's pretty much useless since #web-bugs isn't open anymore, but I'd rather keep it than delete it.

module.exports = {
  command: new Command({
    number: 5,
    name: "invertedtheme",
    description: "response to the frequent web bug report that the inverted theme is bugged.",
    check: true,
    acceptableArgs: undefined,
    sent: [`It is a bug, however, it has been fixed in the upcoming Reality Update. If, however, you are insistent on using the Inverted or Inverted Metro themes, go into the Developer Console (F12), go to the Elements tab, and then under the styles tab (picture attatched https://i.imgur.com/LelvBpL.png), click New Style Rule, and add in this code: \`\`\`css
    html, body, div#container {
      height: 100%;
    }\`\`\``]
  })
};