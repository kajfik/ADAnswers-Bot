import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const savebank: Command = {
  name: "savebank",
  description: "Provides a link to Buck's save bank.",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "<https://buck4437.github.io/save-bank/> Check out Buck's save bank! If you've lost your save, try here and see if there's one close to your progress.";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};