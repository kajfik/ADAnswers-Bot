import { Achievement, acceptableArgs, achievementsMessageObject } from "../../utils/databases/achievements";
import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, User } from "discord.js";
import { findAchievementByID, findAchievementByName } from "../../functions/achievements";
import { isHelper, link } from "../../functions/Misc";
import { AchievementInfo } from "src/utils/types";
import { Command } from "../../command";

function getChoices() {
  const choices = [];
  const keys = Object.keys(achievementsMessageObject).filter(key => !key.startsWith("r"));
  for (const ach of keys) {
    choices.push({
      name: ach,
      value: ach,
    });
  }
  return choices;
}

export const achievements: Command = {
  name: "achievements",
  description: "sends link to achievements guide",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "achievement",
      description: "which achievement do you want to see a guide for?",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: getChoices(),
    },
    {
      name: "other",
      description: "which achievement do you want to see a guide for, using the achievement ID",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      // eslint-disable-next-line camelcase
      min_value: 11,
      // eslint-disable-next-line camelcase
      max_value: 138,
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const ach: string = interaction.options.getString("achievement") as string;
    const other: number = interaction.options.getInteger("other") as number;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    if (ach !== null && other !== null) {
      await interaction.reply({ content: `You can only specify one of the two options.`, ephemeral: true });
      return;
    }

    if (ach === null && other === null) {
      await interaction.reply({ content: `${link("Check out this cool guide by Hellbach!", "https://docs.google.com/document/d/1C8W_lt9EPxpu9wIloWZo5CPDdZ4ItP1-IU1Vs3x7lEg")}`, ephemeral: !isHelper(interaction) });
      return;
    }

    if (acceptableArgs.includes(`${ach}`) || acceptableArgs.includes(`${other}`)) {
      let achievement: AchievementInfo;

      if (other === null) {
        achievement = findAchievementByName(ach) as AchievementInfo;
      } else if (ach === null) {
        achievement = findAchievementByID(other) as AchievementInfo;
      } else {
        achievement = findAchievementByID(11) as AchievementInfo;
      }

      const picture = new AttachmentBuilder(`src/images/achievements/${achievement.id}.png`);

      const embed = Achievement(achievement)
        .setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
        .setThumbnail(`attachment://${achievement.id}.png`);

      await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
      return;
    }

    await interaction.reply({ content: "That is not an achievement!", ephemeral: true });
  }
};