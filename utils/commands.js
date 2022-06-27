/* eslint-disable max-len */
"use strict";

const AchievementsCommand = require("../commands/5/achievements");
const AntitablesCommand = require("../commands/6/antitables");
const ChallengeCommand = require("../commands/5/challenge");
const DilationtreesCommand = require("../commands/4/dilationtrees");
const infinitygrindingCommand = require("../commands/3/infinitygrinding");
const RealityCommand = require("../commands/8/reality");
const HowtoplayCommand = require("../commands/6/howtoplay");
const { upgrades } = require("./databases/upgrades");

const { SlashCommandBuilder } = require("@discordjs/builders");

/**
 * @param {string} command - The command to get the message object for.
 * @returns {Object} - The message object for the command.
 */
function getMessageObject(command) {
  switch (command) {
    case "antitables": return AntitablesCommand.command.messageObject;
    case "achievements": return AchievementsCommand.command.messageObject;
    case "challenge": return ChallengeCommand.command.messageObject;
    case "dilationtrees": return DilationtreesCommand.command.messageObject;
    case "infinitygrinding": return infinitygrindingCommand.command.messageObject;
    case "reality": return RealityCommand.command.messageObject;
    case "howtoplay": return HowtoplayCommand.command.messageObject;
    default: return `Unknown message object.`;
  }
}

function htpChoices(which) {
  const choices = [];
  const htp = getMessageObject("howtoplay");
  for (const thing in htp[which]) {
    choices.push({
      name: thing,
      description: thing,
      type: "SUB_COMMAND"
    });
  }
  return choices;
}

function upgradeChoices(which) {
  const choices = [];
  const upgradesToIterate = upgrades[which];
  for (const thing in upgradesToIterate) {
    const upgrade = upgradesToIterate[thing];
    choices.push({
      name: upgrade.id,
      value: upgrade.id,
      type: "STRING"
    });
  }
  return choices;
}

/**
 * Gets the choices for a specific command.
 * @param {string} command - The command to get the choices for.
 * @param {string} which - Used in eternitychallenge for getting both completions and challenges.
 * @returns {Array} - The choices for the command.
 */
// eslint-disable-next-line complexity
function getChoices(command, which) {
  const choices = [];
  if (command === "achievements") {
    for (const ach in getMessageObject(command)) {
      if (!ach.startsWith("r")) {
        choices.push({
          name: ach,
          value: ach,
          type: "STRING"
        });
      }
    }
  } else if (command === "eternitychallenge") {
    let max = 0;
    if (which === "challenges") max = 12;
    else max = 5;
    for (let i = 1; i <= max; i++) {
      choices.push({
        name: i,
        value: i,
        type: "NUMBER"
      });
    }
  } else if (command === "studytree") {
    choices.push({
      name: "active",
      value: "active",
      type: "STRING",
    }, {
      name: "passive",
      value: "passive",
      type: "STRING",
    }, {
      name: "idle",
      value: "idle",
      type: "STRING",
    });
  } else if (command === "howtoplay") {
    return htpChoices(which);
  } else if (command === "upgrade") {
    return upgradeChoices(which);
  } else {
    for (const ach in getMessageObject(command)) {
      choices.push({
        name: ach,
        value: ach,
        type: "STRING"
      });
    }
  }
  return choices;
}

