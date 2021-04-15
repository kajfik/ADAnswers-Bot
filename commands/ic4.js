/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 5,
  name: "ic4",
  description: "shorthand for `++challenge ic4`",
  execute(message) {
    message.channel.send(`IC4 video guide (for mobile): <https://youtu.be/kytefPmkqL4>
IC4 written guide (for web): <https://pastebin.com/aZktZs8m>`);
  }
};