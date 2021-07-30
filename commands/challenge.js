/* eslint-disable max-len */
"use strict";

const { TimeStudyCommand } = require("../classes/TimeStudyCommand");

const base = `It is recommended to have at least the first 12 infinity upgrades and 100 spare IP.
If you want to get those 100 IP, you probably want to get upgrade 13 and 14 as well to speed things up. (Note: Those upgrades won't work inside challenges.)`;

const icBase = (ic, ip) => `Attempt IC${ic} at ~e${ip} IP. No special strat for this challenge.`; 

const challengeMessageObject = {
  "c1": "Fuck you pichu",
  "c2": `${base}\n After all, holding M is detrimental. Press it once you can get a few dimensions.`,
  "c3": base,
  "c4": base,
  "c5": base,
  "c6": base,
  "c7": base, 
  "c8": `No strat or tips for this challenge. Just start it, get five dimboosts (four shifts and one boost on web) and hit sacrifice at ~10x.
  Make sure to do the antitable achievement in these runs, because this achievement is pretty easy for now. If you need a guide for it, feel free to call the bot with "++antitables prebreak".`,
  "c9": `I recommend having all Infinity upgrades (except the last 4 which don't work in challenges) and at least 100 unspent IP before attempting C9. Some players prefer attempting this challenge at higher IP values (10k+) where the challenge becomes trivial.\n
  You can use this written guide: <https://pastebin.com/MBBTimjD> or this video guide: <https://youtu.be/6o-QKHLcimU> or you can use this strat: 
  > Autobuyers off and manually buy the highest dimension available. Keep 6th dim, 8th dim, dimboost, and galaxy autobuyers on. Keep tickspeed cost under the cost of dimensions. Remember to always buy 8th dimension if it's available.`,
  "c10": base,
  "c11": `Once you have the "Galaxies are twice as effective" upgrade this challenge becomes a normal infinity run. Just do it once you have that upgrade.`,
  "c12": `It is recommended to have at least the first 12 Infinity Upgrades and ~200 Infinities. Spare IP is not important for C12.
  If you want to get those 200 Infinities, you probably want to get upgrades 13 to 15 as well to speed things up. (Note: Those upgrades won't work inside challenges.)
  The exact number of infinities could be arugued, but 200 was relatively reasonable to Tables -- who completed C12 in 5 minutes with 200 Infinities and 0 Infinity Points.`,

  "ic1": `As the reward of IC1 is not that good, it's recommended to do it once you have the galaxy upgrade for 5e11 IP. No special strat for this challenge.`,
  "ic2": `Do not attempt IC2 before you reached ID4 at ~e45 IP. If you cannot get e10500 AM in a normal infinity, why would you try to reach it inside a challenge? No special strat for this challenge.`,
  "ic3": `Attempt IC3 after getting the ID1 for e56 IP. This might take an hour to do. No special strat for this challenge.`,
  "ic4": `Check out the Post-Eternity guide once you are past Eternity. The old guides still apply, however the Post-Eternity one is just specifically made with the Eternity progression in mind.
IC4 video guide: <https://youtu.be/kytefPmkqL4>
IC4 written guide: <https://pastebin.com/aZktZs8m>
Post-Eternity guide (has Eternity spoilers!): ||https://cdn.discordapp.com/attachments/536249899487068181/848926070622126100/SVID_20200120_130930_1.mp4||`,
  "ic5": `The written guide is based on the web version while the video was made on the android one. The strategy for IC5 is the same. Just keep in mind that you need 21 galaxies on web and around 40 galaxies on mobile to complete the challenge. 
Check out the Post-Eternity guide once you are past Eternity. The old guides still apply, however the Post-Eternity one is just specifically made with the Eternity progression in mind.
IC5 video guide: <https://www.youtube.com/watch?v=eNqPZ9kGurE>
IC5 written guide: <https://pastebin.com/sj2nFFjH>
Post-Eternity guide (has Eternity spoilers!): ||https://cdn.discordapp.com/attachments/536249899487068181/848926013869522994/SVID_20200120_131504_1.mp4||`,
  "ic6": icBase(6, 102),
  "ic7": icBase(7, 114),
  "ic8": icBase(8, 129),

  "ecs": `Check out this helpful guide from Ninjatsu. https://canary.discord.com/channels/351476683016241162/408764187960147982/731639441474453537`
};

module.exports = {
  command: new TimeStudyCommand({
    number: 1,
    name: "challenge",
    description: "Args: all challenges, including `ecs`. Returns a guide for each argument. All of these commands have shorthands as well, f.e `++challenge c2` will return the same result as `++c2`",
    check: true,
    acceptableArgs: Object.keys(challengeMessageObject),
    sent: undefined,
    getArgMessage(arg) {
      if (this.acceptableArgs.includes(arg[0].toLowerCase())) return challengeMessageObject[arg[0].toLowerCase()];
      return `Unknown arg in command challenge.`;
    }
  }),
};
