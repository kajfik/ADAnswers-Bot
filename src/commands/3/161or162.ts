import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

// Lol
export const onesixtyoneor162: Command = {
  name: "161or162",
  description: "Explains whether to chose TS161 or TS162",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `
Get TS161 first. Both give the same maximum bonus, but TS161 gives that bonuses more quickly as it multiplies ADs directly. Once you have EC2 clears, TS162 is slightly better as the study bonus synergises with the EC2 reward.

1e11 ID multiplier, ^8 IDs = 1e88 more Inf Pow
1e88 more Inf Pow, ^7 multiplier to all ADs = 1e616 multiplier to all ADs
This is the same multiplier TS161 gives, but obtained more slowly as it requires your IDs to produce that Inf Pow over time, rather than just providing a 1e616x multiplier to all ADs immediately.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};