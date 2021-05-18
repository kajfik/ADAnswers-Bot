/* eslint-disable max-len */
"use strict";

module.exports = {
  name: "deadchat",
  description: "sends that one message from spec that he said that one time",
  number: 7,
  execute(message) {
    message.channel.send(`If chat is quiet, just move on and do something else instead of annoying people with what effectively amounts to "hey someone talk already"`);
  }
};
