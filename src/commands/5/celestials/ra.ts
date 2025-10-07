import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, User, MessageFlags } from "discord.js";
import { authorTitle, isHelper } from "../../../functions/Misc";
import { Ra } from "../../../utils/databases/celestials/ra";

export async function raCelestialSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const infoRequested = interaction.options.getSubcommand();
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

  switch (infoRequested) {
    case "basic": {
      // Whoops
      // eslint-disable-next-line max-len
      await interaction.reply({ content: Ra.info, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "reality": {
      // eslint-disable-next-line max-len
      await interaction.reply({ content: Ra.reality, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
    case "memories": {
      const selectedCelestial = interaction.options.getString("celestial", true);
      const image = new AttachmentBuilder(`src/images/celestials/memories/${selectedCelestial}.png`);
      const embed: EmbedBuilder = Ra.embed(Ra.memories[selectedCelestial]);
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
        .setThumbnail(`attachment://${selectedCelestial}.png`);

      await interaction.reply({ embeds: [embed], files: [image], ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      break;
    }
  }
}