"use strict";

const { upgrades, UpgradeEmbedGetters } = require("../../utils/databases/upgrades");
const { ApplicationCommand } = require("./ApplicationCommand");
const { MessageAttachment } = require("discord.js");

class UpgradeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    const argInfo = this.getOptions(interaction);

    if (argInfo === undefined) {
      interaction.reply({ content: "You must specify an upgrade to view information about.", ephemeral: true });
      return;
    }

    const upgrade = upgrades[argInfo.name][argInfo.value];
    const user = interaction.member === null ? interaction.user : interaction.member.user;
    const isHelper = this.hasHelperRole(interaction);
    const embedGetter = UpgradeEmbedGetters[argInfo.name];
    const picture = new MessageAttachment(`images/upgrades/${argInfo.name}.png`);

    const embed = embedGetter(upgrade)
      .setThumbnail(`attachment://${argInfo.name}.png`)
      .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });
    if (upgrade.hasGraph) {
      embed.addFields({ name: "Effect formula graph", value: "** **" });
      embed.setImage(upgrade.graph);
    }

    interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper });
  }

  getOptions(interaction) {
    return interaction.options._hoistedOptions[0];
  }
}

module.exports = { UpgradeApplicationCommand };