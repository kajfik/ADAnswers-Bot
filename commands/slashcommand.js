"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "slashcommand",
    description: "explains how TS and EC slash commands work with their args and how to type them",
    number: 7, 
    check: true,
    sent: [`\`/ec [TAB] A [TAB] B [TAB] [ENTER]\` for Eternity Challenge guide of EC AxB
    \`/eco [TAB] A [TAB] B [TAB] [ENTER]\` for Eternity Challenge Order from EC AxB
    \`/ts [TAB] A [ENTER]\` for recommended Study Tree for your TT amount of A
    [TAB] can be [ENTER] too`]
  }),
};