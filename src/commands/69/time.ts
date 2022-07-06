import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { decimalTimeAsHMS } from "../../functions/time";
import { isHelper } from "../../functions/Misc";

export const time: Command = {
  name: "time",
  description: "Displays the current time, in Decimal time. https://en.wikipedia.org/wiki/Decimal_time",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const content: string = `Currently ${decimalTimeAsHMS(new Date())}`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};