"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { MessageEmbed } = require("discord.js");
const config = require("../../utils/config.json");
const functions = require("../../utils/functions/functions");
const commands = require("../../utils/commands");
const footerMessages = require("../../utils/footerMessages");

const NOW = new Date();
const metaMessageObject = {
  "lastrestart": `The last restart was on <t:${Date.parse(NOW) / 1000}>.`,
  "suggest": `Submit an issue on [GitHub](https://github.com/earthernsence/ADAnswers-Bot/issues) to suggest more commands, or to report a bug with the bot!`,
  "invite": `If, for whatever reason, you wish to invite me to your server, go to [this link](https://discord.com/oauth2/authorize?client_id=830197123378053172&permissions=2147560512&scope=applications.commands%20bot).`,
  // eslint-disable-next-line max-len
  "contributing": `If you are interested in contributing to the bot, check out both information files at [this readme](https://github.com/earthernsence/ADAnswers-Bot#readme) and [this readme](https://github.com/earthernsence/ADAnswers-Bot/tree/main/commands#readme)`
};

/**
 * @class MetaApplicationCommand
 * @extends {ApplicationCommand}
 * @classdesc Class for executing meta.js.
 */
class MetaApplicationCommand extends ApplicationCommand {
  /**
   * Executes the command.
   * @param {Object} interaction - The interaction object used for the command that contains all useful information
   */
  execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("GREYPLE")
      .setTitle("Bot Information")
      .setDescription(`Internal bot information`)
      .setThumbnail(`${interaction.client.user.displayAvatarURL()}`)
      .addFields(
        { name: "Bot version", value: config.version, inline: true },
        { name: "Last restart", value: metaMessageObject.lastrestart, inline: true },
        { name: "Uptime", value: `The bot has been up for ${functions.misc.convertMillisecondsToDigitalClock(interaction.client.uptime).clock}`, inline: true },
        { name: "Ping", value: `Pong! ${interaction.client.ws.ping}ms`, inline: true },
        { name: "Suggest", value: metaMessageObject.suggest, inline: true },
        { name: "Invite", value: metaMessageObject.invite, inline: true },
        { name: "Contributing", value: metaMessageObject.contributing, inline: true },
        { name: "Total amount of commands", value: `${commands.all.length}`, inline: true },
      )
      .setTimestamp()
      .setFooter(footerMessages.random(), `${interaction.client.user.displayAvatarURL()}`);

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
}

module.exports = { MetaApplicationCommand };