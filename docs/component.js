/* eslint-disable max-len */
"use strict";

// It's used in the vue within a string, so it's not actually registering as being used.
// eslint-disable-next-line no-unused-vars
const commands = [
  {
    name: "161or162",
    value: "Early Eternity command. Explains whether to chose TS161 or TS162"
  },
  {
    name: "1minuteinf",
    value: "explains the UI change at infinity in under a minute"
  },
  { name: "5hours", value: "Explains the long-standing 5 hours joke" },
  { name: "abb", value: "sends an abbreviation guide" },
  { name: "achievements", value: "sends link to achievements guide" },
  { name: "adbonus", value: "Sends ad bonus formulas/multipliers" },
  {
    name: "androidorweb",
    value: "sends the pinned message from the mobile channel describing the differences. Mobile and web have some notable differences -- mostly quality of life (QoL) changes. Due to this, many people prefer to play on mobile. Web will be essentially identical with the release of the Reality update as many of these changes were taken from there."
  },
  {
    name: "antitables",
    value: "Args: `prebreak`, `postbreak`, `posteternity`. Sends a guide to Antitables."
  },
  { name: "archa", value: "archa!" },
  {
    name: "bankedinfinities",
    value: "describes banked infinities, what they do, and how to get them."
  },
  { name: "blob", value: "blob" },
  { name: "bottombuttons", value: "shows what the bottom buttons are" },
  {
    name: "breakinfinity",
    value: "describes break infinity and gives an order to get break infinity upgrades"
  },
  {
    name: "bugo",
    value: "sends that screenshot of the break infinity upgrade order spreadsheet"
  },
  { name: "bulkbuy", value: "describes bulk buy" },
  { name: "c9", value: "shorthand for `++challenge c9`" },
  {
    name: "challenge",
    value: "Args: all challenges, including `ecs`. Returns a guide for each argument. All of these commands have shorthands as well, f.e `++challenge c2` will return the same result as `++c2`"
  },
  {
    name: "challengecodes",
    value: 'Sends a picture with all of the challenges notated with their "code"'
  },
  {
    name: "changeectree",
    value: "Describes how to change your tree for doing an EC"
  },
  {
    name: "channels",
    value: "Sends a list of channels and their ids/part of game progress"
  },
  {
    name: "columns",
    value: "sends an image with the columns of infinity upgrades"
  },
  {
    name: "commands",
    value: "sends a link to the website with all commands"
  },
  {
    name: "contributors",
    value: "sends a list of contributors and what they helped with! this bot would not be possible without them."
  },
  {
    name: "deadchat",
    value: "sends that one message from spec that he said that one time"
  },
  { name: "decimal", value: "Explains how break_infinity.js works" },
  { name: "dilation", value: "describes dilation" },
  {
    name: "dilationgrind",
    value: "sends a message pertaining to reaching dilation"
  },
  {
    name: "dilationtrees",
    value: "Args: `first`, `after3paths`. First is for your first Dilation (and until you get the 3 paths upgrade), and will spit out two trees: one for if you have 1e6 eternities and one if you don't. after3paths is for the tree after the three paths upgrade. By that point, you should have 1e6 eternities."
  },
  {
    name: "dimboostorgalaxy",
    value: "tells you if you should do a dimboost or galaxy"
  },
  {
    name: "discordformatting",
    value: "returns a link to a list of discord formatting stuff"
  },
  {
    name: "dm",
    value: "Yes, you can use the bot in your DM's with it."
  },
  {
    name: "earlyeternityprogression",
    value: "describes getting through the first few eternities"
  },
  {
    name: "earlyinfinity",
    value: "Describes how to progress pre-2x better Galaxies"
  },
  { name: "earth", value: "who i am n shit" },
  { name: "ec", value: "shorthand for ++eternitychallenge" },
  {
    name: "eco",
    value: "Has a shorthand: `++eco`. Args: highest eternity challenge you've down in the order (optional). Returns the EC order. Will show the previous EC as well when provided a specified challenge."
  },
  { name: "ecs", value: "shorthand for `++challenge ecs`" },
  { name: "eep", value: "shorthand for ++earlyeternityprogression" },
  {
    name: "ep",
    value: "calculates the amount of IP required to get the number of EP specified. Works up to 1000. Excludes any possible multipliers."
  },
  {
    name: "eternitychallenge",
    value: "Has a shorthand: `++ec`. Requires one argument: `++eternitychallenge [ECNumber]x[CompletionNumber]`. You may notice that some trees increase the number of TT you need, even though it's the same tree as the previous. This follows the Eternity Challenge guide followed by Ninjatsu, and TT can be used as something of a progress marker. For that reason, some trees have more TT than others for the same tree. Returns Total TT for a tree and then the tree."
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
    name: "failec",
    value: "Describes what ECs you can fail and how/when"
  },
  {
    name: "firstsplit",
    value: "Describes how to progress on the time study tree pre-TS171"
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
    name: "grindingforbreak",
    value: "Describes how to reach Break Infinity."
  },
  {
    name: "helpnumbers",
    value: "sends what each of the help pages has on it"
  },
  { name: "ic4", value: "shorthand for `++challenge ic4`" },
  { name: "ic5", value: "shorthand for `++challenge ic5`" },
  { name: "importexport", value: "How to import/export saves" },
  {
    name: "infinity",
    value: "tells how much AM you need for infinity"
  },
  {
    name: "infinitydimensions",
    value: "Describes what infinity dimensions (and infinity power) does. Includes when they unlock."
  },
  {
    name: "infinitygrinding",
    value: "Args: `early`, `late`. Sends how to grind infinities for each of those time periods. Early is for EC4, late is for banking infinities."
  },
  {
    name: "invertedtheme",
    value: "response to the frequent web bug report that the inverted theme is bugged."
  },
  {
    name: "ipepcolor",
    value: "Explains the coloring of the IP/EP numbers on their respective reset buttons"
  },
  {
    name: "ipepcolour",
    value: "Explains the colouring of the IP/EP numbers on their respective reset buttons"
  },
  { name: "justask", value: "sends a passive aggressive thing" },
  { name: "kajfik", value: "kaj!" },
  { name: "mage", value: "mage!" },
  { name: "matterportal", value: "Matter Portal news tickers" },
  {
    name: "meta",
    value: "Args: `lastrestart`, `uptime`, `ping`, `suggest`, `invite`, `contributing`. internal bot information"
  },
  { name: "modifications", value: "Explains the modifications of AD" },
  {
    name: "news",
    value: "Args: `listmobile` and `listweb`. Explains what the news ticker is and where it came from"
  },
  {
    name: "notations",
    value: "Sends a link to the Notations GitHub repo."
  },
  {
    name: "occlusion",
    value: "shows a guide of how to fix out-of-focus tabs on chrome not giving full progress"
  },
  { name: "offlineticks", value: "offline ticks stuff" },
  { name: "omsi", value: "omsi!" },
  {
    name: "oom",
    value: "describes what an OoM (Order of Magnitude) is"
  },
  {
    name: "paperclips",
    value: "Explanation of the origin of paperclips."
  },
  { name: "pins", value: "pins" },
  { name: "punk", value: "punk?" },
  {
    name: "reality",
    value: "Args: `link`, `automator`, `celestials`, `blackhole`, `reset`, `perks`, `releasedate`. Most of this information was either in an official Hevi spoiler or has been said in <#351477847090659341>. Information surrounding the upcoming reality update."
  },
  { name: "respec", value: "Describes what respec studies does" },
  { name: "sacrifice", value: "describes sacrifice and when to" },
  { name: "savebank", value: "Provides a link to Buck's save bank." },
  { name: "secondsplit", value: "describes second split paths" },
  {
    name: "setcrunchauto",
    value: "Describes how to set your crunch autobuyer."
  },
  { name: "site", value: "Says the game site" },
  { name: "slightsmile", value: "kaj no" },
  { name: "spectralflame", value: "spec!" },
  {
    name: "studytree",
    value: "Has a shorthand: `++ts`. Generates a Time Study tree based on your total Time Theorems.\n" +
      "  Args: your total Time Theorems. Beginning at 54 TT, the command will take a second argument: `active`, `passive`, or `idle`. The argument is optional, and the default value is `active`."
  },
  { name: "swipetrick", value: "Explains swipe trick for mobile" },
  { name: "thanks", value: "say thanks" },
  { name: "ts", value: "shorthand for `++studytree`" },
  {
    name: "tstreerange",
    value: "Says why sometimes the bot will recommend a tree for more TT than you have"
  },
  { name: "unsmith", value: ":unsmith:" },
  { name: "waitingidly", value: "idly!" },
  {
    name: "xkcd",
    value: "has an arg: XKCD number. sends the link to that xkcd"
  }
];


const StuffComponent = {
  template: `
    <div style="text-align: center;">
    <h1>ADAnswersBot Command List</h1>
    <h2>Only updated on new releases of the bot. Currently v3</h2>
    <h2>Created by earth#1337 on Discord. Prefix is /</h2>
    <h3>For more information concerning contributing to the bot, check out<br><a href="https://github.com/earthernsence/ADAnswers-Bot#readme">the general readme</a> and <a href="https://github.com/earthernsence/ADAnswers-Bot/tree/main/commands#readme">the command readme.</a> Also check out the functions.js documentation site <a href="https://earthernsence.github.io/ADAnswers-Bot/out/global.html">here!</a></h3>
      <div v-for="command in commands">
        <h2>{{ command.name }}</h2>
        <p>{{ command.value }}</p>
      </div>
    </div>
  `
};

// It is???????????????
// eslint-disable-next-line no-unused-vars
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