import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const bugo: Command = {
  name: "bugo",
  description: "sends that screenshot of the break infinity upgrade order spreadsheet",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "https://cdn.discordapp.com/attachments/351476683016241166/855129740222005278/unknown.png";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};