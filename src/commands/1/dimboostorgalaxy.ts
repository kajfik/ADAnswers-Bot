import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const dimboostorgalaxy: Command = {
  name: "dimboostorgalaxy",
  description: "tells you if you should do a dimboost or galaxy",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = "Galaxy if you can afford it, Dimboost if you are trying to reach being able to afford it.";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};