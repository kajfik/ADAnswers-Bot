"use strict";

const { ApplicationCommand } = require("./ApplicationCommand");
const { MessageEmbed } = require("discord.js");
const { Misc } = require("../FunctionClasses/Misc");
const Global = require("../../utils/constants");

class UserApplicationCommand extends ApplicationCommand {
  async execute(interaction) {
    const user = this.getArgs(interaction);
    const info = await this.getUserInfo(user, interaction);
    const embed = new MessageEmbed()
      .setTitle(`${info.fullPerson}`)
      .setThumbnail(info.avatar)
      // eslint-disable-next-line max-len
      .addField("Bot information", typeof info.tag === "object" ? `${info.fullPerson} has used the bot **${info.tag.dataValues.timesUsed}** ${Misc.pluralise("time", info.tag.dataValues.timesUsed)}*\n\n*: Data collection started on October 7, 2021` : "This user has not used the bot")
      .addField("Nickname", info.nick)
      .addField(`Roles [${info.rolesUnjoined.length === 0 ? "None" : info.rolesUnjoined.length}]`, `${info.rolesUnjoined.length === 0 ? "This user has no roles" : info.roles}`)
      .addField("Joined", info.joined)
      .setTimestamp()
      .setFooter(`${interaction.guild.name}`, interaction.guild.iconURL())
      .setColor("BLURPLE");
    interaction.reply({ embeds: [embed], ephemeral: true });
  }

  async getUserInfo(user, interaction) {
    const u = await interaction.guild.members.resolve(user.id);
    return {
      fullPerson: `${user.username}#${user.discriminator}`,
      rolesUnjoined: u._roles.map(role => `<@&${role}>`),
      roles: u._roles.map(role => `<@&${role}>`).join(", "),
      nick: u.nickname ?? "This user has not set a nickname",
      joined: `<t:${Math.floor(u.joinedTimestamp / 1000)}:F>`,
      avatar: user.avatarURL(),
      tag: await Global.getPersonTag(`${user.username}#${user.discriminator}`) ?? "This user has not used the bot"
    };
  }
  
  getArgs(interaction) {
    return interaction.options.getUser("user");
  }
}

module.exports = { UserApplicationCommand };