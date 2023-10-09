import { ActivityType, ApplicationCommandType, Client, ContextMenuCommandBuilder } from "discord.js";
import { Model, ModelStatic, Sequelize } from "sequelize";
import { ids, lastfm } from "../config.json";
import { Commands } from "../commands";
import { PresenceMessage } from "../functions/presence";
import fetch from "node-fetch";

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

export default (client: Client, databases: Sequelize[], tagsArray: ModelStatic<Model>[]): void => {
  client.on("ready", async() => {
    if (!client.user || !client.application) {
      console.log("Missing user or application. Restart the bot.");
      return;
    }

    for (const database of databases) {
      await database.authenticate();
      console.log(`Authenticated ${database.getDatabaseName()}`);
    }

    for (const tag of tagsArray) {
      tag.sync();
      console.log(`Synced ${tag.name}`);
    }

    try {
      await client.application.commands.set(Commands);
      await client.application.commands.create(new ContextMenuCommandBuilder()
        .setName("Report message")
        .setType(ApplicationCommandType.Message));
      console.log("Commands globally deployed.");
      await client.guilds.cache.get(ids.testServer)?.commands.set(Commands);
      await client.guilds.cache.get(ids.testServer)?.commands.create(new ContextMenuCommandBuilder()
        .setName("Report message")
        .setType(ApplicationCommandType.Message));
      console.log("Commands deployed to test server.");
    } catch (e) {
      console.log(e);
    }

    async function setBotStatus(): Promise<void> {
      // First we'll check if I'm listening to anything. If not, we'll use our standard
      // repertoire of activity presence messages.
      // This *is* slightly demanding, fetching this every 15 seconds. It is ok
      const response = await fetch(`${lastfm.api}?method=user.getrecenttracks&user=${lastfm.username}&api_key=${lastfm.key}&format=json`);
      const data = await response.json();
      const currentTrack: Track = data.recenttracks.track.filter((track: Track) => track["@attr"] !== undefined)[0] ?? data.recenttracks.track[0];
      if (currentTrack.date === undefined) {
        const basicTrackInfo = `${currentTrack.artist["#text"]} - ${currentTrack.name}`;
        client.user?.setActivity(basicTrackInfo, { type: ActivityType.Listening });
        return;
      }

      const next = PresenceMessage.next();
      client.user?.setActivity(next, { type: ActivityType.Listening });
    }

    setInterval(setBotStatus, 15000);

    console.log(`${client.user.username} is online`);
  });
};