import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const secretachievements: Command = {
  name: "secretachievements",
  description: "Sends a link to the secret achievements guide.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "<https://antimatter-dimensions.fandom.com/wiki/Achievements#Secret_achievement_list>";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};