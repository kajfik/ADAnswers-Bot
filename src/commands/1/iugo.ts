import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const iugo: Command = {
  name: "iugo",
  description: "pre break infinity upgrade order routes",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `https://cdn.discordapp.com/attachments/387798906333036546/906978039517306920/iugo_v3.jpeg`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};