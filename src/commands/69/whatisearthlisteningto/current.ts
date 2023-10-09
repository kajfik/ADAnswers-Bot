import { ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import { authorTitle, isHelper, link } from "../../../functions/Misc";
import fetch from "node-fetch";
import { lastfm } from "../../../config.json";

interface Artist {
  mbid: string,
  "#text": string
}

interface Image {
  size: string,
  "#text": string
}

interface Attributes {
  nowplaying: string
}

interface Date {
  uts: string,
  "#text": string
}

interface Track {
  artist: Artist,
  streamable: string,
  image: Image[],
  mbid: string,
  // It's the same, lmao
  album: Artist,
  name: string,
  url: string,
  "@attr"?: Attributes,
  date?: Date
}

export async function currentListeningSubcommand(interaction: ChatInputCommandInteraction) {
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
  const response = await fetch(`${lastfm.api}?method=user.getrecenttracks&user=${lastfm.username}&api_key=${lastfm.key}&format=json`);
  const data = await response.json();

  const currentTrack: Track = data.recenttracks.track.filter((track: Track) => track["@attr"] !== undefined)[0] ?? data.recenttracks.track[0];

  const wasOldTrack: boolean = currentTrack.date !== undefined;
  let timestamp: number;
  let whenDidHeListen: string;
  let currentlyListeningContent = "";
  if (currentTrack.date !== undefined) {
    timestamp = Number(currentTrack.date.uts) * 1000;
    whenDidHeListen = new Date(timestamp).toUTCString();
    currentlyListeningContent = `${whenDidHeListen} (<t:${timestamp / 1000}:F>)`;
  }

  const basicTrackInfo = `${currentTrack.artist["#text"]} - ${currentTrack.name}`;

  const embed: EmbedBuilder = new EmbedBuilder()
    .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
    .setTitle(basicTrackInfo)
    .setDescription(`${link("Earth's Spotify account", "https://open.spotify.com/user/divineicbm?si=30b3b0b0b2c84ccd")} / ${link("Earth's LastFM account", "https://www.last.fm/user/earthernsence")}`)
    .addFields([
      { name: "Album", value: `${currentTrack.album["#text"]}` },
      { name: "Link", value: `${link(`${basicTrackInfo}`, currentTrack.url)}` },
      { name: "Currently listening?", value: `${wasOldTrack ? `No, this was the last track he listened to. He listened to this track on ${currentlyListeningContent}` : `Yes, he is currently listening to this track`}` }
    ])
    .setThumbnail(currentTrack.image[2]["#text"])
    .setTimestamp()
    .setFooter({ text: `Data from LastFM`, iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

  await interaction.reply({ embeds: [embed], ephemeral: !isHelper(interaction) });
}