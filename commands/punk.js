/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 69,
  name: "punk",
  description: "punk?",
  execute(message) {
    // eslint-disable-next-line no-negated-condition
    if (message.channel.id !== "351479640755404820") message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
    else message.channel.send(`i have never spoken to punk but i really like their modding style`);
  }
};