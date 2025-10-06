import * as Challenge from "../../utils/databases/challenges";
import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import { authorTitle, isHelper } from "../../functions/Misc";
import { Command } from "../../command";

export const c9: Command = {
  name: "c9",
  description: "shorthand for /challenge c9",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "target",
      description: "(Optional) Which user would you like to show the information to?",
      required: false,
      type: ApplicationCommandOptionType.User,
    }
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
    const target: User | null = interaction.options.getUser("target", false);

    type ObjectKey = keyof typeof Challenge.newChallengeMessageObject;
    const embed: EmbedBuilder = Challenge.newChallengeMessageObject["c9" as ObjectKey] as EmbedBuilder;
    embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() });
    const picture: AttachmentBuilder = new AttachmentBuilder(`src/images/challenges/C9.png`);
    embed.setThumbnail("attachment://C9.png");

    embed.setFields(Challenge.shownFields(Challenge.challenges.c9, "strategy"));

    await interaction.reply({ content: target ? `*Suggested for <@${target.id}>*` : undefined, embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
  }
};