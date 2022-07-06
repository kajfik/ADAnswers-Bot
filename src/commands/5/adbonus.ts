import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const adbonus: Command = {
  name: "adbonus",
  description: "Sends ad bonus formulas/multipliers",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `DT: 2
    EP: min(max(EP^0.01, 1.5), 1e10)
    IP: max(IP^0.01, 2)
    AD: 2`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};