import fetch from "node-fetch";
import { lastfm } from "../config.json";

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

interface CurrentTrackInformation {
  currentTrack: Track,
  basicTrackInfo: string,
  currentlyListeningContent: string,
  wasOldTrack: boolean
}

export class MusicHandler {
  public static async current(): Promise<CurrentTrackInformation> {
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

    return {
      currentTrack,
      basicTrackInfo,
      currentlyListeningContent,
      wasOldTrack
    };
  }

  private getNextPage(currentPage: number, up: boolean) {
    const possiblePages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let index: number = possiblePages.indexOf(currentPage);

    if (up) index++;
    else index--;

    index = (index + possiblePages.length) % possiblePages.length;

    return possiblePages[index];
  }
}