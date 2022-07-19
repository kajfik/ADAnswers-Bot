import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const eternitygrinding: Command = {
  name: "eternitygrinding",
  description: "describes how to eternity grind",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "when",
      description: "at what point in the game you are. early < 110k eternities, late < 1m",
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
      ? `Eternity buyer to 0, crunch (theoretically best to worst) 2e308, 1e154,1e103, 1e77 (all with "x times last" setting)
    Test which works the best for you. You might have to adjust the value a little bit. Use ID+active path.`
      : `ETERNITY FARMING: (Do this on long AFKs up to 1M)

    Early on:
    
    -Leave all your autobuyers on except for RGs. (try turning off galaxies, sacrifice)
    -Try Crunch at multiples of a fair value (1e40-1e100?) to force ID buying
    -Use ID/TD and Active paths.
    
    Later (a few hundred thousand -> 1M) -- application of different parts may vary in time
    
    -ND/TD and Active Paths.
    -Turn off Galaxy, Sacrifice, Dimension Autobuyers, Crunch (as needed to approach .08s or lower avg times)
    -Change 8th dim autobuyer to singles from 10s (seems to be associated with starting AM and 8th dim cost)
    -Play with game update speed. 37-38ms may be ideal at some points. 33ms at the end.
    -Tweak just about anything else you can find to tweak and see if it helps.
    -Reach 1M and you're done!
    
    Speed Markers:
    Channel Base: .12s
    ~e400-1,000+EP+ Base: .1s
    ~600k eternities:.08s`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};