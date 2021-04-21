/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 69,
  name: "spectralflame",
  description: "spec!",
  execute(message) {
    // eslint-disable-next-line no-negated-condition
    if (message.channel.id !== "351479640755404820") message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
    else message.channel.send(`spec is a really cool dude who does stuff! he's been a good friend of mine for a a few years now. he also is really fuckin educated on some physics stuff, so he's got that going for him.`);
  }
};