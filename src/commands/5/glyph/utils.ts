import { effectCountProbabilityCalculator, rarityProbabilityCalculator, threshold } from "../../../functions/glyphs";
import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { isHelper } from "../../../functions/Misc";

export async function utilsGlyphSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  if (interaction.options.getSubcommandGroup() !== null) {
    if (interaction.options.getSubcommand() === "threshold") {
      const response = await threshold(interaction.options.getNumber("rarity") as number);
      await interaction.reply({ content: response.status, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      return;
    }

    if (interaction.options.getSubcommand() === "rarityprobability") {
      const bonusRarity = interaction.options.getNumber("bonus") as number;
      const ru16Purchased = interaction.options.getBoolean("ru16") as boolean;
      const rarity = interaction.options.getNumber("rarity") as number;

      const response = await rarityProbabilityCalculator(bonusRarity, ru16Purchased, rarity);
      await interaction.reply({ content: response.status, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      return;
    }

    if (interaction.options.getSubcommand() === "effectprobability") {
      const ru17Purchased = interaction.options.getBoolean("ru17") as boolean;
      const rarity = interaction.options.getNumber("rarity") as number;
      const level = interaction.options.getNumber("level") as number;
      const effects = interaction.options.getNumber("effects") as number;
      const isEffarig = interaction.options.getBoolean("effarig") as boolean;

      const response = await effectCountProbabilityCalculator(ru17Purchased, rarity, level, effects, isEffarig);
      await interaction.reply({ content: response.status, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
    }
  }
}