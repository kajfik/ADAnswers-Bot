import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const columns: Command = {
  name: "columns",
  description: "sends an image with the columns of infinity upgrades",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `https://cdn.discordapp.com/attachments/822306768624287744/839301389452967957/Screenshot_20210505-103747_b29a8b237ccc9257831c4b60110b5dac__01.jpg`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  },
};