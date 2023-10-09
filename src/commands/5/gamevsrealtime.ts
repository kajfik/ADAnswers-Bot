import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const gamevsrealtime: Command = {
  name: "gamevsrealtime",
  description: "Explains the difference between game time and real time",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    /* eslint-disable max-len */
    const content: string = `
Game time is a mechanic that is technically introduced during Eternity Challenge 12, but becomes relevant after you unlock the black hole. Most mechanics in the game, such as Replicanti or Dilated Time, run on Game time, while automation-based mechanics, such as the Automator and Autobuyers, run on Real Time. 
    
Under most pre-Reality circumstances (eg: not EC12), Game Time and Real Time are the same. However, once you activate the Black Hole and/or equip a Time Glyph with the "Multiply game speed" glyph effect, Game Time will begin to flow at an altered rate. This altered speed will be shown under your Antimatter amount / the "Make a new Reality" button.

Examples of mechanics that use Game time:

- Antimatter, Infinity, and Time Dimensions
- Replicanti
- Dilated Time
- Time Study 181
- Infinity and Eternity generation from The Boundless Flow / The Eternal Flow
- EC12 (Although it fixes game speed to 0.001 regardless of other factors)
- The Reality Upgrade "Replicative Rapidly"
    
Examples of mechanics that use Real time:

- Autobuyers
- The Automator
- The Black Hole timer
- Celestial-era resources`;
    /* eslint-enable max-len */
    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};