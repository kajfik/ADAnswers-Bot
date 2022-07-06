import { isHelper, link } from "../../functions/Misc";
import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import wiki from "wikijs";

export const wikipedia: Command = {
  name: "wikipedia",
  description: "displays given Wikipedia article based on search term",
  type: "CHAT_INPUT",
  options: [
    {
      name: "search",
      description: "search term",
      required: true,
      type: "STRING",
    },
    {
      name: "language",
      description: "language",
      required: false,
      type: "STRING",
      choices: [
        { name: "en", value: "en" },
        { name: "de", value: "de" },
        { name: "fr", value: "fr" },
        { name: "es", value: "es" },
      ]
    }
  ],
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const language: string = interaction.options.getString("language") || "en";

    // eslint-disable-next-line max-len
    const content: string = await wiki({
      apiUrl: `https://${language}.wikipedia.org/w/api.php`
    }).find(interaction.options.getString("search") as string).then(async page => `${(await page.summary()).substring(0, 350)}...\n__**${link("(link)", page.url())}**__`).catch(() => `No article found with that title.`);

    let ephemeral = !isHelper(interaction);
    if (content === "No article found with that title") ephemeral = true;

    await interaction.reply({ content, ephemeral });
  }
};