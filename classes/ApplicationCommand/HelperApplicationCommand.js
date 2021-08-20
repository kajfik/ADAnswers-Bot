"use strict";

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { ApplicationCommand } = require("./ApplicationCommand");
const { ids } = require("../../utils/config.json");
const hr = ids.helperRole;

class HelperApplicationCommand extends ApplicationCommand {
  hasHelperRole(interaction) {
    return interaction.member._roles.includes(hr);
  }

  execute(interaction) {
    const a = this.hasHelperRole(interaction);
    const field = a
      ? { name: "Removing the helper role will...", value: `prevent you from using the bot in Progression Discussion. You can ${a ? `add` : `remove`} this role at any time by doing /helper again.` }
      // eslint-disable-next-line max-len
      : { name: "Adding the helper role will...", value: `allow you to use the bot in Progression Discussion. To become a Helper, understand that you agree to keep all *personal* use of the bot to <#351479640755404820>, and only use the bot outside of there to assist others on their journey through Antimatter Dimensions. **You are not free of consequences.**\nYou can ${a ? `add` : `remove`} this role at any time by doing /helper again.` };
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
          .setCustomId("agree"),
      );

    const filter = i => i.customId.startsWith("agree");
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

    interaction.reply({ embeds: [embed], components: [buttonRow], ephemeral: true })
      .then(() => {
        collector.on("collect", async i => {
          if (i.customId === "agree") {
            await interaction.guild.members.fetch(interaction.user.id).then(async member => {
              if (a) member.roles.remove(hr);
              else member.roles.add(hr);
              // eslint-disable-next-line max-len
              await i.update({ content: `You have ${a ? `removed` : `been given`} the Helper role! You can safely remove this message. If you wish to ${a ? `add` : `remove`} this role, do /helper again.`, embeds: [], components: [], ephemeral: true });
            });
          }
        });
      });
  }
}

module.exports = { HelperApplicationCommand };