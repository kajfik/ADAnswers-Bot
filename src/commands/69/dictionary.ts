// eslint-disable-next-line camelcase
import { m_w } from "../../config.json";
import { Command } from "../../command";
import fetch from "node-fetch";
import { authorTitle, isHelper } from "../../functions/Misc";
import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, User } from "discord.js";

type WordExample = {
  t: string;
  aq: {
    auth: string;
    source: string;
    aqdate: string;
  }
}

type WordData = {
  meta: {
    id: string;
    uuid: string;
    sort: string;
    src: string;
    section: string;
    stems: Array<string>;
    offensive: boolean;
  },
  hwi: {
    hw: string;
  },
  fl: string,
  quotes: Array<WordExample>,
  shortdef: Array<string>,
}

const partOfSpeechMap = new Map([
  // Basic
  ["noun", "n."],
  ["verb", "v."],
  ["article", "art."],
  ["adjective", "adj."],
  ["preposition", "prep."],
  ["adverb", "adv."],
  ["conjunction", "conj."],
  ["interjection", "interj."],
  ["pronoun", "pron."],

  // More specific
  ["definite article", "def. art."],
  ["indefinite article", "indef. art."]
]);

export const dictionary: Command = {
  name: "dictionary",
  description: "gets information from the Merriam-Webster Collegiate® Dictionary",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "word",
      description: "word you're searching for",
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const word: string = interaction.options.getString("word", true);
    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    if (user.username !== "earth1337_") {
      await interaction.reply({ content: "Don't use this command because your name is not earth", ephemeral: true });
      return;
    }

    // eslint-disable-next-line camelcase
    const wordData = (await fetch(`${m_w.api}/${word}?key=${m_w.key}`)
      .then(r => r.json())
      .catch(() => undefined)) as Array<WordData> | undefined;

    if (!wordData) {
      await interaction.reply({ content: "No word was found.", ephemeral: true });
      return;
    }

    console.log(wordData);

    const MWLogo = new AttachmentBuilder("src/images/misc/mwlogo.png");

    const embed: EmbedBuilder = new EmbedBuilder()
      .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
      .setTitle(`${wordData[0].meta.id} (${partOfSpeechMap.get(wordData[0].fl) ?? "unknown"})`)
      .setDescription("from Merriam-Webster's Collegiate® Dictionary")
      .addFields([
        { name: "Definition", value: wordData[0].shortdef.map(def => `- ${def}`).join("\n") }
      ])
      .setThumbnail(`attachment://mwlogo.png`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: !isHelper(interaction), files: [MWLogo] });
  }
};