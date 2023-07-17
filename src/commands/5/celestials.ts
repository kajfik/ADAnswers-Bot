import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { raCelestialSubcommand } from "./celestials/ra";
import { teresaCelestialSubcommand } from "./celestials/teresa";
import { vCelestialSubcommand } from "./celestials/v";

export const celestials: Command = {
  name: "celestials",
  description: "Some various celestial information",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "teresa",
      description: "Learn a bit about Teresa's shenanigans",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "basic",
          description: "Gives some basic information about Teresa",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "reality",
          description: "Gives some basic information about Teresa's Reality",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "perkshop",
          description: "Gives some basic information about Teresa's Perk Shop",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "unlocks",
          description: "Gives some basic information about Teresa's unlocks",
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    },
    {
      name: "v",
      description: "Get some information about V's shenanigans",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "basic",
          description: "Gives some basic information about V",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "reality",
          description: "Gives some basic information about V's Reality",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "achievements",
          description: "Check out the achievements in V",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "achievement",
              description: "Choose a V-Achievement",
              required: true,
              type: ApplicationCommandOptionType.String,
              choices: ["glyphknight", "antistellar", "se7en", "youngboy", "eternalsunshine", "matterception", "requiem", "postdestination", "shutterglyph"].map(achievement => ({ name: achievement, value: achievement }))
            }
          ]
        },
        {
          name: "unlocks",
          description: "Check out the V Unlocks",
          type: ApplicationCommandOptionType.Subcommand
        }
      ]
    },
    {
      name: "ra",
      description: "Get some information about Ra's shenanigans",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "basic",
          description: "Gives some basic information about Ra",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "reality",
          description: "Gives some basic information about Ra's Reality",
          type: ApplicationCommandOptionType.Subcommand
        },
        {
          name: "memories",
          description: "Pick a celestial and investigate its memories",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "celestial",
              description: "The celestial of your choice",
              required: true,
              type: ApplicationCommandOptionType.String,
              choices: ["teresa", "effarig", "nameless", "v"].map(celestial => ({ name: celestial, value: celestial }))
            }
          ]
        }
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const celestialRequested = interaction.options.getSubcommandGroup();
    switch (celestialRequested) {
      case "teresa":
        await teresaCelestialSubcommand(interaction);
        break;
      case "v":
        await vCelestialSubcommand(interaction);
        break;
      case "ra":
        await raCelestialSubcommand(interaction);
        break;
    }
  }
};