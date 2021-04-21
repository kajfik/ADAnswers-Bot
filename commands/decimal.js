/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "decimal",
  description: "Explains how break_infinity.js works",
  execute(message) {
    message.channel.send(`Computers use the "64-bit Double-precision floating-point format" (or "double") for storing decimal values and as per the IEEE 754 standard its maximum value is 2^1024 which is about 1.79e308. In JavaScript, the programming language used for the web version, this value is named "Infinity". In the beginning, this was the largest number. Then Patashu broke that limit by creating "break_infinity.js", which stores the two parts of a "double" (mantissa and exponent) separately, thus allowing very, very large numbers.
    The library created by Patashu is optimized for speed, not for precision. <https://github.com/Patashu/break_infinity.js>
    Razenpok worked with Patashu on improving the library and porting it to C#: <https://github.com/Razenpok/BreakInfinity.cs>`);
  }
};