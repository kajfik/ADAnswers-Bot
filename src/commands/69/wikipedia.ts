import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";
import wiki from "wikijs";

export const wikipedia: Command = {
  name: "wikipedia",
  description: "displays given Wikipedia article based on search term",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "search",
      description: "search term",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "language",
      description: "language",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "en", value: "en" },
        { name: "de", value: "de" },
        { name: "fr", value: "fr" },
        { name: "es", value: "es" },
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const language: string = interaction.options.getString("language") || "en";

    // eslint-disable-next-line max-len
    let url: string = "https://en.wikipedia.org";
    const content: string = await wiki({
      apiUrl: `https://${language}.wikipedia.org/w/api.php`
    }).find(interaction.options.getString("search") as string).then(async page => {
      url = page.url();
      return `${(await page.summary()).substring(0, 350)}...`;
    }).catch(() => `No article found with that title.`);

    const button = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setURL(url)
          .setStyle(ButtonStyle.Link)
          .setLabel("Link")
      );

    let ephemeral = !isHelper(interaction);
    let components = [button];
    if (content === "No article found with that title.") {
      ephemeral = true;
      components = [];
    }

    await interaction.reply({ content, ephemeral, components });
  }
};