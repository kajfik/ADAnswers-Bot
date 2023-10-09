import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, InteractionReplyOptions, MessageComponentInteraction, StringSelectMenuBuilder, User } from "discord.js";
import { authorTitle, isHelper, link } from "../../../functions/Misc";
import fetch from "node-fetch";
import { lastfm } from "../../../config.json";

interface Artist {
  url: string,
  name: string,
  mbid: string
}

interface Image {
  size: string,
  "#text": string
}

interface Album {
  artist: Artist,
  image: Array<Image>,
  mbid: string,
  url: string,
  playcount: string,
  "@attr": {
    rank: string
  },
  name: string
}

const getNextPage = (currentPage: number, up: boolean) => {
  const possiblePages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let index: number = possiblePages.indexOf(currentPage);

  if (up) index++;
  else index--;

  index = (index + possiblePages.length) % possiblePages.length;

  return possiblePages[index];
};

const getEmbed = (album: Album) => new EmbedBuilder()
  .setTitle(album.name)
  .setDescription(album.artist.name)
  .setColor(`DarkVividPink`)
  .setTimestamp()
  .setFooter({ text: "Data from LastFM", iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` })
  .addFields(fields(album));

const fields = (album: Album) => [
  { name: "Ranking", value: album["@attr"].rank },
  { name: "Playcount", value: album.playcount },
  { name: "Link", value: `${link(album.name, album.url)}\n${link(album.artist.name, album.artist.url)}` }
];

const getSelectOptions = (albums: Array<Album>) => {
  const list = [];
  for (const album of albums) {
    list.push({ label: album.name, value: album["@attr"].rank, description: album.artist.name });
  }
  return list;
};

export async function topAlbumsSubcommand(interaction: ChatInputCommandInteraction) {
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
  const period = interaction.options.getString("period") ?? "overall";
  const response = await fetch(`${lastfm.api}?method=user.gettopalbums&user=${lastfm.username}&period=${period}&api_key=${lastfm.key}&format=json`);
  const data = await response.json();

  const top10Albums = await data.topalbums.album.slice(0, 10);

  const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
  let currentPage = 1;

  const buttons: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`top_albums_button_prev_${expirationTimestamp}`)
        .setEmoji("◀️")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId(`top_albums_button_next_${expirationTimestamp}`)
        .setEmoji("▶️")
        .setStyle(ButtonStyle.Primary),
    );

  const selectMenu: ActionRowBuilder<StringSelectMenuBuilder> = new ActionRowBuilder<StringSelectMenuBuilder>()
    .addComponents(
      new StringSelectMenuBuilder()
        .setCustomId(`top_albums_select_${expirationTimestamp}`)
        .setOptions(getSelectOptions(top10Albums))
    );

  let currentAlbum = top10Albums[0];

  const content: InteractionReplyOptions = {
    embeds: [
      getEmbed(currentAlbum)
        .setThumbnail(currentAlbum.image[2]["#text"])
        .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
    ],
    ephemeral: !isHelper(interaction),
    components: [buttons, selectMenu]
  };

  // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
  const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
  const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });

  await interaction.reply(content).then(() => {
    collector?.on("collect", async i => {
      try {
        if (i.isStringSelectMenu()) {
          const page = parseInt(i.values[0], 10);
          currentPage = page;
          currentAlbum = top10Albums[page - 1];
          await i.update({ embeds: [
            getEmbed(currentAlbum)
              .setThumbnail(currentAlbum.image[2]["#text"])
              .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
          ], components: [buttons, selectMenu] });
        }
        if (i.isButton()) {
          const up = i.customId.startsWith("top_albums_button_next");
          const page = getNextPage(currentPage, up);
          currentPage = page;
          currentAlbum = top10Albums[page - 1];
          await i.update({ embeds: [
            getEmbed(currentAlbum)
              .setThumbnail(currentAlbum.image[2]["#text"])
              .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
          ], components: [buttons, selectMenu] });
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
}