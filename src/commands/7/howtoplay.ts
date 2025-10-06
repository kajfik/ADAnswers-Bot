import { ApplicationCommandOptionType, ApplicationCommandSubCommandData, ApplicationCommandSubGroupData, ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { h2p } from "../../utils/databases/h2p";
import { isHelper } from "../../functions/Misc";

function htpChoices(which: string): ApplicationCommandSubCommandData[] {
  const choices = [];
  for (const thing in h2p[which]) {
    choices.push({
      name: thing,
      description: thing,
      type: ApplicationCommandOptionType.Subcommand as ApplicationCommandOptionType.Subcommand
    });
  }
  return choices;
}

function getOptions(): ApplicationCommandSubGroupData[] {
  const options: ApplicationCommandSubGroupData[] = [];
  for (const thing in h2p) {
    options.push({
      name: thing,
      description: thing,
      options: htpChoices(thing),
      type: ApplicationCommandOptionType.SubcommandGroup
    });
  }
  return options;
}

export const howtoplay: Command = {
  name: "howtoplay",
  description: "sends the bowtoplay from the mobile version of the game",
  type: ApplicationCommandType.ChatInput,
  options: getOptions(),
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const group: string = interaction.options.getSubcommandGroup(true);
    const info: string = interaction.options.getSubcommand(true);

    const entry: string = h2p[group][info];

    await interaction.reply({ content: entry, ephemeral: !isHelper(interaction) });
  }
};