import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, CommandInteraction, EmbedBuilder, GuildMember, User } from "discord.js";
import { authorTitleFromUser, link, pluralise, quantify } from "../../functions/Misc";
import { getJeopardyPlayerTag, getPersonTag } from "../../functions/database";
import { Command } from "../../command";
import { UserInfo } from "../../utils/types";

async function getUserInfo(user: User, interaction: CommandInteraction): Promise<UserInfo> {
  const u = await interaction.guild?.members.resolve(user.id) as GuildMember;

  return {
    fullPerson: authorTitleFromUser(user),
    rolesUnjoined: u?.roles.cache.map(r => `<@&${r.id}>`),
    roles: u?.roles.cache.map(r => `<@&${r.id}>`).join(", "),
    nick: u?.nickname ?? "This user has not set a nickname",
    joined: `<t:${Math.floor(u.joinedTimestamp as number / 1000)}:F>`,
    avatar: user.displayAvatarURL(),
    tag: await getPersonTag(user.id),
    jeopardyTag: await getJeopardyPlayerTag(user.id),
    async jeopardyInfo() {
      const t = await getJeopardyPlayerTag(user.id);
      if (t === null) return `This user has not played Jeopardy! in the bot.`;
      const score = t.getDataValue("points");
      return `${authorTitleFromUser(user)} has a Jeopardy! score of **${quantify("point", score)}**.`;
    },
    async tagInfo() {
      const t = await getPersonTag(user.id);
      if (t === null) return `This user has not used the bot.`;
      return `${authorTitleFromUser(user)} has used the bot **${t.getDataValue("timesUsed")}** ${pluralise("time", t.getDataValue("timesUsed"))}*\n\n*: ${link("Data collection started on June 22, 2023",
        "https://discord.com/channels/351476683016241162/351476683016241166/1121644631675899934")}`;
    }
  };
}

export const user: Command = {
  name: "user",
  description: "get information about a user",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "user",
      description: "the user to get information about",
      required: true,
      type: ApplicationCommandOptionType.User,
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    if (interaction.channel?.type === ChannelType.DM) {
      interaction.reply("This command can only be used in a server.");
      return;
    }

    const userRequested = interaction.options.getUser("user") as User;
    if (userRequested.bot) {
      interaction.reply({ content: "This command can only be used with a user." });
      return;
    }
    const info = await getUserInfo(userRequested, interaction);
    const embed = new EmbedBuilder()
      .setTitle(`${info.fullPerson}`)
      .setThumbnail(info.avatar)
      .addFields({ name: "Bot information", value: await info.tagInfo() })
      .addFields({ name: "Jeopardy! points", value: await info.jeopardyInfo() })
      .addFields({ name: "Nickname", value: info.nick })
      .addFields({ name: `Roles (${info.rolesUnjoined?.length ?? 0})`, value: info.roles ?? "This user has no roles" })
      .addFields({ name: "Joined", value: info.joined })
      .setTimestamp()
      .setFooter({ text: `${interaction.guild?.name}`, iconURL: interaction.guild?.iconURL() as string });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};