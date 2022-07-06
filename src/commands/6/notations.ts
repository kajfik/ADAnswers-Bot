import { isHelper, link } from "../../functions/Misc";
import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";

export const notations: Command = {
  name: "notations",
  description: "Sends a link to the Notations GitHub repo.",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `Check out all notations in action ${link("here", "https://antimatter-dimensions.github.io/notations/")} (${link("GitHub repo", "https://github.com/antimatter-dimensions/notations")})`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};