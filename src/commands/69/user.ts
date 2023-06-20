import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, CommandInteraction, EmbedBuilder, GuildMember, User } from "discord.js";
import { authorTitle, pluralise } from "../../functions/Misc";
import { Command } from "../../command";
import { UserInfo } from "../../utils/types";
import { getPersonTag } from "../../functions/database";

async function getUserInfo(user: User, interaction: CommandInteraction): Promise<UserInfo> {
  const u = await interaction.guild?.members.resolve(user.id) as GuildMember;

  return {
    fullPerson: authorTitle(interaction),
    rolesUnjoined: u?.roles.cache.map(r => `<@&${r.id}>`),
    roles: u?.roles.cache.map(r => `<@&${r.id}>`).join(", "),
    nick: u?.nickname ?? "This user has not set a nickname",
    joined: `<t:${Math.floor(u.joinedTimestamp as number / 1000)}:F>`,
    avatar: user.displayAvatarURL(),
    tag: await getPersonTag(user.username, user.discriminator),
    async tagInfo() {
      const t = await getPersonTag(user.username, user.discriminator);
      if (t === null) return `This user has not used the bot.`;
      return `${authorTitle(interaction)} has used the bot **${t.getDataValue("timesUsed")}** ${pluralise("time", t.getDataValue("timesUsed"))}*\n\n*: Data collection started on October 7, 2021`;
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
      .addFields({ name: "Nickname", value: info.nick })
      .addFields({ name: `Roles (${info.rolesUnjoined?.length ?? 0})`, value: info.roles ?? "This user has no roles" })
      .addFields({ name: "Joined", value: info.joined })
      .setTimestamp()
      .setFooter({ text: `${interaction.guild?.name}`, iconURL: interaction.guild?.iconURL() as string });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};