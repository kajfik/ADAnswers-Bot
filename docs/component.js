/* eslint-disable max-len */
"use strict";

// eslint-disable-next-line no-unused-vars
const newCommands = [
  {
    name: "161or162",
    value: "Early Eternity command. Explains whether to chose TS161 or TS162",
    type: undefined,
    check: "earlyEternityCheck",
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "1minuteinf",
    value: "explains the UI change at infinity in under a minute",
    type: undefined,
    check: "earlyGameCheck",
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "5hours",
    value: "Explains the long-standing 5 hours joke",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "abb",
    value: "sends an abbreviation guide",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "achievements",
    value: "sends link to achievements guide",
    type: undefined,
    check: true,
    acceptableArgs: [
      "r23", "r28",
      "r36", "r41",
      "r71", "r43", "r77",
      "r81", "r87",
      "r91", "r92", "r97",
      "r107",
      "r116", "r108",
      "r111", "r114",
      "r125", "r126",
      "r131", "r133",
      "r134",
    ],
    page: 2
  },
  {
    name: "adbonus",
    value: "Sends ad bonus formulas/multipliers",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "androidorweb",
    value: "sends the pinned message from the mobile channel describing the differences. Mobile and web have some notable differences -- mostly quality of life (QoL) changes. Due to this, many people prefer to play on mobile. Web will be essentially identical with the release of the Reality update as many of these changes were taken from there.",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "antitables",
    value: "Args: `prebreak`, `postbreak`, `posteternity`. Sends a guide to Antitables.",
    type: undefined,
    check: true,
    acceptableArgs: ["prebreak", "postbreak", "posteternity"],
    page: 1
  },
  {
    name: "archa",
    value: "archa!",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "bankedinfinities",
    value: "describes banked infinities, what they do, and how to get them.",
    type: undefined,
    check: "bankedInfsCheck",
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "blob",
    value: "blob",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "bottombuttons",
    value: "shows what the bottom buttons are",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "breakinfinity",
    value: "describes break infinity and gives an order to get break infinity upgrades",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "bugo",
    value: "sends that screenshot of the break infinity upgrade order spreadsheet",
    type: undefined,
    check: "breakCheck",
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "bulkbuy",
    value: "describes bulk buy",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "c9",
    value: "shorthand for `/challenge c9`",
    type: "shorthand",
    check: "earlyInfinityCheck",
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "challenge",
    value: "Args: all challenges, including `ecs`. Returns a guide for each argument. All of these commands have shorthands as well, f.e `/challenge c9` will return the same result as `/c9`",
    type: undefined,
    check: true,
    acceptableArgs: [
      "c1", "c2", "c3", "c4",
      "c5", "c6", "c7", "c8",
      "c9", "c10", "c11", "c12",
      "ic1", "ic2", "ic3", "ic4",
      "ic5", "ic6", "ic7", "ic8",
      "ecs"
    ],
    page: 1
  },
  {
    name: "challengecodes",
    value: 'Sends a picture with all of the challenges notated with their "code"',
    type: undefined,
    check: "earlyInfinityCheck",
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "changeectree",
    value: "Describes how to change your tree for doing an EC",
    type: undefined,
    check: "ecsCheck",
    acceptableArgs: undefined,
    page: 4
  },
  {
    name: "channels",
    value: "Sends a list of channels and their ids/part of game progress",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "columns",
    value: "sends an image with the columns of infinity upgrades",
    type: undefined,
    check: "earlyGame",
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "commands",
    value: "sends a link to the website with all commands",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "contributors",
    value: "sends a list of contributors and what they helped with! this bot would not be possible without them.",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 4
  },
  {
    name: "deadchat",
    value: "sends that one message from spec that he said that one time",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "decimal",
    value: "Explains how break_infinity.js works",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "dilation",
    value: "describes dilation",
    type: undefined,
    check: "endgameCheck",
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "dilationgrind",
    value: "sends a message pertaining to reaching dilation",
    type: undefined,
    check: "dilationGrindCheck",
    acceptableArgs: undefined,
    page: 4
  },
  {
    name: "dilationtrees",
    value: "Args: `first`, `after3paths`. First is for your first Dilation (and until you get the 3 paths upgrade), and will spit out two trees: one for if you have 1e6 eternities and one if you don't. after3paths is for the tree after the three paths upgrade. By that point, you should have 1e6 eternities.",
    type: undefined,
    check: "endgameCheck",
    acceptableArgs: ["first", "after3paths"],
    page: 4
  },
  {
    name: "dimboostorgalaxy",
    value: "tells you if you should do a dimboost or galaxy",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "discordformatting",
    value: "returns a link to a list of discord formatting stuff",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "dm",
    value: "Yes, you can use the bot in your DM's with it.",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "earlyeternityprogression",
    value: "describes getting through the first few eternities",
    type: undefined,
    check: "earlyEternityCheck",
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "earlyinfinity",
    value: "Describes how to progress pre-2x better Galaxies",
    type: undefined,
    check: "earlyInfinityCheck",
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "earth",
    value: "who i am n shit",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "ec",
    value: "shorthand for /eternitychallenge",
    type: "shorthand",
    check: "ecsCheck",
    acceptableArgs: [
      "All ECs"
    ],
    page: 6
  },
  {
    name: "eco",
    value: "Has a shorthand: `/eco`. Args: highest eternity challenge you've down in the order (optional). Returns the EC order. Will show the previous EC as well when provided a specified challenge.",
    type: "shorthand",
    check: "ecsCheck",
    acceptableArgs: [
      "All ECs"
    ],
    page: 3
  },
  {
    name: "ecs",
    value: "shorthand for `/challenge ecs`",
    type: "shorthand",
    check: "ecsCheck",
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "eep",
    value: "shorthand for /earlyeternityprogression",
    type: "shorthand",
    check: "earlyEternityCheck",
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "ep",
    value: "calculates the amount of IP required to get the number of EP specified. Works up to 1000. Excludes any possible multipliers.",
    type: undefined,
    check: "earlyEternityCheck",
    acceptableArgs: ["any number within 2-1000"],
    page: 3
  },
  {
    name: "eternitychallenge",
    value: "Has a shorthand: `/ec`. Requires one argument: `/eternitychallenge [ECNumber]x[CompletionNumber]`. You may notice that some trees increase the number of TT you need, even though it's the same tree as the previous. This follows the Eternity Challenge guide followed by Ninjatsu, and TT can be used as something of a progress marker. For that reason, some trees have more TT than others for the same tree. Returns Total TT for a tree and then the tree.",
    type: undefined,
    check: "ecsCheck",
    acceptableArgs: [
      "All ECs"
    ],
    page: 4
  },
  {
    name: "eternitychallengeorder",
    value: "Has a shorthand: `/eco`. Args: highest eternity challenge you've down in the order (optional). Returns the EC order. Will show the previous EC as well when provided a specified challenge.",
    type: undefined,
    check: "ecsCheck",
    acceptableArgs: [
      "All ECs."
    ],
    page: 3
  },
  {
    name: "eternitygrinding",
    value: "describes how to eternity grind",
    type: undefined,
    check: "eternityGrindingCheck",
    acceptableArgs: ["early", "late"],
    page: 3
  },
  {
    name: "failec",
    value: "Describes what ECs you can fail and how/when",
    type: undefined,
    check: "ecsCheck",
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "firstsplit",
    value: "Describes how to progress on the time study tree pre-TS171",
    type: undefined,
    check: "earlyEternityCheck",
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "galaxyboost",
    value: "compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy",
    type: undefined,
    check: "earlyGame",
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "galaxyscaling",
    value: "Explains the change in scaling at 100 (and 800) Antimatter Galaxies",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "grindingforbreak",
    value: "Describes how to reach Break Infinity.",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "helpnumbers",
    value: "sends what each of the help pages has on it",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "ic4",
    value: "shorthand for `/challenge ic4`",
    type: "shorthand",
    check: "weirdICsCheck",
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "ic5",
    value: "shorthand for `/challenge ic5`",
    type: "shorthand",
    check: "weirdICsCheck",
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "importexport",
    value: "How to import/export saves",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "infinity",
    value: "tells how much AM you need for infinity",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "infinitydimensions",
    value: "Describes what infinity dimensions (and infinity power) does. Includes when they unlock.",
    type: undefined,
    check: "breakCheck",
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "infinitygrinding",
    value: "Args: `early`, `late`. Sends how to grind infinities for each of those time periods. Early is for EC4, late is for banking infinities.",
    type: undefined,
    check: "ecsPlusCheck",
    acceptableArgs: ["early", "late"],
    page: 3
  },
  {
    name: "invertedtheme",
    value: "response to the frequent web bug report that the inverted theme is bugged.",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "ipepcolor",
    value: "Explains the coloring of the IP/EP numbers on their respective reset buttons",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "ipepcolour",
    value: "Explains the colouring of the IP/EP numbers on their respective reset buttons",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "justask",
    value: "sends a passive aggressive thing",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "kajfik",
    value: "kaj!",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "mage",
    value: "mage!",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "matterportal",
    value: "Matter Portal news tickers",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "meta",
    value: "internal bot information",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 4
  },
  {
    name: "modifications",
    value: "Explains the modifications of AD",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "news",
    value: "Args: `listmobile` and `listweb`. Explains what the news ticker is and where it came from",
    type: undefined,
    check: true,
    acceptableArgs: ["listmobile", "listweb"],
    page: 6
  },
  {
    name: "notations",
    value: "Sends a link to the Notations GitHub repo.",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "occlusion",
    value: "shows a guide of how to fix out-of-focus tabs on chrome not giving full progress",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "offlineticks",
    value: "offline ticks stuff",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "omsi",
    value: "omsi!",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "oom",
    value: "describes what an OoM (Order of Magnitude) is",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "paperclips",
    value: "Explanation of the origin of paperclips.",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "pins",
    value: "pins",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 4
  },
  {
    name: "punk",
    value: "punk?",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "reality",
    value: "Args: `link`, `automator`, `celestials`, `blackhole`, `reset`, `perks`, `releasedate`. Most of this information was either in an official Hevi spoiler or has been said in <#351477847090659341>. Information surrounding the upcoming reality update.",
    type: undefined,
    check: "e4000Check",
    acceptableArgs: [
      "link",
      "automator",
      "perks",
      "celestials",
      "blackhole",
      "reset",
      "releasedate"
    ],
    page: 4
  },
  {
    name: "respec",
    value: "Describes what respec studies does",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "sacrifice",
    value: "describes sacrifice and when to",
    type: undefined,
    check: "earlyGame",
    acceptableArgs: undefined,
    page: 1
  },
  {
    name: "savebank",
    value: "Provides a link to Buck's save bank.",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 5
  },
  {
    name: "secondsplit",
    value: "describes second split paths",
    type: undefined,
    check: "earlyEternityCheck",
    acceptableArgs: undefined,
    page: 3
  },
  {
    name: "setcrunchauto",
    value: "Describes how to set your crunch autobuyer.",
    type: undefined,
    check: "setCrunchAutoCheck",
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "site",
    value: "Says the game site",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 6
  },
  {
    name: "slightsmile",
    value: "kaj no",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "spectralflame",
    value: "spec!",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "studytree",
    value: "Has a shorthand: `/ts`. Generates a Time Study tree based on your total Time Theorems.\n" +
      "  Args: your total Time Theorems. Beginning at 54 TT, the command will take a second argument: `active`, `passive`, or `idle`. The argument is optional, and the default value is `active`.",
    type: undefined,
    check: "studyTreeCheck",
    acceptableArgs: [["Any number"], ["active", "passive", "idle"]],
    page: 3
  },
  {
    name: "swipetrick",
    value: "Explains swipe trick for mobile",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 2
  },
  {
    name: "thanks",
    value: "say thanks",
    type: undefined,
    check: true,
    acceptableArgs: undefined,
    page: 7
  },
  {
    name: "ts",
    value: "shorthand for `/studytree`",
    type: "shorthand",
    check: "studyTreeCheck",
    acceptableArgs: [["Any number"], ["active", "passive", "idle"]],
    page: 6
  },
  {
    name: "tstreerange",
    value: "Says why sometimes the bot will recommend a tree for more TT than you have",
    type: undefined,
    check: "studyTreeCheck",
    acceptableArgs: undefined,
    page: 4
  },
  {
    name: "unsmith",
    value: ":unsmith:",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "waitingidly",
    value: "idly!",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: undefined,
    page: 69
  },
  {
    name: "xkcd",
    value: "has an arg: XKCD number. sends the link to that xkcd",
    type: undefined,
    check: "botCommandsCheck",
    acceptableArgs: ["Any number"],
    page: 7
  }
];

