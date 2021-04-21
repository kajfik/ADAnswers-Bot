/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 69,
  name: "mage",
  description: "mage!",
  execute(message) {
    // eslint-disable-next-line no-negated-condition
    if (message.channel.id !== "351479640755404820") message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
    else message.channel.send(`yo! this guy is real cool. does a lot of stuff for the people. became a mod in record time. be like mage.`);
  }
};