/* eslint-disable max-len */
"use strict";

const NOW = Date();

const { MetaCommand } = require("../classes/MetaCommand");

const metaMessageObject = {
  "lastRestart": NOW,
  "uptime": `The bot has been up for (Waiting for edit...).`,
  "ping": `Pinging...`,
  "suggest": `Submit an issue on GitHub at <https://github.com/earthernsence/ADAnswers-Bot/issues> to suggest more commands!`,
  "invite": `If, for whatever reason, you wish to invite me to your server, go to <https://discord.com/api/oauth2/authorize?client_id=830197123378053172&permissions=84992&scope=bot>.`,
  "contributing": `If you are interested in contributing to the bot, check out both information files at <https://github.com/earthernsence/ADAnswers-Bot#readme> and <https://github.com/earthernsence/ADAnswers-Bot/tree/main/commands#readme>`
};

module.exports = {
  command: new MetaCommand({
    number: 4,
    name: "meta",
    description: "Args: `lastRestart`, `uptime`, `ping`, `suggest`, `invite`. internal bot information",
    check: "botCommands",
    sent: undefined,
    acceptableArgs: Object.keys(metaMessageObject),
    getArgMessage(arg) {
      if (this.acceptableArgs.includes(arg)) return metaMessageObject[arg];
      return `Unknown arg in meta command`;
    }
  })
};
