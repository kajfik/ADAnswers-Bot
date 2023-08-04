import { ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  bold,
  hideLinkEmbed,
  hyperlink,
  inlineCode,
  italic,
  underscore,
  userMention } from "discord.js";
import { AutocompleteCommand } from "../../command";
import config from "../../config.json";
import fetch from "node-fetch";
import { isHelper } from "../../functions/Misc";
import { mdnAutoComplete } from "../../utils/databases/mdn";

//
// Lots of credit to https://github.com/discordjs/discord-utils-bot/blob/main/src/functions/mdn.ts
// and associated code for making this command possible.
//

interface Highlight {
  body: string[];
  title: string[];
}

interface Document {
  // I LOVE APIS!!!!!!!!!!!!
  // eslint-disable-next-line camelcase
  mdn_url: string;
  score: number;
  title: string;
  locale: string;
  slug: string;
  popularity: number;
  archived: boolean;
  summary: string;
  highlight: Highlight;
}

interface APIResult {
  doc: Document;
}

const cache = new Map<string, Document>();

function escape(text: string): string {
  return text.replace(/\|\|/gu, "|\u200B|").replace(/\*/gu, "\\*");
}

function linkButtonCreator(url: string, label?: string): ButtonBuilder {
  return new ButtonBuilder()
    .setURL(url)
    .setStyle(ButtonStyle.Link)
    .setLabel(label ?? "MDN Web Docs");
}

export const mdn: AutocompleteCommand = {
  name: "mdn",
  description: "Search the Mozilla Developers docs.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "query",
      description: "Phrase to search for",
      required: true,
      type: ApplicationCommandOptionType.String,
      autocomplete: true
    },
    {
      name: "target",
      description: "(Optional) Which user would you like to show the information to?",
      required: false,
      type: ApplicationCommandOptionType.User,
    }
  ],
  autocomplete: async(interaction: AutocompleteInteraction) => {
    const focusedOption = interaction.options.getFocused(true);
    if (focusedOption.name !== "query") return;

    // These are effectively filtered in our MDN function, so we're not gonna worry about
    // trying to get specific startsWith strings or anything
    const choices = await mdnAutoComplete(focusedOption.value);

    await interaction.respond(choices);
  },
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction) return;
    const chosenQuery = interaction.options.getString("query", true).trim();

    // This command is *extremely* vulnerable to errors, due to the nature of APIs and stuff
    try {
      const queryString = `${config.mdn.api}/${chosenQuery}/index.json`;
      let hit = cache.get(queryString);

      if (!hit) {
        try {
          const result = (await fetch(queryString).then(r => r.json())) as APIResult;
          hit = result.doc;
        } catch {
          await interaction.reply({ content: "Something went wrong. Make sure to use an option from the autocomplete.", ephemeral: true });
          return;
        }
      }

      const url = `${config.mdn.api}${hit.mdn_url}`;

      // Captures links in format [text](url)
      const linkReplaceRegex = /\[(.+?)\]\((.+?)\)/gu;
      // Captures text in format `**text**`
      const boldCodeBlockRegex = /`\*\*(.*)\*\*`/gu;

      const intro = escape(hit.summary)
        .replace(/\s+/gu, " ")
        .replace(linkReplaceRegex, hyperlink("$1", hideLinkEmbed(`${config.mdn.api}$2`)))
        .replace(boldCodeBlockRegex, bold(inlineCode("$1")));

      const parts = [
        `<:mdn:${config.mdn.emote}> ${underscore(bold(hyperlink(escape(hit.title), hideLinkEmbed(url))))}`,
        intro,
        `*Information from ${hyperlink("MDN Web Docs", hideLinkEmbed(`https://developer.mozilla.org/en-US/`))}.*`
      ];

      const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(linkButtonCreator(url, hit.title), linkButtonCreator("https://developer.mozilla.org/en-US/"));

      const target = interaction.options.getUser("target");
      const targetString = target ? `${italic(`Documentation suggestion for ${userMention(target.id)}:`)}\n` : "";

      // I think these are reasonable exceptions
      const isInModDevChat = [
        config.ids.AD.gameDevChannel,
        config.ids.AD.modDevChannel,
        config.ids.AD.programmingChannel
      ].includes(interaction.channelId);

      const ephemeral = isInModDevChat ? false : !isHelper(interaction);

      await interaction.reply({ content: `${targetString}${parts.join("\n")}`, ephemeral, components: [buttons] });
    } catch (e) {
      await interaction.reply({ content: "Something went wrong", ephemeral: true });
      console.log(e);
    }
  }
};