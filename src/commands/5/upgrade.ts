import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder, User } from "discord.js";
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

export const upgrade: Command = {
  name: "upgrade",
  description: "Args: `infinity`, `break`, `eternity`, `dilation`. Explains what the upgrades are",
  type: ApplicationCommandType.ChatInput,
  options: [
    new SlashCommandSubcommandBuilder()
      .setName("infinity")
      .setDescription("Explains what a infinity upgrade is")
      .addStringOption(option =>
        option.setName("upgrade")
          .setRequired(true)
          .setDescription("The upgrade you want to know about")
          .setChoices(...getChoices("infinity"))
      ).toJSON(),
    new SlashCommandSubcommandBuilder()
      .setName("break")
      .setDescription("Explains what a break upgrade is")
      .addStringOption(option =>
        option.setName("upgrade")
          .setRequired(true)
          .setDescription("The upgrade you want to know about")
          .setChoices(...getChoices("break"))
      ).toJSON(),
    new SlashCommandSubcommandBuilder()
      .setName("eternity")
      .setDescription("Explains what a eternity upgrade is")
      .addStringOption(option =>
        option.setName("upgrade")
          .setRequired(true)
          .setDescription("The upgrade you want to know about")
          .setChoices(...getChoices("eternity"))
      ).toJSON(),
    new SlashCommandSubcommandBuilder()
      .setName("dilation")
      .setDescription("Explains what a dilation upgrade is")
      .addStringOption(option =>
        option.setName("upgrade")
          .setRequired(true)
          .setDescription("The upgrade you want to know about")
          .setChoices(...getChoices("dilation"))
      ).toJSON(),
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