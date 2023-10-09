import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const breakinfinity: Command = {
  name: "breakinfinity",
  description: "describes break infinity and gives an order to get break infinity upgrades",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `
Break Infinity is unlocked by getting the Big Crunch autobuyer to its maximum interval of 0.10 seconds. When you Break Infinity, ||you are able to get past 1.8e308 Antimatter||. See more in the pins of the respective channel.
For the recommended upgrade order use \`/bugo\`.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};