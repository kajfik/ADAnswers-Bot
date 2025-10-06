import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const savebank: Command = {
  name: "savebank",
  description: "Provides a link to Buck's save bank.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "<https://buck4437.github.io/save-bank/> Check out Buck's save bank! If you've lost your save, try here and see if there's one close to your progress.";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};