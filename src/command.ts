/* eslint-disable no-unused-vars */
import { BaseCommandInteraction, ChatInputApplicationCommandData, Client } from "discord.js";
import { Model, ModelStatic } from "sequelize/types";

export interface Command extends ChatInputApplicationCommandData {
  run: (interaction: BaseCommandInteraction, client: Client, tags?: ModelStatic<Model>) => void;
}