import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";

export const infinity: Command = {
  name: "infinity",
  description: "tells how much AM you need for infinity",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;

    // eslint-disable-next-line max-len
    const content: string = "1.8e308 Antimatter (2^1024), or, to be precise, 179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624224137216";

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};