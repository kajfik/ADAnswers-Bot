import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const grindingforbreak: Command = {
  name: "grindingforbreak",
  description: "Describes how to reach Break Infinity.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `Get the 10,000 cost 2x IP then save up. On mobile you will need a total of 32,767 IP (2^15 - 1). You'll have to make an additional purchase on web, because the crunch buyers default interval is at 300 seconds - while mobiles is at 150 seconds. That means you need 65,535 IP (2^16 - 1) in total if you're playing on web. (You'll also need to complete C12 if you haven't already)`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};