import { Client, ChatInputCommandInteraction } from "discord.js";

export class InteractionEvents {
  static async hasCommand(interaction: ChatInputCommandInteraction, client: Client): Promise<boolean> {
    return await client.application?.commands.fetch().then(commands => commands.some(command => command.name === interaction.commandName)) as boolean;
  }
}