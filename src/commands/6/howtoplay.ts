import { ApplicationCommandSubCommandData, BaseCommandInteraction } from "discord.js";
import { ApplicationCommandOptionTypes } from "discord.js/typings/enums";
import { Command } from "../../command";
import { h2p } from "../../utils/databases/h2p";
import { isHelper } from "../../functions/Misc";

function htpChoices(which: string): ApplicationCommandSubCommandData[] {
  const choices = [];
  for (const thing in h2p[which]) {
    choices.push({
      name: thing,
      description: thing,
      type: ApplicationCommandOptionTypes.SUB_COMMAND as ApplicationCommandOptionTypes.SUB_COMMAND,
    });
  }
  return choices;
}

export const howtoplay: Command = {
  name: "howtoplay",
  description: "sends the bowtoplay from the mobile version of the game",
  type: "CHAT_INPUT",
  options: [
    {
      name: "faq",
      description: "pages from the faq",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("faq")
    },
    {
      name: "tickspeed",
      description: "Tickspeed howtoplay",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("tickspeed")
    },
    {
      name: "dimensions",
      description: "Dimensions howtoplay",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("dimensions")
    },
    {
      name: "softresets",
      description: "soft reset how to play pages, f.e. dimboost/galaxy pages",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("softresets")
    },
    {
      name: "achievements",
      description: "describes achievements",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("achievements")
    },
    {
      name: "sacrifice",
      description: "explains sacrifice",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("sacrifice")
    },
    {
      name: "infinity",
      description: "explains infinity",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("infinity")
    },
    {
      name: "challenges",
      description: "explains the three challenge types",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("challenges")
    },
    {
      name: "autobuyers",
      description: "explains autobuyers",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("autobuyers")
    },
    {
      name: "breakinfinity",
      description: "explains breakinfinity",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("breakinfinity")
    },
    {
      name: "replicanti",
      description: "explains replicanti",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("replicanti")
    },
    {
      name: "eternity",
      description: "explains eternity",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("eternity")
    },
    {
      name: "timestudies",
      description: "explains time studies",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("timestudies")
    },
    {
      name: "dilation",
      description: "explains time dilation",
      type: "SUB_COMMAND_GROUP",
      options: htpChoices("dilation")
    },
  ],
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const group: string = interaction.options.getSubcommandGroup(true);
    const info: string = interaction.options.getSubcommand(true);

    const entry: string = h2p[group][info];

    await interaction.reply({ content: entry, ephemeral: !isHelper(interaction) });
  }
};