/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "161or162",
  description: "Explains whether to chose TS161 or TS162",
  execute(message) {
    if (message.channel.id === ("387798906333036546" || "387799188848640013")) {
      message.channel.send(`Before completing EC2 at least once, TS161 is better mathematically. They essentially give the same effect, but TS161's effect is more immediate.`);
    } else {
      message.channel.send("This command only works in <#387798906333036546> or <#387799188848640013>");
    }
  }
};