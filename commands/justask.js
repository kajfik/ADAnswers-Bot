/* eslint-disable max-len */
"use strict";

module.exports = {
  name: "justask",
  description: "sends a passive aggressive thing",
  number: 6,
  execute(message) {
    message.channel.send("please just ask your question. don't ask to ask. don't ask for topic experts or DMs. don't ping random users. skip the formalities and ask away! https://dontasktoask.com/");
  }
};