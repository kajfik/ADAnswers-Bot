import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const contributors: Command = {
  name: "contributors",
  description: "sends a list of contributors and what they helped with! this bot would not be possible without them.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
Hellbach: basis for most of the commands, provided much of the information used in this bot,
Kajfik: Code contributions, notably in eternitychallenge.js,
L4R5: EC database,
Ninjatsu: the EC spreadsheet used by many players, provided all of the information in the EC database,
Pez: commands.find() in commands.js,
MrKrutaman: challenge, study, upgrade art`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};