/* eslint-disable no-console */
"use strict";

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { ApplicationCommand } = require("./ApplicationCommand");
const { ids } = require("../../utils/config.json");
const { Message } = require("../FunctionClasses/Message");
const { Log } = require("../FunctionClasses/Log");
const hr = ids.helperRole;

class HelperApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    if (!this.getCheck(interaction.channelId, interaction) || interaction.channel.type === "DM") {
      interaction.reply({ content: new Message("noWorky", { worky: this.check }).getMessage(), ephemeral: true });
      return;
    }
    if (!ApplicationCommand.isEligibleForHelperRole(interaction)) {
      // eslint-disable-next-line max-len
      interaction.reply({ content: `Hey! I'm glad you want to get the Helper role, but in order to do so, you need to have the "Infinity Dimension" role or greater. Those people without that role or higher are grandfathered in and retain their helper role.`, ephemeral: true });
      return;
    }
    const a = this.hasHelperRole(interaction);
    const field = a
      ? { name: "Removing the helper role will...", value: `prevent you from using the bot in Progression Discussion. You can ${a ? `add` : `remove`} this role at any time by doing /helper again.` }
      // eslint-disable-next-line max-len
      : { name: "Adding the helper role will...", value: `allow you to use the bot in Progression Discussion. To become a Helper, understand that you agree to keep all *personal* use of the bot to <#351479640755404820>, and only use the bot outside of there to assist others on their journey through Antimatter Dimensions. **You are not free of consequences.** This is effectively a contract. Breaking it can result in some form of punishment. Moderators and admins are aware at all times of who is and who isn't a helper.\nYou can ${a ? `add` : `remove`} this role at any time by doing /helper again.` };
    const embed = new MessageEmbed()
      .setColor("DARK_AQUA")
      .setTitle("ADAnswersBot Helper")
      .setDescription(a ? `Are you sure you want to remove the helper role?` : `Are you sure you want to add the helper role?`)
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .addFields(field)
      .setTimestamp();

    const buttonRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle(a ? "DANGER" : "SUCCESS")
          .setLabel(a ? "Remove" : "Add")
          .setCustomId(`button_${a ? "stop" : "agree"}`),
      );

    const filter = i => i.customId.startsWith("button");
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    interaction.reply({ embeds: [embed], components: [buttonRow], ephemeral: true })
      .then(() => {
        collector.on("collect", async i => {
          if (i.customId.startsWith("button")) {
            await interaction.guild.members.fetch(interaction.user.id).then(async member => {
              if (a) member.roles.remove(hr);
              else member.roles.add(hr);
              // eslint-disable-next-line max-len
              await i.update({ content: `You have ${a ? `removed` : `been given`} the Helper role! You can safely remove this message. If you wish to ${a ? `add` : `remove`} this role, do /helper again.`, embeds: [], components: [], ephemeral: true });
            });
          }
        });
      }).catch(e => Log.error(`Unexpected error in helper command. ${e}`));
    collector.on("end", collected => {
      if (collected.size === 1) Log.important(`${collected.first().user.username} ${collected.first().customId === "button_agree" ? `added` : `took away`} the helper role to/from themselves at ${Date()}`);
    });
  }
}

module.exports = { HelperApplicationCommand };