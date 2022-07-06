import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const abb: Command = {
  name: "abb",
  description: "sends an abbreviation guide",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
AM - Antimatter
IP - ||Infinity Points||
EP - ||Eternity Points||
CX - Challenge X
ICX - ||Infinity Challenge X||
ECXxY - ||Eternity Challenge X completion Y||
IPow - ||Infinity Power||
IDX - ||Infinity Dimension X||
TDX - ||Time Dimension X||
TS - ||Time Study||
TT - ||Time Theorem||
DT - ||Dilated Time||
TP - ||Tachyon Particles||
BInf - ||Banked Infinities||
EU - ||Eternity Upgrade||`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};