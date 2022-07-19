import { ApplicationCommandOptionType, ApplicationCommandSubCommandData, ApplicationCommandType, CommandInteraction } from "discord.js";
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

export const howtoplay: Command = {
  name: "howtoplay",
  description: "sends the bowtoplay from the mobile version of the game",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "faq",
      description: "pages from the faq",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("faq")
    },
    {
      name: "tickspeed",
      description: "Tickspeed howtoplay",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("tickspeed")
    },
    {
      name: "dimensions",
      description: "Dimensions howtoplay",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("dimensions")
    },
    {
      name: "softresets",
      description: "soft reset how to play pages, f.e. dimboost/galaxy pages",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("softresets")
    },
    {
      name: "achievements",
      description: "describes achievements",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("achievements")
    },
    {
      name: "sacrifice",
      description: "explains sacrifice",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("sacrifice")
    },
    {
      name: "infinity",
      description: "explains infinity",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("infinity")
    },
    {
      name: "challenges",
      description: "explains the three challenge types",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("challenges")
    },
    {
      name: "autobuyers",
      description: "explains autobuyers",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("autobuyers")
    },
    {
      name: "breakinfinity",
      description: "explains breakinfinity",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("breakinfinity")
    },
    {
      name: "replicanti",
      description: "explains replicanti",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("replicanti")
    },
    {
      name: "eternity",
      description: "explains eternity",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("eternity")
    },
    {
      name: "timestudies",
      description: "explains time studies",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("timestudies")
    },
    {
      name: "dilation",
      description: "explains time dilation",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: htpChoices("dilation")
    },
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const group: string = interaction.options.getSubcommandGroup(true);
    const info: string = interaction.options.getSubcommand(true);

    const entry: string = h2p[group][info];

    await interaction.reply({ content: entry, ephemeral: !isHelper(interaction) });
  }
};