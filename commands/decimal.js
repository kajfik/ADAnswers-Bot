/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "decimal",
    number: 6,
    description: "Explains how break_infinity.js works",
    check: true,
    acceptableArgs: undefined,
    sent: [`Computers use the "64-bit Double-precision floating-point format" (or "double") for storing decimal values and as per the IEEE 754 standard its maximum value is 2^1024 which is about 1.79e308. In JavaScript, the programming language used for the web version, this value is named "Infinity". In the beginning, this was the largest number. 
    Originally, the limit was broken by MikeMcl who developed the library "decimal.js" (hence the moniker "decimal"), but the library was far less optimised than it could have been. Then Patashu optimised the library and improved it by creating "break_infinity.js", which stores the two parts of a "double" (mantissa and exponent) separately, thus allowing very, very large numbers.
    The original library created by MikeMcl was created for more precise numbers over speed, which is what Patashu built off of: <https://github.com/MikeMcl/decimal.js/>
    The library created by Patashu is optimized for speed, not for precision, making it good for incremental games: <https://github.com/Patashu/break_infinity.js>
    Razenpok worked with Patashu on improving the library and porting it to C#: <https://github.com/Razenpok/BreakInfinity.cs>`]
  }),
};
