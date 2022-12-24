import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const justask: Command = {
  name: "justask",
  description: "sends a passive aggressive thing",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "please just ask your question. don't ask to ask. don't ask for topic experts or DMs. don't ping random users. skip the formalities and ask away! https://dontasktoask.com/";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};