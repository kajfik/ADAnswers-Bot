import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const earlyinfinity: Command = {
  name: "earlyinfinity",
  description: "Describes how to progress pre-2x better Galaxies",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `C8 repeatedly (do antitable achievement in these C8 runs) until you can afford the Galaxies are twice as effective upgrade, at which point you can do C11 once then continue with normal infinities. Return to the other challenges in any order you like once you get 100 IP and at least all but the last 5 upgrades`;

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};