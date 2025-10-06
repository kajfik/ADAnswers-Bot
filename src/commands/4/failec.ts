import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const failec: Command = {
  name: "failec",
  description: "Describes what ECs you can fail and how/when",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "To fail an EC, you must be in either EC4 or 12. Then, fail the condition (in EC4, too many infinities, in EC12, taking too long).";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};