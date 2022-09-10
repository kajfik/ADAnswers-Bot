import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, randomInArray } from "../../functions/Misc";
import { Command } from "../../command";
import { bushisms } from "../../utils/databases/bushisms";

export const bushism: Command = {
  name: "bushism",
  description: "returns a bushism",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    const content = randomInArray(bushisms);

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};