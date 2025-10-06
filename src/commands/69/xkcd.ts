import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const xkcd: Command = {
  name: "xkcd",
  description: "any XKCD comic using the number",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "xkcd",
      description: "the comic number",
      required: true,
      type: ApplicationCommandOptionType.Integer,
      // eslint-disable-next-line camelcase
      min_value: 1,
    }
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `https://xkcd.com/${interaction.options.getInteger("xkcd")}/`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};