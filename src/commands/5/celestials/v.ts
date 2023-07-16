import { AttachmentBuilder, ChatInputCommandInteraction, User } from "discord.js";
import { V, VAchievementEmbed, VUnlocksEmbed } from "../../../utils/databases/celestials/v";
import { authorTitle, isHelper } from "../../../functions/Misc";

export async function vCelestialSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const infoRequested = interaction.options.getSubcommand();
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

  switch (infoRequested) {
    case "basic": {
      // Whoops
      // eslint-disable-next-line max-len
      await interaction.reply({ content: `V is a unique Celestial unlocked by completing Achievement ID 151, requiring 800 Antimatter Galaxies without buying the 8th Antimatter Dimension in your current Infinity. Once unlocked, V has additional requirements for full access. You must complete 10,000 Realities, have 1e60 unspent RM, and reach specific milestones in Eternities, Infinities, Dilated Time, and Replicanti, all within the same Reality. Upon meeting these requirements, you can enter V's Reality. However, the completion of the Reality is just the beginning. V has six requirements, each linked to progress within V's Reality, rewarding V-Achievements. V-Achievements persist after leaving V's Reality and can be completed multiple times. Completed V-Achievements unlock upgrades on the V tab and grant Space Theorems. Space Theorems allow the purchase of normally forbidden Time Studies, including multiple paths in the Pace Split and both Time Studies within a dark/light pair. They are replenished upon respeccing studies. Reducing goals with 2 V-Achievements makes certain V-Achievement requirements easier by spending Perk Points. The cost remains constant and applies to future tiers as well. Having 36 V-Achievements unlocks the next Celestial.`, ephemeral: !isHelper(interaction) });
      break;
    }
    case "achievements": {
      const image = new AttachmentBuilder("src/images/celestials/v.png");
      const ach = V.achievements[interaction.options.getString("achievement", true)];
      const embed = VAchievementEmbed(ach);
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://v.png");

      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
    case "unlocks": {
      const image = new AttachmentBuilder("src/images/celestials/v.png");
      const embed = VUnlocksEmbed();
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://v.png");
      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
  }
}