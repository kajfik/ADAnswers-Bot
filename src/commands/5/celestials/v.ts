import { AttachmentBuilder, ChatInputCommandInteraction, User, MessageFlags } from "discord.js";
import { authorTitle, isHelper } from "../../../functions/Misc";
import { V } from "../../../utils/databases/celestials/v";

export async function vCelestialSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const infoRequested = interaction.options.getSubcommand();
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

  switch (infoRequested) {
    case "basic": {
      await interaction.reply({ content: V.info, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "reality": {
      await interaction.reply({ content: V.reality, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "achievements": {
      const selectedAchievement = interaction.options.getString("achievement", true);
      const ach = V.achievements[selectedAchievement];
      const image = new AttachmentBuilder(`src/images/celestials/v-achievements/ach_${selectedAchievement}.png`);
      const embed = V.embeds.achievements(ach);
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail(`attachment://ach_${selectedAchievement}.png`);

      await interaction.reply({ embeds: [embed], files: [image], ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "unlocks": {
      const image = new AttachmentBuilder("src/images/celestials/v.png");
      const embed = V.embeds.unlocks();
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://v.png");
      await interaction.reply({ embeds: [embed], files: [image], ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
  }
}