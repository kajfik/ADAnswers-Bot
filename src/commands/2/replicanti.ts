import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const replicanti: Command = {
  name: "replicanti",
  description: "Tells what replicanti do (as well as the upgrades)",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = `
Replicanti are a mechanic unlocked at 1e140 IP. Excerpted from the pins of <#387799099472216095>:
    
**Replicanti**: Replicanti are a huge boost to Infinity Dimensions. When you reach Infinite replicanti, you can purchase a Replicanti Galaxy. This resets all Replicanti, but in return you gain a free Galaxy.
This behaves like a normal Galaxy. These, along with Replicanti, are reset on Infinity. 
Achievement "Is this safe?" lets you keep 1 RG on Infinity, as well as your Replicanti.
    
**Replicanti Galaxies (RGs)**: These work the same way as regular Galaxies, except they do not impact the cost of regular Galaxies. These are limited by the third replicanti upgrade, and are slow early on.
    
**Replicanti Upgrades**: There are three Replicanti upgrades, Chance/Interval/RGAmount:
- Chance increases the chance that it will replicate a Replicanti on the interval. 
- The interval is the interval on which replication can possibly happen. 
- RGAmount is the amount of RGs you can have at one time.
    `;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};