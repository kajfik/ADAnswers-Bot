import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const roles: Command = {
  name: "roles",
  description: "explains that you can get an Android or Web player role",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "In <#831194138493452288> (or at this link: <https://discord.com/channels/351476683016241162/831194138493452288/876910376216821842>), you can pick up an Android or Web player role. This role makes it easier for helpers to figure out which platform you play on as some information may differ between the two versions. This only takes a few seconds and saves you many \"android or web?\"s.";

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};