import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const infinitygrinding: Command = {
  name: "infinitygrinding",
  description: "Sends how to grind infinities for requested time period. Early = EC4, late = banked",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "when",
      description: "at what point in the game you are. Early = EC4, late = banked",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "2million", value: "2million" },
        { name: "early", value: "early" },
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const when = interaction.options.getString("when");

    let content: string;

    switch (when) {
      case "normal":
        content = `Crunch autobuyer on 5.1 seconds (because of the reward from r87 (and for help with attaining this achievement, use \`/achievements other:87\`)), and make sure you have TS32 for the extra multiplier based on DimBoosts.
        If grinding for EC4, make **sure** you are using Idle path before wasting time here!
        If grinding for banked infinities, make sure to be using TS191!`;
        break;
      case "2million":
        // eslint-disable-next-line max-len
        content = `You can use the Time study 32 to gain more Infinities on Crunch based on Dimension Boosts. To take advantage of TS 32 you need to have as many Dimension Boosts when you Crunch as possible. However Antimatter Galaxies reset the amount of Dimboosts so you want to disable the Antimatter Galaxy autobuyer. After that set Dimboost autobuyer to buy max dimboosts every 0 seconds and set Crunch autobuyer to something like 0.1-1.0 seconds between Crunches depending on how long it takes to buy Dimboosts.`;
        break;
      default:
        content = "Unknown when";
    }

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};