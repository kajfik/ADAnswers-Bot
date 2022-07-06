import { BaseCommandInteraction, GuildMember, MessageEmbed, User } from "discord.js";
import { Command } from "../../command";
import { UserInfo } from "../../utils/types";
import { getPersonTag } from "../../functions/database";
import { pluralise } from "../../functions/Misc";

async function getUserInfo(user: User, interaction: BaseCommandInteraction): Promise<UserInfo> {
  const u = await interaction.guild?.members.resolve(user.id) as GuildMember;

  return {
    fullPerson: `${user.username}#${user.discriminator}`,
    rolesUnjoined: u?.roles.cache.map(r => `<@&${r.id}>`),
    roles: u?.roles.cache.map(r => `<@&${r.id}>`).join(", "),
    nick: u?.nickname ?? "This user has not set a nickname",
    joined: `<t:${Math.floor(u.joinedTimestamp as number / 1000)}:F>`,
    avatar: user.displayAvatarURL(),
    tag: await getPersonTag(user.username, user.discriminator),
    async tagInfo() {
      const t = await getPersonTag(user.username, user.discriminator);
      if (t === null) return `This user has not used the bot.`;
      return `${user.username}#${user.discriminator} has used the bot **${t.getDataValue("timesUsed")}** ${pluralise("time", t.getDataValue("timesUsed"))}*\n\n*: Data collection started on October 7, 2021`;
    }
  };
}

export const user: Command = {
  name: "user",
  description: "get information about a user",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "the user to get information about",
      required: true,
      type: "USER",
    }
  ],
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    if (interaction.channel?.type === "DM") {
      interaction.reply("This command can only be used in a server.");
      return;
    }

    const userRequested = interaction.options.getUser("user") as User;
    if (userRequested.bot) {
      interaction.reply({ content: "This command can only be used with a user." });
      return;
    }
    const info = await getUserInfo(userRequested, interaction);
    const embed = new MessageEmbed()
      .setTitle(`${info.fullPerson}`)
      .setThumbnail(info.avatar)
      .addField("Bot information", await info.tagInfo())
      .addField("Nickname", info.nick)
      .addField(`Roles (${info.rolesUnjoined?.length ?? 0})`, info.roles ?? "This user has no roles")
      .addField("Joined", info.joined)
      .setTimestamp()
      .setFooter({ text: `${interaction.guild?.name}`, iconURL: interaction.guild?.iconURL() as string });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};