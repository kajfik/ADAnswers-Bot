import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, makeEnumeration, quantify } from "../../functions/Misc";
import { Command } from "../../command";
import { ecsAtTTAmount } from "../../functions/ecs";

export const ecsattt: Command = {
  name: "ecsattt",
  description: "Given TT amount, returns which ECs you should have completed",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "tt",
      description: "How many TT do you have",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    },
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const tt: number = interaction.options.getInteger("tt") as number;

    const response = ecsAtTTAmount(tt);

    // eslint-disable-next-line max-len
    const content: string = `At ${quantify("Time Theorem", tt)}, you should have: ${
      typeof response === "string"
        ? response
        : `${response.completions} (Next: ${makeEnumeration<string>(response.nextECs, ", ", "", "and")} at ${response.nextChallengeTT} TT)`
    }`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};