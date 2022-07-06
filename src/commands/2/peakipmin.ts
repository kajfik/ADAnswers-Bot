import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const peakipmin: Command = {
  name: "peakipmin",
  description: "Tells why peak IP/min disappears at 5e11 IP",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `Yes, peak IP/min disappears after you reach 5e11 total IP, as after that point you want to disable your Crunch autobuyer and keep doing non-regular runs - the runs should get longer as you want to reach the next Dimboost/Galaxy which will increase your IP gain substantially, much more than if you kept doing regular IP/min runs like before that point.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};