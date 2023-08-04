/* eslint-disable max-len */
import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const infinitydimensions: Command = {
  name: "infinitydimensions",
  description: "Describes what infinity dimensions (and infinity power) does. Includes when they unlock.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction) return;

    const content: string = `
Infinity Dimensions are a new type of Dimension that you unlock the ability to get when you Break Infinity; however, only go for them when you have 1e8 Infinity Points. They generate Infinity Power (abb. IPow), which gives a boost to Antimatter Dimensions equivelent to IPow^7.
ID1: ||unlocks at 1e1100 Antimatter, costs 1e8 Infinity Points.||
ID2: ||unlocks at 1e1900 Antimatter, costs 1e9 Infinity Points.||
ID3: ||unlocks at 1e2400 Antimatter, costs 1e10 Infinity Points.||
ID4: ||unlocks at 1e10500 Antimatter, costs 1e20 Infinity Points. This one is curious because of its low cost but high unlock antimatter. You will be able to reach 1e10500 Antimatter at around e45 Infinity Points.||
ID5: ||unlocks at 1e30000 Antimatter, costs 1e140 Infinity Points.||
ID6: ||unlocks at 1e45000 Antimatter, costs 1e200 Infinity Points.||
ID7: ||unlocks at 1e54000 Antimatter, costs 1e250 Infinity Points.||
ID8: ||unlocks at 1e60000 Antimatter, costs 1e280 Infinity Points.||`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};