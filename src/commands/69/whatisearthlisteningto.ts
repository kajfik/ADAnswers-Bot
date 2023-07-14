import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";
import { currentListeningSubcommand } from "./whatisearthlisteningto/current";
import { topAlbumsSubcommand } from "./whatisearthlisteningto/topAlbums";
import { topArtistsSubcommand } from "./whatisearthlisteningto/topArtists";
import { topTracksSubcommand } from "./whatisearthlisteningto/topTracks";

const periodChoices = ["overall", "7day", "1month", "3month", "6month", "12month"].map(choice => ({ name: choice, value: choice }));

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
      name: "top",
      description: "earth's top artists, albums, or tracks!",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "artists",
          description: "fetch earth's top artists",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "period",
              description: "The period over which to search",
              type: ApplicationCommandOptionType.String,
              required: false,
              choices: periodChoices
            }
          ]
        },
        {
          name: "albums",
          description: "fetch earth's top albums",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "period",
              description: "The period over which to search",
              type: ApplicationCommandOptionType.String,
              required: false,
              choices: periodChoices
            }
          ]
        },
        {
          name: "tracks",
          description: "fetch earth's top tracks",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "period",
              description: "The period over which to search",
              type: ApplicationCommandOptionType.String,
              required: false,
              choices: periodChoices
            }
          ]
        },
      ]
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

    const isTopRequested = interaction.options.getSubcommandGroup();
    const subcommand = interaction.options.getSubcommand();

    if (isTopRequested !== null) {
      if (subcommand === "artists") {
        topArtistsSubcommand(interaction);
        return;
      }
      if (subcommand === "albums") {
        topAlbumsSubcommand(interaction);
        return;
      }
      if (subcommand === "tracks") {
        topTracksSubcommand(interaction);
        return;
      }
    }

    if (subcommand === "current") {
      currentListeningSubcommand(interaction);
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