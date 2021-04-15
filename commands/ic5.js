/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 5,
  name: "ic5",
  description: "shorthand for `++challenge ic5`",
  execute(message) {
    message.channel.send(`IC5 video guide (for mobile): <https://www.youtube.com/watch?v=eNqPZ9kGurE>
IC5 written guide (for web): <https://pastebin.com/sj2nFFjH>`);
  }
};