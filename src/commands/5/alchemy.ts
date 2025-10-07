import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, User, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { StringIndexedStringObjectType } from "../../utils/types";
import { alchemyResources } from "../../utils/databases/alchemy";
import { isHelper } from "../../functions/Misc";
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

const alchemyInfoCommand: StringIndexedStringObjectType = {
  // eslint-disable-next-line max-len
  "unlock": "Glyph Alchemy is a mechanic unlocked by reaching Effarig level 2 in Ra. This unlocks the ability for the player to *refine* Glyphs, instead of sacrificing Glyphs. Visit the Sacrifice Type options in the Glyph tab to alter your filter's behaviour with incoming Glyphs. The unlock also unlocks a new subtab in the Reality tab, which you can visit for more information.",
  // eslint-disable-next-line max-len
  "refinement": "The 6 basic Alchemic Resources (Power, Infinity, Replication, Time, Dilation, Effarig) are obtained by refining those Glyphs. The amount of those resources gained per Glyph is based on the cube of the Glyph's level, scaled so that level 10000 Glyphs correspond to 10000 Alchemy Resources (formula: `(level ^ 3) / 1e8`). The rarity of a given Glyph also contributes to the amount of resources gained per Glyph; a 50% rarity glyph only gives half of the resources an 100% rarity Glyph would. However, a single Glyph only gives 5% of this value when refined. The Alchemy Resource `Decoherence` gives a percentage of a refined Glyph's value to all other basic Alchemy Resources.",
  // eslint-disable-next-line max-len
  "cap": `There is a cap for all resources which is based on the highest refinement value of all the Glyphs that you have refined. If the highest level Time Glyph you have ever refined is level 8000, you can never have more than 5120 Time Alchemy Resource until you refine a better Glyph.
The cap for compound resources is equal to the lowest cap amongst all of its reagents; for example, if your Power cap was 5000, but your Infinity cap was 10000, you would only be able to get 5000 Dimensionality.`,
  // eslint-disable-next-line max-len
  "reactions": "Alchemy Resources can be combined together to create new, more powerful resources, which are unlocked at certain Effarig levels. You can use the `/alchemy resource` command to learn more about a specific resource, its unlock, and its reagents. Reactions occur once per Reality, and only occur if the current amount of all reagents is greater than the current amount of the produced resource. The Alchemy Resource `Synergism` increases the yield of these reactions from the base level of 30%. To activate a reaction, you can click the circle corresponding to the reaction's product. If a reaction can take place, moving lines will be shown from all reagents leading to the product; if it is a solid line, the reaction can't proceed due to a lack of reagents."
};

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
    },
    {
      name: "info",
      description: "what information about alchemy do you want to know?",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "info",
          required: true,
          description: "The information you want to know",
          type: ApplicationCommandOptionType.String,
          choices: [
            { name: "unlock", value: "unlock" },
            { name: "refinement", value: "refinement" },
            { name: "cap", value: "cap" },
            { name: "reactions", value: "reactions" }
          ]
        }
      ]
    },
    {
      name: "refinement",
      description: "Find the amount of resources to a corresponding Glyph level and rarity.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "level",
          required: true,
          description: "The level of the refined Glyph.",
          type: ApplicationCommandOptionType.Integer,
          /* eslint-disable camelcase */
          min_value: 1,
          max_value: 99999,
        },
        {
          name: "rarity",
          required: true,
          description: "The rarity of the refined Glyph as a decimal.",
          type: ApplicationCommandOptionType.Number,
          min_value: 0,
          max_value: 1
          /* eslint-enable camelcase */
        }
      ]
    }
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
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

    if (subcommand === "info") {
      const info = interaction.options.getString("info") as string;

      const content = alchemyInfoCommand[info];

      await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      return;
    }

    if (subcommand === "refinement") {
      const level = interaction.options.getInteger("level", true);
      const rarity = interaction.options.getNumber("rarity", true);

      const gainedResources = (Math.pow(level, 3) / 1e8) * rarity;

      const content = `Upon refining this Glyph (GL${level}, rarity ${rarity * 100}%), you would gain ${Math.floor(gainedResources * 0.05)} of that resource.`;

      await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });

    }
  }
};