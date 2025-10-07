import { AttachmentBuilder, ChatInputCommandInteraction, User, MessageFlags } from "discord.js";
import { Teresa, TeresaPerkShopEmbed, TeresaRealityEmbed, TeresaUnlockEmbed } from "../../../utils/databases/celestials/teresa";
import { authorTitle, isHelper } from "../../../functions/Misc";

export async function teresaCelestialSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const infoRequested = interaction.options.getSubcommand();
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
  const image = new AttachmentBuilder("src/images/celestials/teresa.png");

  switch (infoRequested) {
    case "basic": {
      await interaction.reply({ content: Teresa.info, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "reality": {
      const embed = TeresaRealityEmbed().setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://teresa.png");
      await interaction.reply({ embeds: [embed], files: [image], ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "perkshop": {
      const embed = TeresaPerkShopEmbed().setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://teresa.png");
      await interaction.reply({ embeds: [embed], files: [image], ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "unlocks": {
      const embed = TeresaUnlockEmbed().setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://teresa.png");
      await interaction.reply({ embeds: [embed], files: [image], ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
  }
}