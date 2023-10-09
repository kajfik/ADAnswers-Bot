import { APIEmbedField, ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import { authorTitle, footerText } from "../functions/Misc";

export type EmbedConfigOptions = {
  title: string | Function,
  colour: string,
  description: string | Function,
  thumbnail?: string,
  footerText?: string
}

const EMBED_ICON_URL = `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png`;

export class EmbedCreator {
  interaction: ChatInputCommandInteraction
  embed: EmbedBuilder
  fields: Array<APIEmbedField>
  config: EmbedConfigOptions

  constructor(interaction: ChatInputCommandInteraction, fields: Array<APIEmbedField>, config: EmbedConfigOptions) {
    this.interaction = interaction;
    this.fields = fields;
    this.embed = new EmbedBuilder();
    this.config = config;
  }

  get user(): User {
    return this.interaction.member === null ? this.interaction.user : this.interaction.member.user as User;
  }

  get title(): string {
    return typeof this.config.title === "function" ? this.config.title() : this.config.title;
  }

  get description(): string {
    return typeof this.config.description === "function" ? this.config.description() : this.config.description;
  }

  get footerText(): string {
    return this.config.footerText ? this.config.footerText : footerText();
  }

  addFields(): EmbedBuilder {
    this.embed = this.embed.addFields(this.fields);
    return this.embed;
  }

  finalise(): EmbedBuilder {
    this.embed = this.addFields();
    this.embed = this.embed
      .setTitle(this.title)
      .setFooter({ text: this.footerText, iconURL: EMBED_ICON_URL })
      .setTimestamp()
      .setAuthor({ name: authorTitle(this.interaction), iconURL: this.user.displayAvatarURL() });

    return this.embed;
  }
}