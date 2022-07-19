import * as Challenge from "../../utils/databases/challenges";
import { ApplicationCommandOptionChoiceData, ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

function getChoices(): ApplicationCommandOptionChoiceData[] {
  const choices: Array<ApplicationCommandOptionChoiceData> = [];
  for (const challenge in Challenge.newChallengeMessageObject) {
    choices.push({
      name: challenge,
      value: challenge,
    });
  }
  return choices;
}

export const challenge: Command = {
  name: "challenge",
  description: "Args: all challenges, including `ecs`. Returns a guide for each argument.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "challenge",
      description: "which challenge do you want to see a guide for?",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: getChoices(),
    },
    {
      name: "info",
      description: "(Optional) What information about the challenge do you want to see?",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "unlock", value: "unlock" },
        { name: "challenge", value: "challenge" },
        { name: "goal", value: "goal" },
        { name: "strategy", value: "strategy" },
        { name: "reward", value: "reward" }
      ]
    }
  ],
  run: (interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    type ObjectKey = keyof typeof Challenge.newChallengeMessageObject;
    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    // This second case should never happen, considering we have *specific choices* that can be used.
    const chall = interaction.options.getString("challenge");
    const info = interaction.options.getString("info");

    if (chall === "ecs") {
      interaction.reply({ content: Challenge.newChallengeMessageObject["ecs" as ObjectKey] as string });
      return;
    }

    const picture: AttachmentBuilder = new AttachmentBuilder(`src/images/challenges/${chall?.toUpperCase()}.png`);

    const embed = Challenge.newChallengeMessageObject[chall as ObjectKey] as EmbedBuilder;
    embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() });
    embed.setThumbnail(`attachment://${chall?.toUpperCase()}.png`);

    if (!info) {
      interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
      return;
    }

    type ChallengeObjectKey = keyof typeof Challenge.challenges;
    embed.setFields(Challenge.shownFields(Challenge.challenges[chall as ChallengeObjectKey], info));
    interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
  }
};
