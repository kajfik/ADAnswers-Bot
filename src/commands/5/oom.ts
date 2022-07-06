import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const oom: Command = {
  name: "oom",
  description: "describes what an OoM (Order of Magnitude) is",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = "An OoM (or **O**rder **o**f **M**agnitude) is the difference between the exponents of numbers, e.g. 1e100 -> 1e108 is a difference of 8 OoMs.";

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};