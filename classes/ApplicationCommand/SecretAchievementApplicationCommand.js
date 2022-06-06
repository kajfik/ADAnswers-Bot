"use strict";

const { MessageAttachment } = require("discord.js");
const { secretAchievements, SecretAchievement } = require("../../utils/databases/secretAchievements");
const { ApplicationCommand } = require("./ApplicationCommand");

class SecretAchievementApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    const arg = [interaction.options.getInteger("achievement")];
    const user = interaction.member === null ? interaction.user : interaction.member.user;
    const isHelper = this.hasHelperRole(interaction);

    if (!this.acceptableArgs.includes(`${arg[0]}`)) {
      interaction.reply({ content: "That is not an achievement!", ephemeral: true });
      return;
    }

    const achievementInfo = secretAchievements[`${arg[0]}`];
    const picture = new MessageAttachment(`images/achievements/secret/S${achievementInfo.id}.png`);
    const embed = SecretAchievement(achievementInfo)
      .setThumbnail(`attachment://S${achievementInfo.id}.png`)
      .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });

    interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper });
  }
}

module.exports = { SecretAchievementApplicationCommand };