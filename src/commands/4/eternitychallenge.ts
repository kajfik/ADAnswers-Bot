import { ApplicationCommandType, ChatInputCommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ec } from "./ec";

export const eternitychallenge: Command = {
  name: "eternitychallenge",
  description: "usage: `/eternitychallenge [challenge] [completion]`. follow onscreen prompts",
  type: ApplicationCommandType.ChatInput,
  options: ec.options,
  run: async(interaction: ChatInputCommandInteraction, client: Client) => {
    await ec.run(interaction, client);
  }
};