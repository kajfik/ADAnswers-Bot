import { ApplicationCommandOptionData, ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { UpgradeEmbedGetters, upgrades } from "../../utils/databases/upgrades";
import { Command } from "../../command";
import { UpgradeInfo } from "../../utils/types";
import { isHelper } from "../../functions/Misc";

function getChoices(typeOfUpgrade: string): { name: string, value: string, type: any }[] {
  const choices = [];
  const upgradesToIterate = upgrades[typeOfUpgrade as keyof typeof upgrades];
  for (const upgrade in upgradesToIterate) {
    const upgradeObject: UpgradeInfo = upgradesToIterate[upgrade as keyof typeof upgradesToIterate];
    choices.push({
      name: upgradeObject.id,
      value: upgradeObject.id,
      type: ApplicationCommandOptionType.String
    });
  }
  return choices;
}

const createOption = (name: string): ApplicationCommandOptionData => ({
  name,
  description: `explains what a ${name} upgrade is and does`,
  type: ApplicationCommandOptionType.Subcommand,
  options: [
    {
      name: "upgrade",
      description: "your desired upgrade",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: getChoices(name)
    },
  ]
});

export const upgrade: Command = {
  name: "upgrade",
  description: "Args: `infinity`, `break`, `eternity`, `dilation`, `reality`. Explains what the upgrades are",
  type: ApplicationCommandType.ChatInput,
  options: [
    // Leaving infinity as a special case because I have no clue man
    {
      name: "infinity",
      description: "explains what an infinity upgrade is",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "upgrade",
          description: "your desired upgrade",
          required: true,
          type: ApplicationCommandOptionType.String,
          choices: getChoices("infinity")
        },
        {
          name: "charged",
          description: "is the infinity upgrade charged?",
          required: false,
          type: ApplicationCommandOptionType.Boolean
        }
      ]
    },
    createOption("break"),
    createOption("eternity"),
    createOption("dilation"),
    createOption("reality"),
    createOption("imaginary"),
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    if (interaction.options.data.length > 1) {
      await interaction.reply({ content: "You can only use one upgrade type at a time." });
      return;
    }

    if (interaction.options.data.length === 0) {
      await interaction.reply({ content: "You must specify an upgrade type." });
      return;
    }

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    const type: string = interaction.options.getSubcommand();
    const upgradeName: string = interaction.options.getString("upgrade") as string;
    const charged: boolean = type === "infinity" && !upgradeName.startsWith("skipReset")
      ? interaction.options.getBoolean("charged") as boolean
      : false;

    const picture = new AttachmentBuilder(`src/images/upgrades/${charged ? "charged" : type}.png`);

    const upgradeRequested = upgrades[type][upgradeName];

    const embed: EmbedBuilder = UpgradeEmbedGetters[charged ? "charged" : type](upgradeRequested);
    embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
      .setThumbnail(`attachment://${charged ? "charged" : type}.png`);

    if (upgradeRequested.hasGraph) {
      embed.addFields({ name: "Effect formula graph", value: "** **" });
      embed.setImage(upgradeRequested.graph as string);
    }

    await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
  }
};