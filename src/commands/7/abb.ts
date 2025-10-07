import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const abb: Command = {
  name: "abb",
  description: "sends an abbreviation guide",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

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
EU - ||Eternity Upgrade||
RM - ||Reality Machines||
RU - ||Reality Upgrade||
PP - ||Perk Points||
AP - ||Automator Points||
CelX - ||Celestial X||`;

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};