import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const sacrifice: Command = {
  name: "sacrifice",
  description: "describes sacrifice and when to",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `Sacrifice resets all Antimatter Dimensions besides 8th Dimensions, and in return you get a multiplier based on First Dimensions. This effect stacks, and is reset on DimBoost/Galaxy/Infinity/etc. I recommend saccing after you buy 10 8th dims and the multiplier is >2x`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};