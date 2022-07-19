import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";

export const discordformatting: Command = {
  name: "discordformatting",
  description: "returns a link to a list of discord formatting stuff",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `Learn discord formatting ${link("here", "https://gist.github.com/matthewzring/9f7bbfd102003963f9be7dbcf7d40e51")}`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};