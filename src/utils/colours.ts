import { ColorResolvable } from "discord.js";

interface ColourList {
    [key: string]: ColorResolvable
}

export const Colour: ColourList = {
  // General Progression
  antimatter: "#16a94d",
  infinity: "#b5813c",
  replication: "#03a9f4",
  eternity: "#b540df",
  dilation: "#5ddd33",
  reality: "#026016",
  celestial: "#5151ec",

  // Time Studies
  normal: "#b640dd",
  time: "#b640dd",
  active: "#e6241b",
  passive: "#632fb3",
  idle: "#297bfb",
  light: "#ffffff",
  dark: "#000000",
  forbidden: "#ff0000",
  triad: "#ead584",

  // Perks
  achievement: "#fbda4b",
  automation: "#ff2a1f",

  // Celestials
  teresa: "#5151ec",
  effarig: "#d13737",
  nameless: "#f1aa7f",
  v: "#ead584",
  ra: "#9575cd",
  laitela: "#ffffff",
  pelle: "#dc143c"
};