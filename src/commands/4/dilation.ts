import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const dilation: Command = {
  name: "dilation",
  description: "describes dilation",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `(Check out the pins in <#443492392801140786>!) If you can reach 1.80e308 IP and then complete the Eternity while Dilated, you will be rewarded with Tachyon Particles. You can dilate as many times as you want, but Tachyon Particles cannot be farmed like other resources. Instead, you can only gain more Tachyon Particles by passing your previous highest antimatter within Time Dilation, and you will only gain more based on your new highest antimatter from this new run.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};