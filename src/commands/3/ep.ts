import { getBaseLog, isHelper } from "../../functions/Misc";
import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";

export const ep: Command = {
  name: "ep",
  description: "calculates the amount of IP required to get the number of EP specified (2 < x < 1000)",
  type: "CHAT_INPUT",
  options: [
    {
      name: "ep",
      description: "the number of EP to calculate",
      type: "NUMBER",
      required: true,
      // Thanks discordjs
      // eslint-disable-next-line camelcase
      max_value: 1000,
      // eslint-disable-next-line camelcase
      min_value: 2,
    }
  ],
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const eternityPointsRequested: number = Math.floor(Math.abs(interaction.options.getNumber("ep") as number));
    const infinityPointsNeeded: number = Math.ceil(308 * getBaseLog(5, eternityPointsRequested) + 215.6);

    // eslint-disable-next-line max-len
    const content: string = `Before any multipliers, to get ${eternityPointsRequested} EP, you need e${infinityPointsNeeded} IP.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};