import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { UpgradeEmbedGetters, upgrades } from "../../utils/databases/upgrades";
import { Command } from "../../command";
import { UpgradeInfo } from "../../utils/types";
import { isHelper } from "../../functions/Misc";

function getChoices(typeOfUpgrade: string) {
  const choices = [];
  const upgradesToIterate = upgrades[typeOfUpgrade as keyof typeof upgrades];
  for (const upgrade in upgradesToIterate) {
    const upgradeObject: UpgradeInfo = upgradesToIterate[upgrade as keyof typeof upgradesToIterate];
    choices.push({
      name: upgradeObject.id,
      value: upgradeObject.id,
    });
  }
  return choices;
}

export const upgrade: Command = {
  name: "upgrade",
  description: "Args: `infinity`, `break`, `eternity`, `dilation`. Explains what the upgrades are",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "infinity",
      description: "explains what an infinity upgrade is",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: getChoices("infinity"),
    },
    {
      name: "break",
      description: "explains what a break upgrade is",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: getChoices("break"),
    },
    {
      name: "eternity",
      description: "explains what an eternity upgrade is",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: getChoices("eternity"),
    },
    {
      name: "dilation",
      description: "explains what a dilation upgrade is",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: getChoices("dilation"),
    }
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

    const type: string = interaction.options.data[0].name;
    const upgradeName: string = interaction.options.data[0].value as string;

    const picture = new AttachmentBuilder(`src/images/upgrades/${type}.png`);

    const upgradeRequested = upgrades[type][upgradeName];
    const embed: EmbedBuilder = UpgradeEmbedGetters[type](upgradeRequested);
    embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
      .setThumbnail(`attachment://${type}.png`);

    if (upgradeRequested.hasGraph) {
      embed.addFields({ name: "Effect formula graph", value: "** **" });
      embed.setImage(upgradeRequested.graph as string);
    }

    await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
  }
};