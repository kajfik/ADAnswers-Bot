import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { getBaseLog, isHelper } from "../../functions/Misc";
import { Command } from "../../command";

export const rm: Command = {
  name: "rm",
  description: "calculates the amount of EP required to get the number of RM specified (2 < x < 1000)",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "rm",
      description: "the number of RM to calculate",
      type: ApplicationCommandOptionType.Number,
      required: true,
      // Thanks discordjs
      // eslint-disable-next-line camelcase
      max_value: 1000,
      // eslint-disable-next-line camelcase
      min_value: 2,
    }
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const realityMachinesRequested: number = Math.floor(Math.abs(interaction.options.getNumber("rm") as number));
    const eternityPointsNeeded: number = Math.ceil(Math.min(
      4000 * (getBaseLog(1000, realityMachinesRequested) + 1),
      4000 / 27 * (realityMachinesRequested + 26)
    ));

    // eslint-disable-next-line max-len
    const content: string = `After your first Reality, before any multipliers, to get ${realityMachinesRequested} RM, you need e${eternityPointsNeeded} EP.`;

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};