import * as Challenge from "../../utils/databases/challenges";
import { ApplicationCommandOptionChoiceData, ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { authorTitle, isHelper } from "../../functions/Misc";
import { Command } from "../../command";

function getChoices(): ApplicationCommandOptionChoiceData<string>[] {
  const choices: Array<ApplicationCommandOptionChoiceData<string>> = [];
  for (const challenge in Challenge.newChallengeMessageObject) {
    choices.push({
      name: String(challenge),
      value: String(challenge)
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
    },
    {
      name: "target",
      description: "(Optional) Which user would you like to show the information to?",
      required: false,
      type: ApplicationCommandOptionType.User,
    }
  ],
  run: (interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    type ObjectKey = keyof typeof Challenge.newChallengeMessageObject;
    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    // This second case should never happen, considering we have *specific choices* that can be used.
    const chall = interaction.options.getString("challenge");
    const info = interaction.options.getString("info");
    const target = interaction.options.getUser("target") as User;

    if (chall === "ecs") {
      interaction.reply({ content: `${target ? `*Suggested for <@${target.id}>*:\n` : ""}${Challenge.newChallengeMessageObject["ecs" as ObjectKey] as string}`, ephemeral: !isHelper(interaction) });
      return;
    }

    const picture: AttachmentBuilder = new AttachmentBuilder(`src/images/challenges/${chall?.toUpperCase()}.png`);

    const embed = Challenge.newChallengeMessageObject[chall as ObjectKey] as EmbedBuilder;
    embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() });
    embed.setThumbnail(`attachment://${chall?.toUpperCase()}.png`);

    if (!info) {
      interaction.reply({ content: target ? `*Suggested for <@${target.id}>*` : undefined, embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
      return;
    }

    type ChallengeObjectKey = keyof typeof Challenge.challenges;
    embed.setFields(Challenge.shownFields(Challenge.challenges[chall as ChallengeObjectKey], info));
    interaction.reply({ content: target ? `*Suggested for <@${target.id}>*` : undefined, embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
  }
};
