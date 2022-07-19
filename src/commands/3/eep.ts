import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const eep: Command = {
  name: "eep",
  description: "shorthand for /earlyeternityprogression",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `1.  First eternity's EP on TD1
    2.  (Buying TS21 path + RESPEC) Eternity at e426IP for 3EP, spend all on TT
    3.  (Buy TS42) Eternity at e500IP for 4 EP
    (Buy TS51) Eternity at e614IP for 8EP
    4.  Buy TS61, then get 100 eternities.
    
    Afterwards, check out this flowchart (also pinned in eternity to ec1): https://i.imgur.com/pdmy3bN.png`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};