import { ApplicationCommandType, ChatInputCommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { earlyeternityprogression } from "./earlyeternityprogression";

export const eep: Command = {
  name: "eep",
  description: "shorthand for /earlyeternityprogression",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction, client: Client) => {
    await earlyeternityprogression.run(interaction, client);
  }
};