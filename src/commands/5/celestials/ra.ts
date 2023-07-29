import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import { authorTitle, isHelper } from "../../../functions/Misc";
import { Ra } from "../../../utils/databases/celestials/ra";

export async function raCelestialSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const infoRequested = interaction.options.getSubcommand();
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

  switch (infoRequested) {
    case "basic": {
      // Whoops
      // eslint-disable-next-line max-len
      await interaction.reply({ content: Ra.info, ephemeral: !isHelper(interaction) });
      break;
    }
    case "reality": {
      // eslint-disable-next-line max-len
      await interaction.reply({ content: Ra.reality, ephemeral: !isHelper(interaction) });
      break;
    }
    case "memories": {
      const selectedCelestial = interaction.options.getString("celestial", true);
      const image = new AttachmentBuilder(`src/images/celestials/memories/${selectedCelestial}.png`);
      const embed: EmbedBuilder = Ra.embed(Ra.memories[selectedCelestial]);
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
        .setThumbnail(`attachment://${selectedCelestial}.png`);

      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
  }
}