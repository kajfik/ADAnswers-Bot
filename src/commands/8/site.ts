import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const site: Command = {
  name: "site",
  description: "Says the game site + link to android version",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `Web: https://ivark.github.io/
    Android version: <https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions>`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};