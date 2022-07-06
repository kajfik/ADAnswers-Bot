import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const xkcd: Command = {
  name: "xkcd",
  description: "any XKCD comic using the number",
  type: "CHAT_INPUT",
  options: [
    {
      name: "xkcd",
      description: "the comic number",
      required: true,
      type: "INTEGER",
      // eslint-disable-next-line camelcase
      min_value: 1,
    }
  ],
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `https://xkcd.com/${interaction.options.getInteger("xkcd")}/`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};