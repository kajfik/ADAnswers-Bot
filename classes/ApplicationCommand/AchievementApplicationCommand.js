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
    if (args.length !== 0 && !this.acceptableArgs.includes(args[0])) {
      interaction.reply("This achievement is either useless or can be easily achieved.");
    } else this.regularCommand(interaction, args, interaction.channel.id);
  }

  regularCommand(interaction, args, id) {
    const sent = this.getArgMessage(args[0]);
    const check = this.getCheck(id, interaction);
    const aaIncludes = this.acceptableArgs.includes(args[0]);

    if (check && aaIncludes) this.send(interaction, sent);
    // eslint-disable-next-line no-negated-condition
    else if (!(args[0] === undefined)) this.send(interaction, new Message("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }).getMessage());
    else this.send(interaction, new Message("shouldNeverAppear").getMessage());
  }
}

module.exports = { AchievementApplicationCommand };