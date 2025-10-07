import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const xyproblem: Command = {
  name: "xyproblem",
  description: "sends a passive aggressive thing",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "the XY problem is a simple conundrum that often occurs, especially in AD, when somebody wants to accomplish one thing but says that they want to accomplish another that they believe will help reach their end goal. https://xyproblem.info/";

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};