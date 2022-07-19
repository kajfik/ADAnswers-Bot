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
        { name: "early", value: "early" },
        { name: "late", value: "late" }
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const when = interaction.options.getString("when");

    const content = when === "early"
      ? "Crunch autobuyer on 5.1 seconds (because of the reward from r87 (and for help with attaining this achievement, use `/achievements r87`)), and make sure you have TS32 for the extra multiplier based on DimBoosts"
      : `INFINITY FARMING: (Do this on long AFKs) ---- EC10 diminishing returns, reach at least 5 billion eventually (achievement)

      Method:
      -Normal IDLE build (Autobuy RG off -- good for EP later, use 225 with full tree ++ achievement at e20,000 replicanti)
                   ----OR----
      -PASSIVE (Autobuy RG on -- 11% faster infinities, no EP later, use 226 with full tree -- not recommended before very high EP -- 33ms required)
    
      -Crunch 5s
      -AutoGalaxy .4s (or .05s with a maximum galaxy count of the highest you reach in under 4.9 seconds)
      -AutoDimboost .1s
      -Get "high" IP before starting`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};