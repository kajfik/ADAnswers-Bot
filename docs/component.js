/* eslint-disable max-len */
"use strict";

const commands = [
  {
    name: "161or162",
    value: "Explains whether to chose TS161 or TS162"
  },
  { name: "5hours", value: "Explains the long-standing 5 hours joke" },
  { name: "adbonus", value: "Sends ad bonus formulas/multipliers" },
  {
    name: "challenge",
    value: "Args: `c9`, `ic4`, `ic5`, `ecs`. Returns a guide for each argument."
  },
  { name: "decimal", value: "Explains how break_infinity.js works" },
  { name: "dilation", value: "describes dilation" },
  {
    name: "dilationgrind",
    value: "sends a message pertaining to reaching dilation"
  },
  {
    name: "earlyeternityprogression",
    value: "describes getting through the first few eternities"
  },
  {
    name: "earlyinfinity",
    value: "Describes how to progress pre-2x better Galaxies"
  },
  {
    name: "earlytimestudies",
    value: "Describes how to progress on the time study tree pre-TS171"
  },
  { name: "achievements", value: "sends link to achievements guide" },
  {
    name: "dimboostorgalaxy",
    value: "tells if you should do a dimboost or galaxy"
  },
  {
    name: "galaxyscaling",
    value: "Explains the change in scaling at 100 (and 800) Antimatter Galaxies"
  },
  {
    name: "grindingforbreak",
    value: "Describes how to reach Break Infinity."
  },
  {
    name: "infinity",
    value: "tells how much AM you need for infinity"
  },
  {
    name: "ipepcolor",
    value: "Explains the coloring of the IP/EP numbers on their respective reset buttons"
  },
  {
    name: "ipepcolour",
    value: "Explains the colouring of the IP/EP numbers on their respective reset buttons"
  },
  { name: "matterportal", value: "Matter Portal news tickers" },
  {
    name: "meta",
    value: "Args: `lastRestart`, `uptime`, `ping`, `suggest`. internal bot information"
  },
  { name: "modifications", value: "Explains the modifications of AD" },
  { name: "offlineticks", value: "offline ticks stuff" },
  {
    name: "paperclips",
    value: "Explanation of the origin of paperclips."
  },
  { name: "pins", value: "pins" },
  {
    name: "reality",
    value: "Args: `link`, `automator`, `celestials`, `blackhole`, `reset`, `perks`, `releasedate`. Most of this information was either in an official Hevi spoiler or has been said in #development. Information surrounding the upcoming reality update."
  },
  { name: "respec", value: "Describes what respec studies does" },
  { name: "sacrifice", value: "describes when to sac" },
  { name: "savebank", value: "Provides a link to Buck's save bank." },
  {
    name: "setcrunchauto",
    value: "Describes how to set your crunch autobuyer."
  },
  { name: "slightsmile", value: "kaj no" },
  { name: "unsmith", value: ":unsmith:" },
  {
    name: "antitables",
    value: "Args: `prebreak`, `postbreak`, `posteternity`. Sends a guide to Antitables."
  },
  { name: "bulkbuy", value: "describes bulk buy" },
  {
    name: "dilationtrees",
    value: "Args: `first`, `after3paths`. First is for your first Dilation (and until you get the 3 paths upgrade), and will spit out two trees: one for if you have 1e6 eternities and one if you don't. after3paths is for the tree after the three paths upgrade. By that point, you should have 1e6 eternities."
  },
  {
    name: "discordformatting",
    value: "returns a link to a list of discord formatting stuff"
  },
  {
    name: "eternitychallenge",
    value: "Requires two arguments: `++eternitychallenge [ECNumber] [CompletionNumber]`. You may notice that some trees increase the number of TT you need, even though it's the same tree as the previous. This follows the Eternity Challenge guide followed by Ninjatsu, and TT can be used as something of a progress marker. For that reason, some trees have more TT than others for the same tree. Returns Total TT for a tree and then the tree."
  },
  {
    name: "eternitychallengeorder",
    value: "Args: highest eternity challenge you've down in the order (optional).Returns the EC order"
  },
  { name: "importexport", value: "How to import/export saves" },
  {
    name: "news",
    value: "Args: `list mobile` and `list web`. Explains what the news ticker is and where it came from"
  },
  {
    name: "notations",
    value: "Sends a link to the Notations GitHub repo."
  },
  {
    name: "studytree",
    value: "Args: your total Time Theorems. Beginning at 54 TT (and until 120 TT), the command will take a second argument: `active`, `passive`, or `idle`. This command requires an arg. Generates a Time Study tree based on your total Time Theorems."
  },
  {
    name: "1minuteinf",
    value: "explains the UI change at infinity in under a minute"
  },
  {
    name: "androidorweb",
    value: "sends the pinned message from the mobile channel describing the differences. Mobile and web have some notable differences -- mostly quality of life (QoL) changes. Due to this, many people prefer to play on mobile. Web will be essentially identical with the release of the Reality update as many of these changes were taken from there."
  },
  {
    name: "bankedinfinities",
    value: "describes banked infinities, what they do, and how to get them."
  },
  {
    name: "breakinfinity",
    value: "describes break infinity and gives an order to get break infinity upgrades"
  },
  { name: "c9", value: "shorthand for `++challenge c9`" },
  { name: "ecs", value: "shorthand for `++challenge ecs`" },
  { name: "ic4", value: "shorthand for `++challenge ic4`" },
  { name: "ic5", value: "shorthand for `++challenge ic5`" },
  {
    name: "infinitydimensions",
    value: "Describes what infinity dimensions (and infinity power) does. Includes when they unlock."
  },
  {
    name: "invertedtheme",
    value: "response to the frequent web bug report that the inverted theme is bugged."
  },
  { name: "archa", value: "archa!" },
  { name: "blob", value: "blob" },
  { name: "earth", value: "who i am n shit" },
  { name: "kajfik", value: "kaj!" },
  { name: "mage", value: "mage!" },
  { name: "omsi", value: "omsi!" },
  { name: "punk", value: "punk?" },
  { name: "spectralflame", value: "spec!" },
  { name: "waitingidly", value: "idly!" }
];


const StuffComponent = {
  template: `
    <div style="text-align: center;">
    <h1>ADAnswersBot Command List</h1>
    <h2>Only updated on new releases of the bot. Currently v1.1</h2>
    <h2>Created by earth#1337 on Discord. Prefix is ++</h2>
      <div v-for="command in commands">
        <h2>{{ command.name }}</h2>
        <p>{{ command.value }}</p>
      </div>
    </div>
  `
};

let vue;

window.onload = () => {
  vue = new Vue({
    el: "#vue",
    components: {
      component: StuffComponent
    },
    template: "<component/>"
  });
};