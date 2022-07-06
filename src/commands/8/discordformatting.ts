import { isHelper, link } from "../../functions/Misc";
import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";

export const discordformatting: Command = {
  name: "discordformatting",
  description: "returns a link to a list of discord formatting stuff",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `Learn discord formatting ${link("here", "https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51")}`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};