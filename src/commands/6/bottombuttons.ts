import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const bottombuttons: Command = {
  name: "bottombuttons",
  description: "shows what the bottom buttons are",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `You can use bottom buttons in Android version to buy some resources quickly. By default, you can see only Max button, but you can show all buttons by changing option Bottom buttons to ALL.

E - ||\`E\`ternity||
C - ||Big \`C\`runch||
G - Antimatter \`G\`alaxy
D - \`D\`imension Boost
R - ||\`R\`eplicanti Galaxy||
M/Max - \`M\`ax all (1st ~ 8th Dim and Tickspeed)`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};