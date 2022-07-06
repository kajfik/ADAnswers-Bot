import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const pins: Command = {
  name: "pins",
  description: "pins. read them",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "pins. read them.";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};