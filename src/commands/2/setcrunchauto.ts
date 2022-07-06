import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const setcrunchauto: Command = {
  name: "setcrunchauto",
  description: "Describes how to set your crunch autobuyer.",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `Disable your crunch autobuyer. Look at how much IP you would gain on crunch when you reach your peak IP/min, and set it to that. It will probably be about a second after you get your last galaxy (make sure your dimboosts are off, unless you have the bulk dimboost upgrade). Re-enable your crunch autobuyer.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};