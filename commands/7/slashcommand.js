"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "slashcommand",
    description: "explains how TS and EC slash commands work with their args and how to type them",
     
    check: true,
    sent: [`\`/ec [TAB] A [TAB] B [TAB] [ENTER]\` for Eternity Challenge guide of EC AxB
    \`/eco [TAB] A [TAB] B [TAB] [ENTER]\` for Eternity Challenge Order from EC AxB
    \`/ts [TAB] A [ENTER]\` for recommended Study Tree for your TT amount of A
    [TAB] can be [ENTER] too.
    On mobile, you need to tap these buttons: https://cdn.discordapp.com/attachments/351479640755404820/880396642539409418/Screenshot_20210826-172054_Discord2.png
    See this gif for more help on web: https://i.imgur.com/rK1MwNR.gif`]
  }),
};