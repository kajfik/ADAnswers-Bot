import { isHelper, link } from "../../functions/Misc";
import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";

export const ecs: Command = {
  name: "ecs",
  description: "sends link to ninjatsu's EC guide",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `Check out ${link("this message", "https://canary.discord.com/channels/351476683016241162/408764187960147982/731639441474453537")} by Ninjatsu!`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};