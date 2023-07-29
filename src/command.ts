/* eslint-disable no-unused-vars */
import { AutocompleteInteraction, ChatInputApplicationCommandData, ChatInputCommandInteraction, Client, CommandInteraction } from "discord.js";
import { Model, ModelStatic } from "sequelize/types";

export interface Command extends ChatInputApplicationCommandData {
  run: (interaction: ChatInputCommandInteraction, client: Client, tags?: ModelStatic<Model>) => void;
}

export interface AutocompleteCommand extends Command {
  autocomplete: (interaction: AutocompleteInteraction) => void;
}