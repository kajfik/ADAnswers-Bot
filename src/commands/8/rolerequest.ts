import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, Client, Role } from "discord.js";
import { Command } from "../../command";
import { helperRequest } from "./helper";
import { ids } from "../../config.json";

export const rolerequest: Command = {
  name: "rolerequest",
  description: "request various roles such as helper or adab notis",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "role",
      description: "what role would you like?",
      type: ApplicationCommandOptionType.Role,
      required: true
    }
  ],
  run: async(interaction: ChatInputCommandInteraction, client: Client) => {
    const roleRequested: Role = interaction.options.getRole("role") as Role;

    if (!Object.values(ids.AD.requestableRoles).includes(roleRequested.id)) {
      await interaction.reply({ content: `You can't request the \`${roleRequested.name}\` role, dummy!`, ephemeral: true });
      return;
    }

    if (roleRequested.id === ids.AD.requestableRoles.helperRole) {
      await helperRequest.run(interaction, client);
    }

    // TODO: If mods approve the ADAB notifications role, utilise it here. Also, probably end up copying
    // the code for helper request here? Needs some more thought
  }
};