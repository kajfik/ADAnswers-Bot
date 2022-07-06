import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const fivehours: Command = {
  name: "5hours",
  description: "Explains the long-standing 5 hours joke",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "The 5 hours joke is a reference to an even older joke from a time when AD updates were quite frequent. As a response to that, Acamaeda made a news message suggestion: \"Antimatter Dimensions: the next update is always 5 hours away. Always.\" and the rest is history.";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};