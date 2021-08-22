"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");

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
    const args = [this.getArgs(interaction)];
    if (args[0] === null) {
      interaction.reply({ content: this.sent[0], ephemeral: !this.hasHelperRole(interaction) });
      return;
    } 
    if (args.length !== 0 && !this.acceptableArgs.includes(args[0].toLowerCase())) {
      interaction.reply("This achievement is either useless or can be easily achieved.");
    } else this.regularCommand(interaction, args, interaction.channel.id);
  }
}

module.exports = { AchievementApplicationCommand };