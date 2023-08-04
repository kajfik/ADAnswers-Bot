/* eslint-disable max-len */
import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const bankedinfinities: Command = {
  name: "bankedinfinities",
  description: "describes banked infinities, what they do, and how to get them.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const content: string = `
Banked Infinities work like regular Infinities, except they stay on Eternity. To get Banked Infinities, have Time Study 191 or Achievement 131 "No Ethical Consumption" (these two effects stack, meaning if you have both you'll get 10% of your infinities converted), grind infinities (method in spoiler below), and then Eternity.
Method for obtaining: see \`/infinitygrinding post\`!`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};