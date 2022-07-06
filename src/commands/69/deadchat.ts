import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const deadchat: Command = {
  name: "deadchat",
  description: "sends that one message from spec that he said that one time",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `If chat is quiet, just move on and do something else instead of annoying people with what effectively amounts to "hey someone talk already"`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};