import { BaseCommandInteraction, Client } from "discord.js";

export class InteractionEvents {
  static commandInGeneral(interaction: BaseCommandInteraction): void {
    interaction.reply({ content: `hey buddy! can't use commands in general. nice try though. proud of u`, ephemeral: true });
  }

  static async hasCommand(interaction: BaseCommandInteraction, client: Client): Promise<boolean> {
    return await client.application?.commands.fetch().then(commands => commands.some(command => command.name === interaction.commandName)) as boolean;
  }
}