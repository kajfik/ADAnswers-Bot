/* eslint-disable max-len */
import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";

export const decimal: Command = {
  name: "decimal",
  description: "Explains how break_infinity.js works",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
Computers use the "64-bit Double-precision floating-point format" (or "double") for storing decimal values and as per the IEEE 754 standard its maximum value is 2^1024 which is about 1.79e308. In JavaScript, the programming language used for the web version, this value is named "Infinity". In the beginning, this was the largest number. 
Originally, the limit was broken by MikeMcl who developed the library "decimal.js" (hence the moniker "decimal"), but the library was far less optimised than it could have been. Then Patashu optimised the library and improved it by creating "break_infinity.js", which stores the two parts of a "double" (mantissa and exponent) separately, thus allowing very, very large numbers.
The original library created by MikeMcl was created for more precise numbers over speed, which is what Patashu built off of can be found ${link("here", "https://github.com/MikeMcl/decimal.js/")}
The library created by Patashu is optimized for speed, not for precision, making it good for incremental games, can be found ${link("here", "https://github.com/Patashu/break_infinity.js")}
Razenpok worked with Patashu on improving the library and porting it to C#, which can be found ${link("here", "https://github.com/Razenpok/BreakInfinity.cs")}`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};