import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const failec: Command = {
  name: "failec",
  description: "Describes what ECs you can fail and how/when",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "To fail an EC, you must be in either EC4 or 12. Then, fail the condition (in EC4, too many infinities, in EC12, taking too long).";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};