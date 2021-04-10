/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "decimal",
  description: "Explains how break_infinity.js works",
  execute(message) {
    message.channel.send(`\`break_infinity.js\` works by seperating the numbers into two different parts: a mantissa and an exponent. In scientific notation, the mantissa is the number before the "e", and the exponent is the number after. You can find the code for \`break_infinity.js\` at <https://github.com/Patashu/break_infinity.js/>.`);
  }
};