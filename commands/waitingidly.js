/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 69,
  name: "waitingidly",
  description: "idly!",
  execute(message) {
    // eslint-disable-next-line no-negated-condition
    if (config.ids.botCommands.includes(message.channel.id)) message.channel.send(`got dang! this guy has done so much for AD in just the past year. he is a great guy who knows his stuff.`);
    else message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
  }
};