/* eslint-disable no-unused-vars */
import { ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";
import { Model, ModelStatic } from "sequelize/types";

export interface Command extends ChatInputApplicationCommandData {
  run: (interaction: CommandInteraction, client: Client, tags?: ModelStatic<Model>) => void;
}