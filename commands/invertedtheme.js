/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 5,
  name: "invertedtheme",
  description: "response to the frequent web bug report that the inverted theme is bugged.",
  execute(message) {
    message.channel.send(`It is a bug, however, it has been fixed in the upcoming Reality Update. If, however, you are insistent on using the Inverted or Inverted Metro themes, go into the Developer Console (F12), go to the Elements tab, and then under the styles tab (picture attatched https://i.imgur.com/LelvBpL.png), click New Style Rule, and add in this code: \`\`\`css
html, body, div#container {
  height: 100%;
}\`\`\``);
  }
};