import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const changeectree: Command = {
  name: "changeectree",
  description: "Describes how to change your tree for doing an EC",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
As long as you buy the EC before you respec and don't buy another, you won't need to complete the secondary requirement again. 
For example, with EC3:
- unlock EC3 with TD/Active
- respec and eternity
- Buy the recommended tree
- unlock EC3`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};