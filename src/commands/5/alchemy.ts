import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, User } from "discord.js";
import { Command } from "../../command";
import { alchemyResources } from "../../utils/databases/alchemy";
import { resourceAlchemySubcommand } from "./alchemy/resource";

function getChoices(): { name: string, value: string, type: any }[] {
  const choices: any[] = [];
  for (const resource in alchemyResources) {
    choices.push({
      name: resource,
      value: resource,
      type: ApplicationCommandOptionType.String
    });
  }

  return choices;
}

export const alchemy: Command = {
  name: "alchemy",
  description: "describes glyph alchemy and its effects",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "resource",
      description: "which resource do you want to know more about?",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "resource",
          required: true,
          description: "The resource you want to know more about",
          type: ApplicationCommandOptionType.String,
          choices: getChoices()
        }
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    if (interaction.options.data.length === 0) {
      await interaction.reply({ content: "You must use at least one subcommand, genius.", ephemeral: true });
    }

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    const subcommand: string = interaction.options.getSubcommand();

    if (subcommand === "resource") {
      // This code is extremely long and messy, so we put it somewhere else to not taint this file.
      resourceAlchemySubcommand(interaction, user);
      return;
    }
  }
};