let uiUpdateHooks = [];

function updateUI() {
  for (const hook of uiUpdateHooks) {
    hook.update();
  }
}

Vue.mixin({
  created() {
    if (this.update) {
      uiUpdateHooks.push(this);
      this.update();
    }
  },
  destroyed() {
    uiUpdateHooks = uiUpdateHooks.filter(h => h !== this);
  }
});


// This has to be made here because it's a website, so require() is not something you can do.
/**
 * Turns Date into decimal time
 * @param {Date} date Date object. Has to be new Date() invoked.
 * @returns {String} A string of the time in the format of "Days:Hours:Minutes:Seconds"
 */
function getDecimalTimeFromNormalPeopleTimeLikeTheOneThatNormalPeopleUseFuckingTwentyFourHourTime(time, isMS = false, ms) {
  let hours = 0,
    minutes = 0,
    seconds = 0;
  if (isMS) {
    const dc = convertMillisecondsToDigitalClock(ms);
    hours = dc.hours;
    minutes = dc.minutes;
    seconds = dc.seconds;
  } else {
    hours = time.getHours();
    minutes = time.getMinutes();
    seconds = time.getSeconds();
  }
  const ns = Math.floor(((hours * 60 * 60) + (minutes * 60) + (seconds)) / 0.864);
  // Courtesy of spec.
  const aa = `0000${ns.toString()}`.replace(/^.*(.{5})$/u, "$1");
  

  const arr = [aa.substr(0, 1), aa.substr(1, 2), aa.substr(3, 2)];

  return arr.join(":");
}

