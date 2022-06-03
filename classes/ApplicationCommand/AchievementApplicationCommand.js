"use strict";

const { MessageAttachment } = require("discord.js");
const { ApplicationCommand } = require("./ApplicationCommand");
const { Achievement, achievements } = require("../../utils/achievements");

/**
 * @class AchievementApplicationCommand
 * @extends ApplicationCommand
 * @classdesc Command for executing achievements.js.
 */
class AchievementApplicationCommand extends ApplicationCommand {
  /**
   * Executes the command.
   * @param {Object} interaction - The interaction object used for the command that contains all useful information
   */
  execute(interaction) {
    const args = [this.getArgs(interaction), interaction.options.getInteger("other")];

    if (args[0] !== null && args[1] !== null) {
      interaction.reply({ content: "You can only use one argument at a time.", ephemeral: true });
      return;
    }

    if (args[0] === null && args[1] !== null) {
      args[0] = args[1];
    }

    if (args[0] === null && args[1] === null) {
      interaction.reply({ content: this.sent[0], ephemeral: !this.hasHelperRole(interaction) });
      return;
    }

    if (!this.acceptableArgs.includes(`${args[0]}`)) {
      interaction.reply({ content: "That is not an achievement!", ephemeral: true });
      return;
    }

    this.regularCommand(interaction, args);
  }

  regularCommand(interaction, args) {
    let achievementInfo;

    if (typeof args[0] === "string") {
      achievementInfo = achievements[achievements.findAchievement(args[0])];
    } else {
      achievementInfo = achievements[achievements.findAchievementById(args[0])];
    }

    if (achievementInfo === undefined) {
      interaction.reply({ content: "That achievement does not exist.", ephemeral: true });
      return;
    }

    const user = interaction.member === null ? interaction.user : interaction.member.user;
    const isHelper = this.hasHelperRole(interaction);

    const picture = new MessageAttachment(`images/achievements/${achievementInfo.id}.png`);
    const embed = Achievement(achievementInfo)
      .setThumbnail(`attachment://${achievementInfo.id}.png`)
      .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });

    interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper });
  }
}

module.exports = { AchievementApplicationCommand };