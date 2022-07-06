import { BaseCommandInteraction, MessageAttachment, MessageEmbed, User } from "discord.js";
import { eternityChallenge, shownFields } from "../../functions/ecs";
import { Command } from "../../command";
import { findEC } from "../../utils/databases/eternitychallenges";
import { isHelper } from "../../functions/Misc";

export const ec: Command = {
  name: "ec",
  description: "usage: `/ec [challenge] [completion]`. follow onscreen prompts",
  type: "CHAT_INPUT",
  options: [
    {
      name: "ec",
      description: "What Eternity Challenge are you doing?",
      type: "INTEGER",
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 12,
    },
    {
      name: "completion",
      description: "What completion do you want to see?",
      type: "INTEGER",
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 5,
    },
    {
      name: "hide",
      description: "ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Defaults to false.",
      type: "BOOLEAN",
      required: false,
    },
    {
      name: "info",
      description: "(Optional) What information about the challenge do you want to see?",
      type: "STRING",
      required: false,
      choices: [
        { name: "unlock", value: "unlock" },
        { name: "challenge", value: "challenge" },
        { name: "goal", value: "goal" },
        { name: "strategy", value: "strategy" },
        { name: "tree", value: "tree" },
        { name: "reward", value: "reward" },
      ]
    }
  ],
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const eternityChallengeRequested: number = interaction.options.getInteger("ec") as number;
    const completion: number = interaction.options.getInteger("completion") as number;
    let hide: boolean = interaction.options.getBoolean("hide") as boolean;
    const info: string = interaction.options.getString("info") as string;

    if (!isHelper(interaction)) hide = true;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
    const picture: MessageAttachment = new MessageAttachment(`src/images/challenges/EC${eternityChallengeRequested}.png`);

    const embed: MessageEmbed = eternityChallenge(findEC(eternityChallengeRequested, completion))
      .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
      .setThumbnail(`attachment://EC${eternityChallengeRequested}.png`);

    if (!info) {
      await interaction.reply({ embeds: [embed], files: [picture] });
      return;
    }

    if (info === "tree") {
      await interaction.reply({ content: `${findEC(eternityChallengeRequested, completion).tree}` });
      return;
    }

    embed.setFields(shownFields(findEC(eternityChallengeRequested, completion), info));
    await interaction.reply({ embeds: [embed], files: [picture], ephemeral: hide });
  }
};