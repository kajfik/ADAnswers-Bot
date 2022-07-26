import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { eternityChallenge, shownFields } from "../../functions/ecs";
import { Command } from "../../command";
import { findEC } from "../../utils/databases/eternitychallenges";
import { isHelper } from "../../functions/Misc";

export const eternitychallenge: Command = {
  name: "eternitychallenge",
  description: "usage: `/eternitychallenge [challenge] [completion]`. follow onscreen prompts",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "ec",
      description: "What Eternity Challenge are you doing?",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 12,
    },
    {
      name: "completion",
      description: "What completion do you want to see?",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 5,
    },
    {
      name: "hide",
      description: "ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Defaults to false.",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
    {
      name: "info",
      description: "(Optional) What information about the challenge do you want to see?",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: "unlock", value: "unlock" },
        { name: "challenge", value: "challenge" },
        { name: "goal", value: "goal" },
        { name: "strategy", value: "strategy" },
        { name: "tree", value: "tree" },
        { name: "reward", value: "reward" },
      ]
    },
    {
      name: "target",
      description: "(Optional) Which user would you like to show the information to?",
      required: false,
      type: ApplicationCommandOptionType.User,
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const eternityChallengeRequested: number = interaction.options.getInteger("ec") as number;
    const completion: number = interaction.options.getInteger("completion") as number;
    let hide: boolean = interaction.options.getBoolean("hide") as boolean;
    const info: string = interaction.options.getString("info") as string;
    const target: User = interaction.options.getUser("target") as User;

    if (!isHelper(interaction)) hide = true;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
    const picture: AttachmentBuilder = new AttachmentBuilder(`src/images/challenges/EC${eternityChallengeRequested}.png`);

    const embed: EmbedBuilder = eternityChallenge(findEC(eternityChallengeRequested, completion))
      .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
      .setThumbnail(`attachment://EC${eternityChallengeRequested}.png`);

    if (!info) {
      await interaction.reply({ content: target ? `*Suggested for <@${target.id}>*` : null, embeds: [embed], files: [picture], ephemeral: hide });
      return;
    }

    if (info === "tree") {
      await interaction.reply({ content: `${target ? `*Suggested for <@${target.id}>:*\n` : ""}${findEC(eternityChallengeRequested, completion).tree}`, ephemeral: hide });
      return;
    }

    embed.setFields(shownFields(findEC(eternityChallengeRequested, completion), info));
    await interaction.reply({ content: target ? `*Suggested for <@${target.id}>*` : null, embeds: [embed], files: [picture], ephemeral: hide });
  }
};