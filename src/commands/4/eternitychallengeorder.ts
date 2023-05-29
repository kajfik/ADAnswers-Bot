import { ApplicationCommandType, ChatInputCommandInteraction, Client } from "discord.js";
import { Command } from "../../command";
import { eco } from "./eco";

export const eternitychallengeorder: Command = {
  name: "eternitychallengeorder",
  description: "Args: highest eternity challenge you've down in the order (optional). Returns the EC order.",
  type: ApplicationCommandType.ChatInput,
  options: eco.options,
  run: async(interaction: ChatInputCommandInteraction, client: Client) => {
    await eco.run(interaction, client);
  }
};