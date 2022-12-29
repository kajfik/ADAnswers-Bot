import { ColorResolvable } from "discord.js";

interface ColourList {
    [key: string]: ColorResolvable
}

export const Colour: ColourList = {
  // General Progression
  antimatter: "#16a94d",
  infinity: "#b5813c",
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

  // Perks
  achievement: "#fbda4b",
  automation: "#ff2a1f",

  // TODO: Celestials
  // teresa: "#",
  // effarig: "#",
  // Is it "nameless", or "enslaved"?

};