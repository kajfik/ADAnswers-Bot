import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const bugo: Command = {
  name: "bugo",
  description: "sends that screenshot of the break infinity upgrade order spreadsheet",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "https://cdn.discordapp.com/attachments/351479640755404820/1090075280862888046/bugo-v2.png";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};