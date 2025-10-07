import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, User, MessageFlags } from "discord.js";
import { authorTitle, isHelper } from "../../functions/Misc";
import { Command } from "../../command";
import { StudyInfo } from "../../utils/types";
import { TimeStudy } from "../../functions/studies";
import { studies } from "../../utils/databases/studies";

export const study: Command = {
  name: "study",
  description: "Args: all study IDs. Returns information about the study",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "study",
      description: "The study you want to get information about using the study ID",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 304,
    }
  ],
  run: (interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    const studyID: number = interaction.options.getInteger("study") as number;

    const studyRequested: StudyInfo = studies[`${studyID}`];

    if (!studyRequested) {
      if (studyID === 12) {
        interaction.reply({ content: "Time Study 12? What's that?", flags: MessageFlags.Ephemeral });
        return;
      }
      interaction.reply({ content: "That study doesn't exist.", flags: MessageFlags.Ephemeral });
      return;
    }

    const embed: EmbedBuilder = TimeStudy(studyRequested);

    const picture: AttachmentBuilder = new AttachmentBuilder(`src/images/studies/${studyRequested.type}.png`);

    embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
      .setThumbnail(`attachment://${studyRequested.type}.png`);

    if (studyRequested.hasGraph) {
      embed.addFields({ name: "Effect formula graph", value: "** **" });
      embed.setImage(studyRequested.graph as string);
    }

    interaction.reply({ embeds: [embed], files: [picture], ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};