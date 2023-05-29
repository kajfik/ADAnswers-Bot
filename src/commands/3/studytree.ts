import { ApplicationCommandType, ChatInputCommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { ts } from "./ts";

export const studytree: Command = {
  name: "studytree",
  description: "Generates a Time Study tree based on your total Time Theorems.",
  type: ApplicationCommandType.ChatInput,
  options: ts.options,
  run: async(interaction: ChatInputCommandInteraction, client: Client) => {
    await ts.run(interaction, client);
  }
};