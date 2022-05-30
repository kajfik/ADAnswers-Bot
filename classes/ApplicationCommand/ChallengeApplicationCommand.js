"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");

class ChallengeApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    try {
      const arg = this.type === "shorthand" ? undefined : interaction.options.getString("challenge");
      const embed = this.getArgMessage(arg);
      const user = interaction.member === null ? interaction.user : interaction.member.user;
      embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.avatarURL() });
      const isHelper = this.hasHelperRole(interaction);

      if (this.type !== "shorthand" && this.acceptableArgs.includes(arg)) interaction.reply({ embeds: [embed], ephemeral: !isHelper });
      else interaction.reply({ embeds: [embed], ephemeral: !isHelper });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
  ChallengeApplicationCommand,
};