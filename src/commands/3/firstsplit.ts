import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const firstsplit: Command = {
  name: "firstsplit",
  description: "Describes how to progress on the time study tree pre-TS171",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `AD when it lets you get further down the tree, ID when you have 7 spare TT, TD when you can afford 171 as well`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};