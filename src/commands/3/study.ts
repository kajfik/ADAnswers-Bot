import { BaseCommandInteraction, MessageAttachment, MessageEmbed, User } from "discord.js";
import { Command } from "../../command";
import { StudyInfo } from "../../utils/types";
import { TimeStudy } from "../../functions/studies";
import { isHelper } from "../../functions/Misc";
import { studies } from "../../utils/databases/studies";

export const study: Command = {
  name: "study",
  description: "Args: all study IDs. Returns information about the study",
  type: "CHAT_INPUT",
  options: [
    {
      name: "study",
      description: "The study you want to get information about using the study ID",
      type: "INTEGER",
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 11,
      // eslint-disable-next-line camelcase
      max_value: 234,
    }
  ],
  run: (interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    const studyRequested: StudyInfo = studies[`${interaction.options.getInteger("study")}`];

    if (!studyRequested) {
      interaction.reply({ content: "That study doesn't exist." });
      return;
    }

    const embed: MessageEmbed = TimeStudy(studyRequested);

    const picture: MessageAttachment = new MessageAttachment(`src/images/studies/${studyRequested.type}.png`);

    embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
      .setThumbnail(`attachment://${studyRequested.type}.png`);

    if (studyRequested.hasGraph) {
      embed.addFields({ name: "Effect formula graph", value: "** **" });
      embed.setImage(studyRequested.graph as string);
    }

    interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
  }
};