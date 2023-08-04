import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const dilationtrees: Command = {
  name: "dilationtrees",
  description: "Args: `first`, `after3paths`. First = before dilation 3 paths upgrade, after3paths = beyond",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "when",
      description: "At what point in the game are you? first or after3paths?",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "first", value: "first" },
        { name: "after3paths", value: "after3paths" }
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const when = interaction.options.getString("when");

    const content = when === "first"
      ? `
Active: \`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,121,131,141,151,161,162,171,181,192,201,72,82,92,102,191,211,212,193,213,214,222,223,232,225,233,228|0\`
Idle: \`11,21,22,31,32,33,41,42,51,61,62,73,83,93,103,111,123,133,143,151,161,162,171,181,192,201,72,82,92,102,191,211,212,193,213,214,222,223,232,225,233,228|0\`
Note: Active will fail for the very first dilation on mobile (and sometimes on web as well).`
      : "`11,21,22,31,32,33,41,42,51,61,62,72,71,73,82,81,83,92,91,93,102,103,101,111,121,131,141,151,161,162,171,181,192,191,193,212,211,213,214,222,223,232,225,233,228|0`";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};