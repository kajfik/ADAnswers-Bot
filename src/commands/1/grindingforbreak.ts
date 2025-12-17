import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const grindingforbreak: Command = {
  name: "grindingforbreak",
  description: "Describes how to reach Break Infinity.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `Get the 10,000 cost 2x IP then save up. You will need a total of 32767 IP (2^15 - 1) to fully upgrade the Crunch autobuyer. You will also need to complete C12 if you haven't already.`;

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};