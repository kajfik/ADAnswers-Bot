"use strict";

const { upgrades, UpgradeEmbedGetters } = require("../../utils/databases/upgrades");
const { ApplicationCommand } = require("./ApplicationCommand");

class UpgradeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    const argInfo = this.getOptions(interaction);

    if (argInfo === undefined) {
      interaction.reply("You must specify an upgrade to view information about.");
      return;
    }

    const upgrade = upgrades[argInfo.name][argInfo.value];
    const user = interaction.member === null ? interaction.user : interaction.member.user;
    const isHelper = this.hasHelperRole(interaction);
    const embedGetter = UpgradeEmbedGetters[argInfo.name];

    const embed = embedGetter(upgrade)
      .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });

    interaction.reply({ embeds: [embed], ephemeral: !isHelper });
  }

  getOptions(interaction) {
    return interaction.options._hoistedOptions[0];
  }
}

module.exports = { UpgradeApplicationCommand };