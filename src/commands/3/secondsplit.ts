import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const secondsplit: Command = {
  name: "secondsplit",
  description: "describes second split paths",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    /* eslint-disable max-len */
    const content: string = `
Passive : Straight up consecutive EP/min farming runs (afk and offline possible). Works out great for only EP/min farming, will beat out idle overnight with mobile offline setup. Drops off hard at the end of this channel but is usable into the next for a bit.
Active : AM + IP + EP farming, focus required. Setup and always watching required but better than passive.
Idle : AM + IP + EP farm only if you treat this as a check in once every 2 hours type game or are unsure how to setup EP/min farm with passive. If you hate Active this will be the way to go as you need those AM+IP TT eventually.`;
    /* eslint-enable max-len */

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};