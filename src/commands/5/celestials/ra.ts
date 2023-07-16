import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import { RaCelestialEmbedGetter, raMemories } from "../../../utils/databases/celestials/ra";
import { authorTitle, isHelper } from "../../../functions/Misc";

export async function raCelestialSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const infoRequested = interaction.options.getSubcommand();
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

  switch (infoRequested) {
    case "basic": {
      // Whoops
      // eslint-disable-next-line max-len
      await interaction.reply({ content: `Ra, the fifth Celestial, is unlocked by completing all of V's Achievements. Ra utilizes memories to bring back enhanced positive effects from previous Celestials. Within Ra, you gradually unlock the previous four Celestials, each offering additional upgrades tied to their original themes. To level up the previous Celestials within Ra, you need to use memories generated passively over time from Memory Chunks. These chunks can only be obtained within Ra's Reality, where they are produced based on specific resource totals. Storing real time does not generate Chunks inside Ra's Reality, but Memories are still generated normally. Reaching a total of 20 levels across all Celestials unlocks Remembrance, allowing you to choose a Celestial to gain more chunks while inside Ra's Reality. Memories can be spent on increasing Memory Chunk gain, Memory gain, and leveling up the Celestial. Teresa is initially unlocked, and subsequent Celestials are unlocked by reaching level 8 with the previous one. Levels are capped at 25. Teresa enhances Infinity Upgrades, increasing their strength, and improves Glyph effects at certain Glyph sacrifice thresholds. Effarig, at level 2, introduces Glyph Alchemy, strengthening Effarig Glyphs and reducing randomness in Glyph generation. Glyph Alchemy has its own How To Play entry. The Nameless Ones introduce mechanics related to charging Black Holes and significantly amplify their power. V unlocks Triad Studies, costing Space Theorems and requiring nearby studies for purchase. Triad Studies also unlock more challenging V-Achievements for additional Space Theorems. Ra does not directly unlock the next Celestial.`, ephemeral: !isHelper(interaction) });
      break;
    }
    case "reality": {
      // eslint-disable-next-line max-len
      await interaction.reply({ content: `You only have 4 Dimension Boosts and cannot gain any more. The Tickspeed purchase multiplier is fixed at x1.125. Within Ra's Reality, Memory Chunks for Celestial Memories will be generated based on certain resource amounts. There is no direct reward for completing Ra's Reality.`, ephemeral: isHelper(interaction) });
      break;
    }
    case "memories": {
      const selectedCelestial = interaction.options.getString("celestial", true);
      const image = new AttachmentBuilder(`src/images/celestials/memories/${selectedCelestial}.png`);
      const embed: EmbedBuilder = RaCelestialEmbedGetter(raMemories[selectedCelestial]);
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
        .setThumbnail(`attachment://${selectedCelestial}.png`);

      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
  }
}