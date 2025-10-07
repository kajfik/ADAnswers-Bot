import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const deadchat: Command = {
  name: "deadchat",
  description: "sends that one message from spec that he said that one time",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `If chat is quiet, just move on and do something else instead of annoying people with what effectively amounts to "hey someone talk already"`;

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};