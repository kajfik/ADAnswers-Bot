import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction, EmbedBuilder, User } from "discord.js";
import { authorTitle, isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";
import fetch from "node-fetch";
import { lastfm } from "../../config.json";

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

export const whatisearthlisteningto: Command = {
  name: "whatisearthlisteningto",
  description: "find out what song I'm listening to!",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "current",
      description: "what earth is currently listening to",
      type: ApplicationCommandOptionType.Subcommand
    },
    {
      name: "playlists",
      description: "check out some selected playlists",
      type: ApplicationCommandOptionType.Subcommand
    },
    {
      name: "spotify",
      description: "check out earth's spotify",
      type: ApplicationCommandOptionType.Subcommand
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const subcommand = interaction.options.getSubcommand();

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    if (subcommand === "current") {
      const response = await fetch(`${lastfm.api}?method=user.getrecenttracks&user=${lastfm.username}&api_key=${lastfm.key}&format=json`);
      const data = await response.json();

      const currentTrack: Track = data.recenttracks.track.filter((track: Track) => track["@attr"] !== undefined)[0] ?? data.recenttracks.track[0];

      const wasOldTrack: boolean = currentTrack.date !== undefined;
      let timestamp = undefined;
      let whenDidHeListen = undefined;
      let currentlyListeningContent = undefined;
      if (currentTrack.date !== undefined) {
        timestamp = Number(currentTrack.date.uts) * 1000;
        whenDidHeListen = new Date(timestamp).toUTCString();
        currentlyListeningContent = `${whenDidHeListen} (<t:${timestamp / 1000}:F>)`;
      }

      const basicTrackInfo = `${currentTrack.artist["#text"]} - ${currentTrack.name}`;

      const embed: EmbedBuilder = new EmbedBuilder()
        .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
        .setTitle(basicTrackInfo)
        .setDescription(`${link("Earth's Spotify account", "https://open.spotify.com/user/divineicbm?si=30b3b0b0b2c84ccd")}`)
        .addFields([
          { name: "Album", value: `${currentTrack.album["#text"]}` },
          { name: "Link", value: `${link(`${basicTrackInfo}`, currentTrack.url)}` },
          { name: "Currently listening?", value: `${wasOldTrack ? `No, this was the last track he listened to. He listened to this track on ${currentlyListeningContent}` : `Yes, he is currently listening to this track`}` }
        ])
        .setThumbnail(currentTrack.image[2]["#text"])
        .setFooter({ text: `Data from ${link("his LastFM account", "https://www.last.fm/user/earthernsence")}`, iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

      await interaction.reply({ embeds: [embed], ephemeral: !isHelper(interaction) });
      return;
    }

    if (subcommand === "playlists") {
      const content = `As always, you can find all of earth's playlists on ${link("his Spotify account", "https://open.spotify.com/user/divineicbm?si=30b3b0b0b2c84ccd")}, but here are a few specially selected ones!
- ${link("classical music", "https://open.spotify.com/playlist/3p1S91zNhXazApp4WLti6M?si=57e193f604824ab5")}
- ${link("driving playlist", "https://open.spotify.com/playlist/1qBn6lEtahKivg5wby8q0A?si=f07f7929c4844e90")}
- ${link("programming music", "https://open.spotify.com/playlist/6r1ol14tnbAwMeb8WVcll6?si=b763bd9734a64f38")}
- ${link("everything playlist", "https://open.spotify.com/playlist/2tjyIV6wQxYewPdOZLofYS?si=f02b731b205e418e")}`;

      await interaction.reply({ content, ephemeral: !isHelper(interaction) });
      return;
    }

    if (subcommand === "spotify") {
      await interaction.reply({ content: `As requested, ${link("his Spotify account", "https://open.spotify.com/user/divineicbm?si=30b3b0b0b2c84ccd")}`, ephemeral: !isHelper(interaction) });
    }
  }
};