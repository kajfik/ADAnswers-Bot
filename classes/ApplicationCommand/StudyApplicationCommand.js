"use strict";

const { MessageAttachment } = require("discord.js");
const { ApplicationCommand } = require("./ApplicationCommand");
const { studies } = require("../../utils/databases/studies");

class StudyApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    const arg = `${interaction.options.getInteger("study")}`;

    if (!this.acceptableArgs.includes(arg)) {
      interaction.reply({ content: "That is not a time study.", ephemeral: true });
      return;
    }

    const isHelper = this.hasHelperRole(interaction);
    const picture = new MessageAttachment(`images/studies/${studies[arg].type}.png`);
    const user = interaction.member === null ? interaction.user : interaction.member.user;
    const embed = this.getArgMessage(arg);

    embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() })
      .setThumbnail(`attachment://${studies[arg].type}.png`);
    if (studies[arg].hasGraph) {
      embed.addFields({ name: "Effect formula graph", value: "** **" });
      embed.setImage(studies[arg].graph);
    }

    interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper });
  }
}

module.exports = { StudyApplicationCommand };