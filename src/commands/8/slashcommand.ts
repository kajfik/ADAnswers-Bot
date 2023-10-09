import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const slashcommand: Command = {
  name: "slashcommand",
  description: "explains how TS and EC slash commands work with their args and how to type them",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
\`/ec [TAB] A [TAB] B [TAB] [ENTER]\` for Eternity Challenge guide of EC AxB
\`/eco [TAB] A [TAB] B [TAB] [ENTER]\` for Eternity Challenge Order from EC AxB
\`/ts [TAB] A [ENTER]\` for recommended Study Tree for your TT amount of A
[TAB] can be [ENTER] too.
On mobile, you need to tap these buttons: https://cdn.discordapp.com/attachments/351479640755404820/880396642539409418/Screenshot_20210826-172054_Discord2.png
See this gif for more help on web: https://i.imgur.com/rK1MwNR.gif`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};