"use strict";

const config = require("../config.json");

function generateChannelMessage() {
  const a = config.ids;
  let b = "";
  let c = "";
  let d = "";
  let f = "";
  let g = "";
  a.common.forEach(id => {
    b += `<#${id}>`;
  });
  a.earlyGame.forEach(id => {
    c += `<#${id}>`;
  });
  a.break.forEach(id => {
    d += `<#${id}>`;
  });
  a.ecs.forEach(id => {
    f += `<#${id}>`;
  });
  a.endgame.forEach(id => {
    g += `<#${id}>`;
  });

  return `Bot Commands: All commands work here. <#${a.botCommands[0]}>
  Common: All commands besides miscellaneous commands work here. ${b}.
  Early game: Early game commands work here. ${c}
  Break: Break Infinity commands work here. ${d}
  Early Eternity: Early Eternity commands work here. <#${a.earlyEternity[0]}>
  ECs: EC commands work here. ${f}
  Endgame: Endgame/Dilation commands work here. ${g}`;
}

module.exports = {
  number: 6,
  name: "channels",
  description: "Sends a list of channels and their ids/part of game progress",
  execute(message) {
    if (config.ids.botCommands.includes(message.channel.id)) {
      message.channel.send(generateChannelMessage());
    } else {
      // eslint-disable-next-line max-len
      message.channel.send(`Command ++${this.name} is not allowed in this channel! Use <#${config.ids.botCommands[0]}>`);
    }
  }
};