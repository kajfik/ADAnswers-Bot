import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const respec: Command = {
  name: "respec",
  description: "Describes what respec studies does",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `It resets your Time Studies and refunds all the TT when you next Eternity. There are no costs or downsides to doing this, just remember to redistribute your TT after Eternity!`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};