import { ApplicationCommandType, ChatInputCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const ipepcolour: Command = {
  name: "ipepcolour",
  description: "Explains the colouring of the IP/EP numbers on their respective reset buttons",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "This is a visual improvement introduced in the web Reality update and adapted into the Android version. \nOnce you have at least 5e11 total IP/EP the colour shows if you gain less (red), around the same (white), or more (green) IP/EP than you currently have.";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};