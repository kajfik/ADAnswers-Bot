/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 3,
  name: "unsmith",
  description: ":unsmith:",
  execute(message) {
    // eslint-disable-next-line no-negated-condition
    if (message.channel.id !== "351479640755404820") message.channel.send("This is a miscellaneous command and is only allowed in <#351479640755404820>");
    else message.channel.send("this command is dedicated to platonic. creator of synergism. love ya. go play synergism at https://pseudonian.github.io/SynergismOfficial/");
  }
};