/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 5,
  name: "savebank",
  description: "Provides a link to Buck's save bank.",
  execute(message) {
    message.channel.send(`https://buck4437.github.io/save-bank/ Check out Buck's save bank! If you've lost your save, try here and see if there's one close to your progress.`);
  }
};
