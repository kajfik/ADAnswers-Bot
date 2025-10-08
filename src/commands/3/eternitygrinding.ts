import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const eternitygrinding: Command = {
  name: "eternitygrinding",
  description: "describes how to eternity grind",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;


    const content = `
- TS: ID/Active, minimal tree at 40 TT: \`11,22,32,42,51,61,72,82,92,102\`
- Autobuyers: Eternity at 0 EP, Galaxy at 0 or 0.1s, Dimboost off or at 0.3s, Crunch at 1e20x or 1e41x or 1e54x times highest IP (in later stages you can do 1e284x)
- make sure your Eternity Upgrade based on IC times is capped at 6.38e14x (do ICs with Dimboost/Galaxy autobuyers disabled while holding M+C)
- hold M/Max
- on mobile you can hold "Max all" in the Infinity Dimensions tab
- on pc set update rate to 33ms
- if you have TS181 disable your Crunch autobuyer`;

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};