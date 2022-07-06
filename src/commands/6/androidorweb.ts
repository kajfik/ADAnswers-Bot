import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const androidorweb: Command = {
  name: "androidorweb",
  description: "sends the pinned message from the mobile channel describing the differences.",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `<https://gist.github.com/earthernsence/85ba3bfd470ed6fe76944f377f91fda4>`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};