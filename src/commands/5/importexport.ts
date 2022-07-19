import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const importexport: Command = {
  name: "importexport",
  description: "sends that screenshot of the break infinity upgrade order spreadsheet",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "https://cdn.discordapp.com/attachments/351476683016241166/855129740222005278/unknown.png";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};