const StuffComponent = {
  data() {
    return {
      time: Date,
    };
  },
  methods: {
    update() {
      this.time = new Date();
    },
    commandCheck(command) {
      if (command.check === true) return `Works in all channels.`;
      const checkMessages = {
        earlyGame: "This command only works in the early game channel(s), bot commands, or the common channels.",
        earlyInfinity: "This command only works in the early Infinity channel(s), bot commands, or the common channels.",
        breakCheck: "This command only works in the Break Infinity channel(s), bot commands, or the common channels.",
        setCrunchAutoCheck: "This command only works in the early Break Infinity channel(s), bot commands, or the common channels.",
        earlyEternityCheck: "This command only works in the early Eternity channel(s), bot commands, or the common channels.",
        studyTreeCheck: "This command only works in the Eternity channel(s), bot commands, or the common channels.",
        get "eternityGrindingCheck"() { return this.studyTreeCheck; },
        ecsCheck: "This command only works in the Eternity Challenge channel(s), bot commands, or the common channels.",
        ecsPlusCheck: "This command only works in the Eternity Challenge channel(s), endgame channels, bot commands, or the common channels.",
        botCommandsCheck: "This is a miscellaneous command and is only allowed in #bot-commands",
        bankedInfsCheck: "This command only works in the post-TS181 channel and on. You can also use #bot-commands!",
        dilationGrindCheck: "This command only works in the channel directly before Dilation, bot commands, or the common channels.",
        endgameCheck: "This command only works in the endgame channel(s), bot commands, or the common channels.",
        e4000Check: "This command only works in the e4000 EP channel(s), bot commands, or the common channels.",
        weirdICsCheck: "This command only works in the Break Infinity channel(s), early Eternity channels, bot commands, or the common channels."
      };
      return checkMessages[command.check];
    },
  },
  computed: {
    getCurrentTime() {
      return `Time is ${getDecimalTimeFromNormalPeopleTimeLikeTheOneThatNormalPeopleUseFuckingTwentyFourHourTime(this.time)}`;
    },
  },
  template: `
    <div style="text-align: center;">
    <h1>ADAnswersBot Command List</h1>
    <h2>Only updated on new releases of the bot. Currently v3</h2>
    <h2>Created by earth#1337 on Discord. Prefix is /</h2>
    <h3>For more information concerning contributing to the bot, check out<br><a href="https://github.com/earthernsence/ADAnswers-Bot#readme">the general readme</a> and <a href="https://github.com/earthernsence/ADAnswers-Bot/tree/main/commands#readme">the command readme.</a> Also check out the functions.js documentation site <a href="https://earthernsence.github.io/ADAnswers-Bot/out/global.html">here!</a></h3>
    <h3>{{ getCurrentTime }}</h3>
    <div>Bot Commands: All commands work here. #bot-commands<br>
    Common: All commands besides miscellaneous commands work here. #game-related #android #android-bugs #web-bugs #questions #modifications #rad-puns-xd.<br>
    Early game: Early game commands work here. #under-e308-antimatter #infinity-to-break-infinity<br>
    Early Infinity: #infinity-to-break-infinity.<br>
    e4000: #over-1e4000-ep
    Dilation grind: #timestudy-181-to-dilation<br>
    Banked Infinities: #timestudy-181-to-dilation #dilation-to-1e4000-ep #over-1e4000-ep<br>
    Study tree: #eternity-to-ec1 #ec1-to-timestudy-181 #timestudy-181-to-dilation #dilation-to-1e4000-ep #over-1e4000-ep<br>
    Eternity grinding: #eternity-to-ec1 #ec1-to-timestudy-181 #timestudy-181-to-dilation #dilation-to-1e4000-ep #over-1e4000-ep<br>
    IC4/5: #5e11-ip-upgrade-to-eternity #eternity-to-ec1<br>
    Set crunch auto: #break-to-5e11-ip-upgrade<br>
    Break: Break Infinity commands work here. #break-to-5e11-ip-upgrade #5e11-ip-upgrade-to-eternity<br>
    Early Eternity: Early Eternity commands work here. #eternity-to-ec1<br>
    ECs: EC commands work here. #ec1-to-timestudy-181 #timestudy-181-to-dilation<br>
    Endgame: Endgame/Dilation commands work here. #dilation-to-1e4000-ep #over-1e4000-ep<br></div>
    <h1>Commands</h1>
    <div v-for="command in newCommands">
      <h2>{{ command.name }}</h2>
      <p>{{ command.value }}</p><br>
      <div v-if="command.type === 'shorthand'">Type: shorthand</div> 
      <div>{{ commandCheck(command) }}</div>
      <div v-if="command.acceptableArgs !== undefined">
      <p>Acceptable Arguments:</p>
        <div v-for="arg in command.acceptableArgs">
          <div>{{ arg }}</div>
        </div>
      </div>
      <div>Help page: {{ command.page }}</div>
    </div>
  `
};

// It is???????????????
// eslint-disable-next-line no-unused-vars
let vue;

window.onload = () => {
  setInterval(updateUI, 10);
  vue = new Vue({
    el: "#vue",
    components: {
      component: StuffComponent
    },
    template: "<component/>"
  });
};