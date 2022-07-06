import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const slightsmile: Command = {
  name: "slightsmile",
  description: "kaj no",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "\u{1F642}";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};