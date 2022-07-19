import { Client, CommandInteraction } from "discord.js";

export class InteractionEvents {
  static commandInGeneral(interaction: CommandInteraction): void {
    interaction.reply({ content: `hey buddy! can't use commands in general. nice try though. proud of u`, ephemeral: true });
  }

  static async hasCommand(interaction: CommandInteraction, client: Client): Promise<boolean> {
    return await client.application?.commands.fetch().then(commands => commands.some(command => command.name === interaction.commandName)) as boolean;
  }
}