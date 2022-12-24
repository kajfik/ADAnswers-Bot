import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";

export const commands: Command = {
  name: "commands",
  description: "sends a link to the ADAB commands website",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `The ADAB commands website is located ${link("here", "https://earthernsence.github.io/ADAnswers-Bot/")}. (Note: not particularly optimised for mobile)`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};