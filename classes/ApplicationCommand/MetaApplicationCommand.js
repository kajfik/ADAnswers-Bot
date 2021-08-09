"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { MessageEmbed } = require("discord.js");
const config = require("../../utils/config.json");
const functions = require("../../utils/functions/functions");
const commands = require("../../utils/commands");
const { footerMessages } = require("../../utils/messages");

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
  async manageBottomAndTopCommands(Tags) {
    const tagsMatchedWithTimesUsed = {};
    const tagList = await Tags.findAll({ attributes: ["timesUsed", "name"] });
    tagList.map(t => Object.assign(tagsMatchedWithTimesUsed, { [t.name]: t.timesUsed }));
    const sorted = Object.values(tagsMatchedWithTimesUsed).sort((a, b) => b - a);
    const requests = sorted[0];
    const successes = sorted[1];
    sorted.shift();
    sorted.shift();
    let top5commands = [];
    let bottom5commands = [];
    for (let i = 0; i < 5; i++) {
      const b = Object.entries(tagsMatchedWithTimesUsed).find(a => a[1] === sorted[0]);
      top5commands.push(b);
      delete tagsMatchedWithTimesUsed[b];
      sorted.shift();
    }
    for (let i = 0; i < 5; i++) {
      const b = Object.entries(tagsMatchedWithTimesUsed).find(a => a[1] === sorted[sorted.length - 1]);
      bottom5commands.push(b);
      delete tagsMatchedWithTimesUsed[b[0]];
      sorted.pop();
    }
    bottom5commands = bottom5commands.map(a => `${a[0]}: ${a[1]}`).reverse().join("\n");
    top5commands = top5commands.map(a => `${a[0]}: ${a[1]}`).join("\n");
    return {
      requests,
      successes,
      bottom5commands,
      top5commands,
    };
  }

  /**
   * Executes the command.
   * @param {Object} interaction - The interaction object used for the command that contains all useful information
   */
  // eslint-disable-next-line no-unused-vars
  async execute(interaction, _id, Tags) {
    const tagStuff = await this.manageBottomAndTopCommands(Tags);
    const embed = new MessageEmbed()
      .setColor("BLURPLE")
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
        { name: "Total requests/successses", value: `Requests: ${tagStuff.requests}\nSuccesses: ${tagStuff.successes}`, inline: true },
        { name: "Top 5 used commands", value: `${tagStuff.top5commands}`, inline: true },
        { name: "Bottom 5 used commands", value: `${tagStuff.bottom5commands}`, inline: true },
      )
      .setTimestamp()
      .setFooter(footerMessages.random(), `${interaction.client.user.displayAvatarURL()}`);

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
}

module.exports = { MetaApplicationCommand };