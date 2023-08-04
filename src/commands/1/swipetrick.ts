import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const swipetrick: Command = {
  name: "swipetrick",
  description: "Explains swipe trick for mobile",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    /* eslint-disable max-len */
    const content: string = `
As of Android version 2.45.0, the swipe trick has been replaced with a simpler "Sticky Button" trick. After you reach Infinity for the first time on any save, you can hold down one of the bottom buttons, and it will stay held as you do other things on screen. No swiping required. Pressing the held button again will disable it. 
    
This trick works with every bottom button. (You can enable more bottom buttons by setting bottom buttons to \`all\`.) Like the swipe trick, only one button can be held like this at a time.
    
You can also peform a similar trick on the web/steam version of the game. To do it, hold your key of choice, click on the how to play button (the [?] in the top-right), and then let go of your key. Then you can close the h2p and the game will still believe that key is being pressed.`;
    /* eslint-enable max-len */

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};