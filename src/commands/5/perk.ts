import { ApplicationCommandOptionData, ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { PerkEmbedGetters, perks } from "../../utils/databases/perks";
import { PerkInfo, StringIndexedStringObjectType } from "../../utils/types";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

const perkInfoCommand: StringIndexedStringObjectType = {
  /* eslint-disable max-len */
  "intro": `Welcome to Perks!

In the Reality Tab, under "Perks", you will find a sprawling tree with a number of nodes, called the "Perk Tree". Each of the nodes is called a "Perk". These Perks provide various Quality-of-life boosts to almost all parts of the game pre-Reality.

To purchase a perk, there are 2 requirements:
    1. You must have at least one "Perk Point". You will get exactly one Perk Point every time you make a new Reality.
    2. You must purchase all the perks that link that perk to the \`START\` perk. Luckily, many perks have multiple routes to reach them. For example, to purchase the perk \`SEP1\`, you can purchase \`START - SAM - SIP1\`, or \`START - SAM - ANR\`, or even loop all the way around starting with \`EU1\`.
    
If you have a Perk Point, then all immediately purchasable Perks will turn white. It is recommended to use all your Perk Points immediately, as they currently do not have any other uses.`,

  "types": `Each perk has a "type", a color, based on what part of the game it is most useful in. These types are:
  
    - Red: Automation
    - Orange: Infinity
    - Yellow: Achievements
    - Light Green: Dilation
    - Dull Green: Antimatter
    - Dark Green: Reality
    - Purple: Eternity
    
This bot groups perks by their type. Make sure to use the correct subcommand/type when searching up a perk.`,

  "strategy": `There is no "one-size-fits-all" strategy for choosing the optimal order for perks. The makers of this bot recommend that you choose whatever perk will minimize the part of the game that you dislike the most.`

  /* eslint-enable max-len */
};

function getChoices(typeOfperk: string): { name: string, value: string, type: any }[] {
  // Alright, screw you TS. Stuff will be in this array!
  const choices: any[] = [];
  const perksToIterate = perks[typeOfperk as keyof typeof perk];
  for (const perk in perksToIterate) {
    const perkObject: PerkInfo = perksToIterate[perk as keyof typeof perksToIterate];
    choices.push({
      name: perkObject.id,
      value: perkObject.id,
      type: ApplicationCommandOptionType.String
    });
  }
  return choices;
}

const createOption = (name: string): ApplicationCommandOptionData => ({
  name,
  description: `Explains what a ${name} perk is`,
  type: ApplicationCommandOptionType.Subcommand,
  options: [
    {
      name: "perk",
      description: "your desired perk",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: getChoices(name)
    }
  ]
});

export const perk: Command = {
  name: "perk",
  description: "Args: `info`, `<perk type>`. Explains what the perks are",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "Provides basic information on perks",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "info",
          required: true,
          description: "The information you wish to know about",
          type: ApplicationCommandOptionType.String,
          choices: [
            { name: "intro", value: "intro" },
            { name: "types", value: "types" },
            { name: "strategy", value: "strategy" }
          ]
        }
      ]
    },
    createOption("achievement"),
    createOption("automation"),
    createOption("antimatter"),
    createOption("infinity"),
    createOption("eternity"),
    createOption("dilation"),
    createOption("reality"),
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    if (interaction.options.data.length > 1) {
      await interaction.reply({ content: "You can only use one perk type at a time." });
      return;
    }

    if (interaction.options.data.length === 0) {
      await interaction.reply({ content: "You must specify a perk type." });
      return;
    }

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    const type: string = interaction.options.getSubcommand();

    if (type === "info") {
      const info: string = interaction.options.getString("info") as string;

      const content: string = perkInfoCommand[info];

      await interaction.reply({ content, ephemeral: !isHelper(interaction) });

    } else {

      const perkName: string = interaction.options.getString("perk") as string;

      const perkRequested = perks[type][perkName];

      const imageName = `${type}${perkRequested.ap ? `_ap` : ``}`;
      const picture = new AttachmentBuilder(`src/images/perks/${imageName}.png`);

      const embed: EmbedBuilder = PerkEmbedGetters[type](perkRequested);
      embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
        .setThumbnail(`attachment://${imageName}.png`);

      await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
    }
  }
};