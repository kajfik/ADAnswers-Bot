
import * as Challenge from "../../utils/databases/challenges";
import { BaseCommandInteraction, MessageAttachment, MessageEmbed, User } from "discord.js";
import { Command } from "../../command";

export const c9: Command = {
  name: "c9",
  description: "shorthand for /challenge c9",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    type ObjectKey = keyof typeof Challenge.newChallengeMessageObject;
    const embed: MessageEmbed = Challenge.newChallengeMessageObject["c9" as ObjectKey] as MessageEmbed;
    embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() });
    const picture: MessageAttachment = new MessageAttachment(`src/images/challenges/C9.png`);
    embed.setThumbnail("attachment://C9.png");

    embed.setFields(Challenge.shownFields(Challenge.challenges.c9, "strategy"));

    await interaction.reply({ embeds: [embed], files: [picture] });
  }
};