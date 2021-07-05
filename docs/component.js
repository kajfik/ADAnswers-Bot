/* eslint-disable max-len */
"use strict";

const commands = [
  {
    name: "1minuteinf",
    value: "explains the UI change at infinity in under a minute"
  },
  {
    name: "antitables",
    value: "Args: `prebreak`, `postbreak`, `posteternity`. Sends a guide to Antitables."
  },
  {
    name: "challenge",
    value: "Args: all challenges, including `ecs`. Returns a guide for each argument. All of these commands have shorthands as well, f.e `++challenge c2` will return the same result as `++c2`"
  },
  {
    name: "columns",
    value: "sends an image with the columns of infinity upgrades"
  },
  {
    name: "dimboostorgalaxy",
    value: "tells you if you should do a dimboost or galaxy"
  },
  {
    name: "earlyinfinity",
    value: "Describes how to progress pre-2x better Galaxies"
  },
  {
    name: "galaxyboost",
    value: "compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy"
  },
  {
    name: "galaxyscaling",
    value: "Explains the change in scaling at 100 (and 800) Antimatter Galaxies"
  },
  {
    name: "infinity",
    value: "tells how much AM you need for infinity"
  },
  {
    name: "infinitydimensions",
    value: "Describes what infinity dimensions (and infinity power) does. Includes when they unlock."
  },
  { name: "sacrifice", value: "describes sacrifice and when to" },
  { name: "achievements", value: "sends link to achievements guide" },
  {
    name: "breakinfinity",
    value: "describes break infinity and gives an order to get break infinity upgrades"
  },
  {
    name: "bugo",
    value: "sends that screenshot of the break infinity upgrade order spreadsheet"
  },
  { name: "bulkbuy", value: "describes bulk buy" },
  {
    name: "grindingforbreak",
    value: "Describes how to reach Break Infinity."
  },
  {
    name: "ipepcolor",
    value: "Explains the coloring of the IP/EP numbers on their respective reset buttons"
  },
  {
    name: "ipepcolour",
    value: "Explains the colouring of the IP/EP numbers on their respective reset buttons"
  },
  {
    name: "setcrunchauto",
    value: "Describes how to set your crunch autobuyer."
  },
  { name: "swipetrick", value: "Explains swipe trick for mobile" },
  {
    name: "161or162",
    value: "Early Eternity command. Explains whether to chose TS161 or TS162"
  },
  {
    name: "bankedinfinities",
    value: "describes banked infinities, what they do, and how to get them."
  },
  {
    name: "earlyeternityprogression",
    value: "describes getting through the first few eternities"
  },
  {
    name: "ep",
    value: "calculates the amount of IP required to get the number of EP specified. Works up to 1000. Excludes any possible multipliers."
  },
  {
    name: "eternitychallengeorder",
    value: "Has a shorthand: `++eco`. Args: highest eternity challenge you've down in the order (optional). Returns the EC order. Will show the previous EC as well when provided a specified challenge."
  },
  {
    name: "eternitygrinding",
    value: "describes how to eternity grind"
  },
  {
    name: "firstsplit",
    value: "Describes how to progress on the time study tree pre-TS171"
  },
  {
    name: "infinitygrinding",
    value: "sends how to farm infinities for banking"
  },
  { name: "respec", value: "Describes what respec studies does" },
  { name: "secondsplit", value: "describes second split paths" },
  {
    name: "studytree",
    value: "Has a shorthand: `++ts`. Generates a Time Study tree based on your total Time Theorems.\n Args: your total Time Theorems. Beginning at 54 TT, the command will take a second argument: `active`, `passive`, or `idle`. The argument is optional, and the default value is `active`."
  },
  {
    name: "contributors",
    value: "sends a list of contributors and what they helped with! this bot would not be possible without them."
  },
  {
    name: "dilationgrind",
    value: "sends a message pertaining to reaching dilation"
  },
  {
    name: "dilationtrees",
    value: "Args: `first`, `after3paths`. First is for your first Dilation (and until you get the 3 paths upgrade), and will spit out two trees: one for if you have 1e6 eternities and one if you don't. after3paths is for the tree after the three paths upgrade. By that point, you should have 1e6 eternities."
  },
  {
    name: "eternitychallenge",
    value: "Has a shorthand: `++ec`. Requires one argument: `++eternitychallenge[ECNumber]x[CompletionNumber]`. You may notice that some trees increase the number of TT you need, even though it's the same tree as the previous. This follows the Eternity Challenge guide followed by Ninjatsu, and TT can be used as something of a progress marker. For that reason, some trees have more TT than others for the same tree. Returns Total TT for a tree and then the tree."
  },
  {
    name: "meta",
    value: "Args: `lastRestart`, `uptime`, `ping`, `suggest`, `invite`. internal bot information"
  },
  { name: "pins", value: "pins" },
  {
    name: "reality",
    value: "Args: `link`, `automator`, `celestials`, `blackhole`, `reset`, `perks`, `releasedate`. Most of this information was either in an official Hevi spoiler or has been said in <#351477847090659341>. Information surrounding the upcoming reality update."
  },
  { name: "abb", value: "sends an abbreviation guide" },
  { name: "adbonus", value: "Sends ad bonus formulas/multipliers" },
  {
    name: "androidorweb",
    value: "sends the pinned message from the mobile channel describing the differences. Mobile and web have some notable differences -- mostly quality of life (QoL) changes. Due to this, many people prefer to play on mobile. Web will be essentially identical with the release of the Reality update as many of these changes were taken from there."
  },
  {
    name: "dm",
    value: "Yes, you can use the bot in your DM's with it."
  },
  {
    name: "invertedtheme",
    value: "response to the frequent web bug report that the inverted theme is bugged."
  },
  {
    name: "notations",
    value: "Sends a link to the Notations GitHub repo."
  },
  { name: "offlineticks", value: "offline ticks stuff" },
  { name: "savebank", value: "Provides a link to Buck's save bank." },
  { name: "bottombuttons", value: "shows what the bottom buttons are" },
  {
    name: "channels",
    value: "Sends a list of channels and their ids/part of game progress"
  },
  {
    name: "commands",
    value: "sends a link to the website with all commands"
  },
  { name: "decimal", value: "Explains how break_infinity.js works" },
  { name: "dilation", value: "describes dilation" },
  {
    name: "discordformatting",
    value: "returns a link to a list of discord formatting stuff"
  },
  { name: "importexport", value: "How to import/export saves" },
  { name: "modifications", value: "Explains the modifications of AD" },
  {
    name: "news",
    value: "Args: `listmobile` and `listweb`. Explains what the news ticker is and where it came from"
  },
  {
    name: "occlusion",
    value: "shows a guide of how to fix out-of-focus tabs on chrome not giving full progress"
  },
  { name: "5hours", value: "Explains the long-standing 5 hours joke" },
  {
    name: "deadchat",
    value: "sends that one message from spec that he said that one time"
  },
  {
    name: "helpnumbers",
    value: "sends what each of the help pages has on it"
  },
  { name: "justask", value: "sends a passive aggressive thing" },
  { name: "matterportal", value: "Matter Portal news tickers" },
  {
    name: "paperclips",
    value: "Explanation of the origin of paperclips."
  },
  { name: "slightsmile", value: "kaj no" },
  { name: "thanks", value: "say thanks" },
  {
    name: "xkcd",
    value: "has an arg: XKCD number. sends the link to that xkcd"
  },
  { name: "archa", value: "archa!" },
  { name: "blob", value: "blob" },
  { name: "earth", value: "who i am n shit" },
  { name: "kajfik", value: "kaj!" },
  { name: "mage", value: "mage!" },
  { name: "omsi", value: "omsi!" },
  { name: "punk", value: "punk?" },
  { name: "spectralflame", value: "spec!" },
  { name: "unsmith", value: ":unsmith:" },
  { name: "waitingidly", value: "idly!" }
];


const StuffComponent = {
  template: `
    <div style="text-align: center;">
    <h1>ADAnswersBot Command List</h1>
    <h2>Only updated on new releases of the bot. Currently v2</h2>
    <h2>Created by earth#1337 on Discord. Prefix is ++</h2>
    <h3>For more information concerning contributing to the bot, check out<br><a href="https://github.com/earthernsence/ADAnswers-Bot#readme">the general readme</a> and <a href="https://github.com/earthernsence/ADAnswers-Bot/tree/main/commands#readme">the command readme.</a> Also check out the functions.js documentation site <a href="https://earthernsence.github.io/ADAnswers-Bot/out/global.html">here!</a></h3>
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