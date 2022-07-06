import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const galaxyboost: Command = {
  name: "galaxyboost",
  description: "compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = "The top equation shows the power of 0 galaxies and 100 tickspeed upgrades, while the bottom equation shows the power of just 1 galaxy and 100 tickspeed upgrades. The boost is about ~5.8x, and it will only get better! https://i.imgur.com/X026AsW.png";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};