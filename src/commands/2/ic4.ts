import * as Challenge from "../../utils/databases/challenges";
import { BaseCommandInteraction, MessageAttachment, MessageEmbed, User } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const ic4: Command = {
  name: "ic4",
  description: "shorthand for /challenge ic4",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    type ObjectKey = keyof typeof Challenge.newChallengeMessageObject;
    const embed: MessageEmbed = Challenge.newChallengeMessageObject["ic4" as ObjectKey] as MessageEmbed;
    embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() });
    const picture: MessageAttachment = new MessageAttachment(`src/images/challenges/IC4.png`);
    embed.setThumbnail("attachment://IC4.png");

    embed.setFields(Challenge.shownFields(Challenge.challenges.ic4, "strategy"));

    await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
  }
};