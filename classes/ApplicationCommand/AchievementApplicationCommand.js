"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");

class AchievementApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    const args = [this.getArgs(interaction)];
    if (args[0] === null) {
      interaction.reply({ content: this.sent[0], ephemeral: true });
      return;
    } 
    if (args.length !== 0 && !this.acceptableArgs.includes(args[0].toLowerCase())) {
      interaction.reply("This achievement is either useless or can be easily achieved.");
    } else this.regularCommand(interaction, args, interaction.channel.id);
  }
}

module.exports = { AchievementApplicationCommand };