module.exports = {
  getChoices,
  all: [
    ...[new SlashCommandBuilder()
      .setName("161or162")
      .setDescription("Early Eternity command. Explains whether to choose TS161 or TS162"),
    new SlashCommandBuilder()
      .setName("1minuteinf")
      .setDescription("explains the UI change at infinity in under a minute"),
    new SlashCommandBuilder()
      .setName("5hours")
      .setDescription("Explains the long-running 5 hours joke"),
    new SlashCommandBuilder()
      .setName("abb")
      .setDescription("sends an abbreviation guide"),
    new SlashCommandBuilder()
      .setName("achievements")
      .setDescription("explains achievements")
      .addStringOption(option =>
        option.setName("achievement")
          .setDescription("which achievement do you want to see a guide for?")
          .setRequired(false)
          .setChoices(...getChoices("achievements"))
      ).addIntegerOption(option =>
        option.setName("other")
          .setDescription("which achievement do you want to see a guide for, using the achievement ID")
          .setRequired(false)
          .setMinValue(11)
          .setMaxValue(138)
      ),
    new SlashCommandBuilder()
      .setName("adbonus")
      .setDescription("sends ad bonus formulas/multipliers"),
    new SlashCommandBuilder()
      .setName("androidorweb")
      .setDescription("sends the pinned message from the mobile channel describing the differences."),
    new SlashCommandBuilder()
      .setName("antitables")
      .setDescription("Args: prebreak, postbreak, posteternity. Sends a guide to Antitables.")
      .addStringOption(option =>
        option.setName("when")
          .setDescription("At what point in the game are you? prebreak, postbreak, or posteternity?")
          .setRequired(true)
          .setChoices(...getChoices("antitables"))
      ),
    new SlashCommandBuilder()
      .setName("bankedinfinities")
      .setDescription("describes banked infinities, what they do, and how to get them."),
    new SlashCommandBuilder()
      .setName("bottombuttons")
      .setDescription("shows what the bottom buttons are"),
    new SlashCommandBuilder()
      .setName("breakinfinity")
      .setDescription("describes break infinity and gives an order to get break infinity upgrades"),
    new SlashCommandBuilder()
      .setName("bugo")
      .setDescription("sends that screenshot of the break infinity upgrade order spreadsheet"),
    new SlashCommandBuilder()
      .setName("bulkbuy")
      .setDescription("describes bulk buy"),
    new SlashCommandBuilder()
      .setName("c9")
      .setDescription("shorthand for `/challenge c9`"),
    new SlashCommandBuilder()
      .setName("challenge")
      .setDescription("Args: all challenges. Use /ec for eternity challenges. Returns a guide for each argument.")
      .addStringOption(option =>
        option.setName("challenge")
          .setDescription("which challenge do you want to see a guide for?")
          .setRequired(true)
          .setChoices(...getChoices("challenge"))
      )
      .addStringOption(option =>
        option.setName("info")
          .setDescription("(Optional) What information about the challenge do you want to see?")
          .setRequired(false)
          .setChoices(
            { name: "unlock", value: "unlock", type: "STRING" },
            { name: "challenge", value: "challenge", type: "STRING" },
            { name: "goal", value: "goal", type: "STRING" },
            { name: "strategy", value: "strategy", type: "STRING" },
            { name: "reward", value: "reward", type: "STRING" },
          )
      ),
    new SlashCommandBuilder()
      .setName("challengecodes")
      .setDescription("Sends a picture with all of the challenges notated with their \"code\""),
    new SlashCommandBuilder()
      .setName("changeectree")
      .setDescription("Describes how to change your tree for doing an EC"),
    new SlashCommandBuilder()
      .setName("channels")
      .setDescription("Sends a list of channels and their ids/part of game progress"),
    new SlashCommandBuilder()
      .setName("columns")
      .setDescription("sends an image with the columns of infinity upgrades"),
    new SlashCommandBuilder()
      .setName("commands")
      .setDescription("sends a link to the website with all commands"),
    new SlashCommandBuilder()
      .setName("contributors")
      .setDescription("sends a list of contributors and what they helped with!"),
    new SlashCommandBuilder()
      .setName("deadchat")
      .setDescription("sends that one message from spec that he said that one time"),
    new SlashCommandBuilder()
      .setName("decimal")
      .setDescription("Explains how break_infinity.js works"),
    new SlashCommandBuilder()
      .setName("dilation")
      .setDescription("describes dilation"),
    new SlashCommandBuilder()
      .setName("dilationgrind")
      .setDescription("sends a message pertaining to reaching dilation"),
    new SlashCommandBuilder()
      .setName("dilationtrees")
      .setDescription("Sends a tree for your progress in dilation, first or after3paths")
      .addStringOption(option =>
        option.setName("when")
          .setDescription("At what point in the game are you? first or after3paths?")
          .setRequired(true)
          .setChoices(...getChoices("dilationtrees"))
      ),
    new SlashCommandBuilder()
      .setName("dimboostorgalaxy")
      .setDescription("tells you if you should do a dimboost or galaxy"),
    new SlashCommandBuilder()
      .setName("discordformatting")
      .setDescription("returns a link to a list of discord formatting stuff"),
    new SlashCommandBuilder()
      .setName("earlyeternityprogression")
      .setDescription("describes getting through the first few eternities"),
    new SlashCommandBuilder()
      .setName("earlyinfinity")
      .setDescription("Describes how to progress pre-2x better Galaxies"),
    new SlashCommandBuilder()
      .setName("ec")
      .setDescription("shorthand for /eternitychallenge")
      .addNumberOption(option =>
        option.setName("ec")
          .setDescription("What Eternity Challenge are you doing?")
          .setRequired(true)
          .setMaxValue(12)
          .setMinValue(1)
      )
      .addNumberOption(option =>
        option.setName("completion")
          .setDescription("What completion do you want to see?")
          .setRequired(true)
          .setMaxValue(5)
          .setMinValue(1)
      )
      .addBooleanOption(option =>
        option.setName("hide")
          .setDescription("ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Defaults to false.")
          .setRequired(false)
      )
      .addStringOption(option =>
        option.setName("info")
          .setDescription("(Optional) What information about the challenge do you want to see?")
          .setRequired(false)
          .setChoices(
            { name: "unlock", value: "unlock", type: "STRING" },
            { name: "challenge", value: "challenge", type: "STRING" },
            { name: "goal", value: "goal", type: "STRING" },
            { name: "strategy", value: "strategy", type: "STRING" },
            { name: "tree", value: "tree", type: "STRING" },
            { name: "reward", value: "reward", type: "STRING" },
          )
      ),
    new SlashCommandBuilder()
      .setName("eco")
      .setDescription("shorthand of /eternitychallengeorder. accepts current EC as arg")
      .addNumberOption(option =>
        option.setName("ec")
          .setDescription("What Eternity Challenge are you doing?")
          .setRequired(true)
          .setMaxValue(12)
          .setMinValue(1)
      )
      .addNumberOption(option =>
        option.setName("completion")
          .setDescription("What completion do you want to see?")
          .setRequired(true)
          .setMaxValue(5)
          .setMinValue(1)
      ),
    new SlashCommandBuilder()
      .setName("ecs")
      .setDescription("shorthand for `/challenge ecs`"),
    new SlashCommandBuilder()
      .setName("eep")
      .setDescription("shorthand for /earlyeternityprogression"),
    new SlashCommandBuilder()
      .setName("ep")
      .setDescription("calculates the amount of IP required to get the number of EP specified 2 < x < 1000.")
      .addNumberOption(option =>
        option.setName("ep")
          .setDescription("number of EP to be used in calculation")
          .setRequired(true)
          .setMaxValue(1000)
          .setMinValue(2)
      ),
    new SlashCommandBuilder()
      .setName("eternitychallenge")
      .setDescription("Requires two arguments: `/eternitychallenge [ECNumber] [CompletionNumber]`. Has two optionals.")
      .addNumberOption(option =>
        option.setName("ec")
          .setDescription("What Eternity Challenge are you doing?")
          .setRequired(true)
          .setMaxValue(12)
          .setMinValue(1)
      )
      .addNumberOption(option =>
        option.setName("completion")
          .setDescription("What completion do you want to see?")
          .setRequired(true)
          .setMaxValue(5)
          .setMinValue(1)
      )
      .addBooleanOption(option =>
        option.setName("hide")
          .setDescription("ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Defaults to false.")
          .setRequired(false)
      )
      .addStringOption(option =>
        option.setName("info")
          .setDescription("(Optional) What information about the challenge do you want to see?")
          .setRequired(false)
          .setChoices(
            { name: "unlock", value: "unlock", type: "STRING" },
            { name: "challenge", value: "challenge", type: "STRING" },
            { name: "goal", value: "goal", type: "STRING" },
            { name: "strategy", value: "strategy", type: "STRING" },
            { name: "tree", value: "tree", type: "STRING" },
            { name: "reward", value: "reward", type: "STRING" },
          )
      ),
    new SlashCommandBuilder()
      .setName("eternitychallengeorder")
      .setDescription("Returns the EC order. Will show the previous EC when provided a challenge.")
      .addNumberOption(option =>
        option.setName("ec")
          .setDescription("What Eternity Challenge are you doing?")
          .setRequired(true)
          .setMaxValue(12)
          .setMinValue(1)
      )
      .addNumberOption(option =>
        option.setName("completion")
          .setDescription("What completion do you want to see?")
          .setRequired(true)
          .setMaxValue(5)
          .setMinValue(1)
      ),
    new SlashCommandBuilder()
      .setName("eternitygrinding")
      .setDescription("describes how to eternity grind")
      .addStringOption(option =>
        option.setName("when")
          .setDescription("at what point in the game you are. early < 110k eternities, late < 1m")
          .setRequired(true)
          .setChoices(
            { name: "early", value: "early", type: "STRING" },
            { name: "late", value: "late", type: "STRING" },
          )
      ),
    new SlashCommandBuilder()
      .setName("failec")
      .setDescription("Describes what ECs you can fail and how/when"),
    new SlashCommandBuilder()
      .setName("firstsplit")
      .setDescription("Describes how to progress on the time study tree pre-TS171"
      ),
    new SlashCommandBuilder()
      .setName("galaxyboost")
      .setDescription("compares the boost from 100 tickspeed upgrades with 0 galaxies and 1 galaxy"),
    new SlashCommandBuilder()
      .setName("galaxyscaling")
      .setDescription("Explains the change in scaling at 100 (and 800) Antimatter Galaxies"),
    new SlashCommandBuilder()
      .setName("grindingforbreak")
      .setDescription("Describes how to reach Break Infinity."),
    new SlashCommandBuilder()
      .setName("ic4")
      .setDescription("shorthand for `/challenge ic4`"),
    new SlashCommandBuilder()
      .setName("ic5")
      .setDescription("shorthand for `/challenge ic5`"),
    new SlashCommandBuilder()
      .setName("importexport")
      .setDescription("How to import/export saves"),
    new SlashCommandBuilder()
      .setName("infinity")
      .setDescription("tells how much AM you need for infinity"),
    new SlashCommandBuilder()
      .setName("infinitydimensions")
      .setDescription("Describes what infinity dimensions (and infinity power) does."),
    new SlashCommandBuilder()
      .setName("infinitygrinding")
      .setDescription("Args: early, late. Early is for EC4, late is for banking infinities.")
      .addStringOption(option =>
        option.setName("when")
          .setDescription("at what point in the game you are. early is for EC4, late for Binfs")
          .setRequired(true)
          .setChoices(
            { name: "early", value: "early", type: "STRING" },
            { name: "late", value: "late", type: "STRING" },
          )
      ),
    new SlashCommandBuilder()
      .setName("invertedtheme")
      .setDescription("response to the frequent web bug report that the inverted theme is bugged."),
    new SlashCommandBuilder()
      .setName("ipepcolor")
      .setDescription("Explains the coloring of the IP/EP numbers on their reset buttons"),
    new SlashCommandBuilder()
      .setName("ipepcolour")
      .setDescription("Explains the colouring of the IP/EP numbers on their reset buttons"),
    new SlashCommandBuilder()
      .setName("justask")
      .setDescription("sends a passive aggressive thing"),
    new SlashCommandBuilder()
      .setName("matterportal")
      .setDescription("Matter Portal news tickers"),
    new SlashCommandBuilder()
      .setName("meta")
      .setDescription("internal bot information"),
    new SlashCommandBuilder()
      .setName("helper")
      .setDescription("sends a consent form to become a designated helper"),
    new SlashCommandBuilder()
      .setName("modifications")
      .setDescription("Explains the modifications of AD"),
    new SlashCommandBuilder()
      .setName("news")
      .setDescription("Args: listmobile, listweb, info. Args are optional.")
      .addStringOption(option =>
        option.setName("info")
          .setDescription("Args: listmobile, listweb, info. Args are NOT optional.")
          .setRequired(true)
          .setChoices(
            { name: "listmobile", value: "listmobile", type: "STRING" },
            { name: "listweb", value: "listweb", type: "STRING" },
            { name: "info", value: "info", type: "STRING" },
          )
      ),
    new SlashCommandBuilder()
      .setName("notations")
      .setDescription("Sends a link to the Notations GitHub repo."),
    new SlashCommandBuilder()
      .setName("occlusion")
      .setDescription("a guide of how to fix out-of-focus tabs on chrome not giving full progress"),
    new SlashCommandBuilder()
      .setName("offlineticks")
      .setDescription("offline ticks stuff"),
    new SlashCommandBuilder()
      .setName("oom")
      .setDescription("describes what an OoM (Order of Magnitude) is"),
    new SlashCommandBuilder()
      .setName("paperclips")
      .setDescription("Explanation of the origin of paperclips."),
    new SlashCommandBuilder()
      .setName("pins")
      .setDescription("pins"),
    new SlashCommandBuilder()
      .setName("reality")
      .setDescription("Information surrounding the upcoming reality update.")
      .addStringOption(option =>
        option.setName("feature")
          .setDescription("Choose a feature/thing you want to know more about")
          .setRequired(true)
          .setChoices(...getChoices("reality"))
      ),
    new SlashCommandBuilder()
      .setName("respec")
      .setDescription("Describes what respec studies does"),
    new SlashCommandBuilder()
      .setName("sacrifice")
      .setDescription("describes sacrifice and when to"),
    new SlashCommandBuilder()
      .setName("savebank")
      .setDescription("Provides a link to Buck's save bank."),
    new SlashCommandBuilder()
      .setName("savesharing")
      .setDescription("Provides a brief explanation on sharing saves."),
    new SlashCommandBuilder()
      .setName("secondsplit")
      .setDescription("describes second split paths"),
    new SlashCommandBuilder()
      .setName("setcrunchauto")
      .setDescription("Describes how to set your crunch autobuyer."),
    new SlashCommandBuilder()
      .setName("site")
      .setDescription("Says the game site"),
    new SlashCommandBuilder()
      .setName("slightsmile")
      .setDescription("kaj no"),
    new SlashCommandBuilder()
      .setName("studytree")
      .setDescription("Generates a Time Study tree based on your total Time Theorems")
      .addNumberOption(option =>
        option.setName("theorems")
          .setDescription("The number of Time Theorems you have")
          .setRequired(true)
          .setMinValue(0)
      )
      .addStringOption(option =>
        option.setName("path")
          .setDescription("The path you want to use; only has effect 54 < x < 123 where x is TT")
          .setRequired(false)
          .setChoices(...getChoices("studytree"))
      ),
    new SlashCommandBuilder()
      .setName("swipetrick")
      .setDescription("Explains swipe trick for mobile"),
    new SlashCommandBuilder()
      .setName("thanks")
      .setDescription("say thanks"),
    new SlashCommandBuilder()
      .setName("ts")
      .setDescription("shorthand for `/studytree`")
      .addNumberOption(option =>
        option.setName("theorems")
          .setDescription("The number of Time Theorems you have")
          .setRequired(true)
          .setMinValue(0)
      )
      .addStringOption(option =>
        option.setName("path")
          .setDescription("The path you want to use; only has effect 54 < x < 123 where x is TT")
          .setRequired(false)
          .setChoices(...getChoices("studytree"))
      ),
    new SlashCommandBuilder()
      .setName("xkcd")
      .setDescription("has an arg: XKCD number. sends the link to that xkcd")
      .addNumberOption(option =>
        option.setName("xkcd")
          .setDescription("XKCD number")
          .setRequired(true)
          .setMinValue(1)
          .setMaxValue(9999)
      ),
    new SlashCommandBuilder()
      .setName("help")
      .setDescription("Sends a help page.")
      .addIntegerOption(option =>
        option.setName("page")
          .setDescription("The page you want to see")
          .setRequired(false)
          .setMinValue(1)
          .setMaxValue(69)
      ),
    new SlashCommandBuilder()
      .setName("time")
      .setDescription("Displays the current time, in Decimal time. https://en.wikipedia.org/wiki/Decimal_time"),
    new SlashCommandBuilder()
      .setName("replicanti")
      .setDescription("Describes Replicanti in all of their glory"),
    new SlashCommandBuilder()
      .setName("slashcommand")
      .setDescription("explains how TS and EC slash commands work with their args and how to type them"),
    new SlashCommandBuilder()
      .setName("upgrade")
      .setDescription("explains nearly each upgrade in the game")
      .addStringOption(option =>
        option.setName("infinity")
          .setDescription("explains any infinity upgrade")
          .setChoices(...getChoices("upgrade", "infinity"))
      )
      .addStringOption(option =>
        option.setName("break")
          .setDescription("explains any break upgrade")
          .setChoices(...getChoices("upgrade", "break"))
      )
      .addStringOption(option =>
        option.setName("eternity")
          .setDescription("explains any eternity upgrade")
          .setChoices(...getChoices("upgrade", "eternity"))
      )
      .addStringOption(option =>
        option.setName("dilation")
          .setDescription("explains any dilation upgrade")
          .setChoices(...getChoices("upgrade", "dilation"))
      ),
    new SlashCommandBuilder()
      .setName("iugo")
      .setDescription("pre break infinity upgrade order routes"),
    new SlashCommandBuilder()
      .setName("secretachievements")
      .setDescription("sends link to secret achievement guide."),
    new SlashCommandBuilder()
      .setName("xd")
      .setDescription("explains the XD channel"),
    new SlashCommandBuilder()
      .setName("roles")
      .setDescription("explains that you can get an Android or Web player role"),
    new SlashCommandBuilder()
      .setName("tamtf")
      .setDescription("teach a man to fish"),
    new SlashCommandBuilder()
      .setName("peakipmin")
      .setDescription("Tells why peak IP/min disappears at e100 IP"),
    new SlashCommandBuilder()
      .setName("user")
      .setDescription("get information about a user")
      .addUserOption(option =>
        option.setName("user")
          .setDescription("The user you want to get information about")
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName("study")
      .setDescription("retrieve information about a certain study")
      .addIntegerOption(option =>
        option.setName("study")
          .setDescription("The study you want to get information about using the study ID")
          .setRequired(true)
          .setMinValue(11)
          .setMaxValue(234)
      ),
    ].map(command => command.toJSON()).sort((a, b) => a.name.localeCompare(b.name)),
    // I am specifically not migrating this because it's a pain in the ass
    {
      name: "howtoplay",
      description: `Pages from the how to play on Mobile.`,
      options: [
        {
          name: "faq",
          description: "pages from the faq",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "faq")
        },
        {
          name: "tickspeed",
          description: "Tickspeed howtoplay",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "tickspeed")
        },
        {
          name: "dimensions",
          description: "Dimensions howtoplay",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "dimensions")
        },
        {
          name: "softresets",
          description: "soft reset how to play pages, f.e. dimboost/galaxy pages",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "softresets")
        },
        {
          name: "achievements",
          description: "describes achievements",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "achievements")
        },
        {
          name: "sacrifice",
          description: "explains sacrifice",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "sacrifice")
        },
        {
          name: "infinity",
          description: "explains infinity",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "infinity")
        },
        {
          name: "challenges",
          description: "explains the three challenge types",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "challenges")
        },
        {
          name: "autobuyers",
          description: "explains autobuyers",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "autobuyers")
        },
        {
          name: "breakinfinity",
          description: "explains breakinfinity",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "breakinfinity")
        },
        {
          name: "replicanti",
          description: "explains replicanti",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "replicanti")
        },
        {
          name: "eternity",
          description: "explains eternity",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "eternity")
        },
        {
          name: "timestudies",
          description: "explains time studies",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "timestudies")
        },
        {
          name: "dilation",
          description: "explains time dilation",
          type: "SUB_COMMAND_GROUP",
          options: getChoices("howtoplay", "dilation")
        },
      ]
    },
  ],
  find(name) {
    return this.all.find(ob => ob.name === name) ?? "Unknown command";
  }
};