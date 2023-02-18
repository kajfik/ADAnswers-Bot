import { AttachmentBuilder, EmbedBuilder, EmbedField } from "discord.js";
import { AchievementInfo } from "../types";
import { Caesar } from "../../functions/Misc";
import { Colour } from "../colours";
import { footerText } from "../../functions/achievements";

interface AchievementsData {
  [key: string]: AchievementInfo;
}

function getFields(achievementInfo: AchievementInfo): EmbedField[] {
  const fields = [
    { name: "Achievement", value: `${achievementInfo.achievement}`, inline: false },
  ];

  if (achievementInfo.strategy) {
    fields.push({ name: "Strategy", value: `${achievementInfo.strategy}`, inline: false });
  }

  if (achievementInfo.reward) {
    fields.push({ name: "Reward", value: `${achievementInfo.reward}`, inline: false });
    if (achievementInfo.rewardFormula) fields.push({ name: "Reward formula", value: `${achievementInfo.rewardFormula}`, inline: false });
  }

  return fields;
}

function getDoomedFields(achievementInfo: AchievementInfo): EmbedField[] {
  const fields = [
    { name: `${Caesar.randomEncrypt("Achievement")}`, value: `${Caesar.randomEncrypt(achievementInfo.achievement)}`, inline: false },
  ];

  if (achievementInfo.reward) {
    fields.push({ name: `${Caesar.randomEncrypt("Reward")}`, value: `${Caesar.randomEncrypt(achievementInfo.reward)}`, inline: false });
    if (achievementInfo.rewardFormula) fields.push({ name: `${Caesar.randomEncrypt("Reward formula")}`, value: `${Caesar.randomEncrypt(achievementInfo.rewardFormula)}`, inline: false });
  }

  return fields;
}

export const Achievement = (achievementInfo: AchievementInfo) => new EmbedBuilder()
  .setTitle(`Achievement ${achievementInfo.id} ("${achievementInfo.fullName}")`)
  .setColor(Colour.achievement)
  .addFields(getFields(achievementInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export const DoomedAchievement = (achievementInfo: AchievementInfo) => new EmbedBuilder()
  .setTitle(Caesar.randomEncrypt(`Achievement ${achievementInfo.id} ("${achievementInfo.fullName}")`))
  .setColor(Colour.pelle)
  .addFields(getDoomedFields(achievementInfo))
  .setTimestamp()
  .setFooter({ text: Caesar.randomEncrypt(footerText()), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export const achievements: AchievementsData = {
  "11": {
    id: 11,
    fullName: "You gotta start somewhere",
    achievement: "Buy a 1st Antimatter Dimension"
  },
  "12": {
    id: 12,
    fullName: "100 antimatter is a lot",
    achievement: "Buy a 2nd Antimatter Dimension."
  },
  "13": {
    id: 13,
    fullName: "Half life 3 CONFIRMED",
    achievement: "Buy a 3rd Antimatter Dimension."
  },
  "14": {
    id: 14,
    fullName: "L4D: Left 4 Dimensions",
    achievement: "Buy a 4th Antimatter Dimension."
  },
  "15": {
    id: 15,
    fullName: "5 Dimension Antimatter Punch",
    achievement: "Buy a 5th Antimatter Dimension."
  },
  "16": {
    id: 16,
    fullName: "We couldn't afford 9",
    achievement: "Buy a 6th Antimatter Dimension."
  },
  "17": {
    id: 17,
    fullName: "Not a luck related achievement",
    achievement: "Buy a 7th Antimatter Dimension."
  },
  "18": {
    id: 18,
    fullName: "90 degrees to infinity",
    achievement: "Buy an 8th Antimatter Dimension."
  },
  "21": {
    id: 21,
    fullName: "To infinity!",
    achievement: "Go Infinite.",
    reward: "Start with 100 antimatter",
  },
  "22": {
    id: 22,
    fullName: "FAKE NEWS!",
    achievement: "Encounter 50 different news messages."
  },
  "23": {
    id: 23,
    fullName: "9th Dimension is a lie",
    achievement: "Have exactly 99 8th Antimatter Dimensions",
    reward: "8th Antimatter Dimensions are 10% stronger",
    strategy: `Get it after your first galaxy and the 90 8th dim costing dimboost by toggling the 8th Dimension autobuyer to singles.`,
  },
  "24": {
    id: 24,
    fullName: "Antimatter Apocalypse",
    achievement: "Get over 1e80 antimatter."
  },
  "25": {
    id: 25,
    fullName: "Boosting to the max",
    achievement: "Buy 10 Dimension Boosts."
  },
  "26": {
    id: 26,
    fullName: "You got past The Big Wall",
    achievement: "Buy an Antimatter Galaxy."
  },
  "27": {
    id: 27,
    fullName: "Double Galaxy",
    achievement: "Buy 2 Antimatter Galaxies."
  },
  "28": {
    id: 28,
    fullName: "There's no point in doing that...",
    achievement: "Buy a single 1st Antimatter Dimension when you have over 1e150 of them.",
    reward: "1st Antimatter Dimensions are 10% stronger",
    strategy: `After you have e150 1st dims, toggle the 1st Dimension autobuyer to singles.`,
  },
  "31": {
    id: 31,
    fullName: "I forgot to nerf that",
    achievement: "Get any Antimatter Dimension multiplier over ×1e31.",
    reward: "1st Antimatter Dimensions are 5% stronger",
  },
  "32": {
    id: 32,
    fullName: "The Gods are pleased",
    achievement: "Get over ×600 from Dimensional Sacrifice outside of Challenge 8.",
    reward: "Dimensional Sacrifice is stronger",
    rewardFormula: "`AD1 ^ 0.010` -> `AD1 ^ 0.011`"
  },
  "33": {
    id: 33,
    fullName: "That's a lot of infinites",
    achievement: "Reach Infinity 10 times."
  },
  "34": {
    id: 34,
    fullName: "You didn't need it anyway",
    achievement: "Infinity without having any 8th Antimatter Dimensions.",
    reward: "Antimatter Dimensions 1-7 are 2% stronger"
  },
  "35": {
    id: 35,
    fullName: "Don't you dare sleep",
    achievement: "Be offline for a period of over 6 hours (real time)."
  },
  "36": {
    id: 36,
    fullName: `Claustrophobic`,
    achievement: `Infinity with just 1 Antimatter Galaxy. (Your Antimatter Galaxies are reset on Infinity.)`,
    reward: `Multiply starting tick speed by 1.02.`,
    strategy: `Do ***not*** do this on your first Infinity. When you Infinity, Galaxies are reset back to 0, so you can attempt it later when it's easier.`
  },
  "37": {
    id: 37,
    fullName: "That's FAST!",
    achievement: "Infinity in under 2 hours.",
    reward: "Start with 5,000 antimatter"
  },
  "38": {
    id: 38,
    fullName: "I don't believe in Gods",
    achievement: "Buy an Antimatter Galaxy without Dimensional Sacrificing. (Your Antimatter Galaxies are reset on Infinity.)",
  },
  "41": {
    id: 41,
    fullName: "No DLC required",
    achievement: "Buy 16 Infinity Upgrades.",
    reward: "Unlock two new Infinity Upgrades- ×2 IP multiplier and offline IP generation.",
  },
  "42": {
    id: 42,
    fullName: "Super Sanic",
    achievement: "Have antimatter per second exceed your current antimatter above 1e63."
  },
  "43": {
    id: 43,
    fullName: "How the antitables have turned..",
    achievement: "Get the 8th Antimatter Dimension multiplier to be highest, 7th Antimatter Dimension multiplier  second highest, etc.",
    reward: "Each Antimatter Dimension gains a boost proportional to tier (8th gets 8%, 7th gets 7%, etc.)",
    strategy: "Check `/antitables`",
  },
  "44": {
    id: 44,
    fullName: "Over in 30 Seconds",
    achievement: "Have antimatter per second exceed your current antimatter for 30 consecutive seconds."
  },
  "45": {
    id: 45,
    fullName: "Faster than a potato",
    achievement: "Get more than 1e29 ticks per second.",
    reward: "Multiply starting tickspeed by ×1.02"
  },
  "46": {
    id: 46,
    fullName: "Multidimensional",
    achievement: "Reach 1e12 of all Antimatter Dimensions except the 8th."
  },
  "47": {
    id: 47,
    fullName: "Daredevil",
    achievement: "Complete 3 Normal Challenges."
  },
  "48": {
    id: 48,
    fullName: "Antichallenged",
    achievement: "Complete all 12 Normal Challenges.",
    reward: "All Antimatter Dimensions are 10% stronger"
  },
  "51": {
    id: 51,
    fullName: "Limit Break",
    achievement: "Break Infinity."
  },
  "52": {
    id: 52,
    fullName: "Age of Automation",
    achievement: "Max the interval for Antimatter Dimension and Tickspeed upgrade autobuyers."
  },
  "53": {
    id: 53,
    fullName: "Definitely not worth it",
    achievement: "Max the intervals for all normal autobuyers."
  },
  "54": {
    id: 54,
    fullName: "That's FASTER!",
    achievement: "Infinity in 10 minutes or less.",
    reward: "Start with 5e5 antimatter"
  },
  "55": {
    id: 55,
    fullName: "Forever isn't that long",
    achievement: "Infinity in 1 minute or less.",
    reward: "Start with 5e10 antimatter"
  },
  "56": {
    id: 56,
    fullName: "Many Deaths",
    achievement: "Complete the 2nd Antimatter Dimension Autobuyer Challenge in 3 minutes or less.",
    reward: `All Antimatter Dimensions are stronger in the first 3 minutes of Infinities.`,
    rewardFormula: "`max(6 / (time in infinity in minutes + 3), 1)`"
  },
  "57": {
    id: 57,
    fullName: "Gift from the Gods",
    achievement: "Complete the 8th Antimatter Dimension Autobuyer Challenge in 3 minutes or less.",
    reward: "Dimensional Sacrifice is stronger",
    rewardFormula: "`AD1 ^ 0.011` -> `AD1 ^ 0.012`"
  },
  "58": {
    id: 58,
    fullName: "This is fine.",
    achievement: "Complete the Tickspeed Autobuyer Challenge in 3 minutes or less.",
    reward: "Increase the multiplier for buying 10 Antimatter Dimensions by +1%."
  },
  "61": {
    id: 61,
    fullName: "Bulked Up",
    achievement: "Get all of your Antimatter Dimension Autobuyer bulk amounts to 512 or higher.",
    reward: "Dimension Autobuyer bulks are unlimited."
  },
  "62": {
    id: 62,
    fullName: "Oh, hey... You're still here?",
    achievement: "Reach 1e8 Infinity Points per minute."
  },
  "63": {
    id: 63,
    fullName: "A new beginning",
    achievement: "Begin generation of Infinity Power."
  },
  "64": {
    id: 64,
    fullName: "1 Million is a lot",
    achievement: "Reach 1e6 Infinity Power."
  },
  "65": {
    id: 65,
    fullName: "Not-so-challenging",
    achievement: "Get the sum of all of your Normal Challenge times under 3 minutes.",
    reward: `All Antimatter Dimensions are stronger in the first 3 minutes of Infinities, but only in Challenges.`,
    rewardFormula: "`max(4 / (time in infinity in minutes + 1), 1)`",
  },
  "66": {
    id: 66,
    fullName: "Faster than a squared potato",
    achievement: "Get more than 1e58 ticks per second.",
    reward: "Multiply starting tickspeed by ×1.02"
  },
  "67": {
    id: 67,
    fullName: "Infinitely Challenging",
    achievement: "Complete an Infinity Challenge."
  },
  "68": {
    id: 68,
    fullName: "You did this again just for the achievement right?",
    achievement: "Complete the 3rd Antimatter Dimension Autobuyer Challenge in 10 seconds or less.",
    reward: `1st Antimatter Dimensions are 50% stronger.`
  },
  "71": {
    id: 71,
    fullName: `Error 909: Dimension Not Found`,
    achievement: `Get to Infinity with only a single 1st Antimatter Dimension without Dimension Boosts or Antimatter Galaxies, while in the 2nd Antimatter Dimension Autobuyer Challenge.`,
    reward: `1st Antimatter Dimensions are 3 times stronger.`,
    strategy: `Do it after the e39 ID2. Disable boost, galaxy and all dim autobuyers, go into C2 and buy 10 1st dims.`
  },
  "72": {
    id: 72,
    fullName: "Can't hold all these infinities",
    achievement: "Get all Antimatter Dimension multipliers over ×1.8e308.",
    reward: "All Antimatter Dimensions are 10% stronger"
  },
  "73": {
    id: 73,
    fullName: "THIS ACHIEVEMENT DOESN'T EXIST",
    achievement: "Get 9.9999e9999 antimatter.",
    reward: "Antimatter Dimensions gain a multiplier based on current antimatter.",
    rewardFormula: "`(antimatter ^ 0.00002) + 1`"
  },
  "74": {
    id: 74,
    fullName: "Not a second lost",
    achievement: "Get the sum of all best Normal Challenge times under 5 seconds.",
    reward: `All Antimatter Dimensions are 40% stronger, but only in challenges.`
  },
  "75": {
    id: 75,
    fullName: "NEW DIMENSIONS???",
    achievement: "Unlock the 4th Infinity Dimension.",
    reward: "Your Achievement bonus affects Infinity Dimensions.",
  },
  "76": {
    id: 76,
    fullName: "One for each dimension",
    achievement: "Play for 8 days.",
    reward: "Extremely small multiplier to Antimatter Dimensions based on time played.",
    rewardFormula: "`max(((total days played / 2) ^ 0.05), 1)`"
  },
  "77": {
    id: 77,
    fullName: "Zero Deaths",
    achievement: `Get to Infinity without Dimension Boosts or Antimatter Galaxies while in a Normal Challenge.`,
    reward: `Antimatter Dimensions 1-4 are 25% stronger`,
    strategy: `Trivial after you get ID1. Do it in C3. It doesn't need to be attempted early; if it is, it takes about 16+ hours before ID1.`
  },
  "78": {
    id: 78,
    fullName: "Blink of an eye",
    achievement: "Get to Infinity in under 200 milliseconds.",
    reward: "You start with 5e25 antimatter."
  },
  "81": {
    id: 81,
    fullName: "Game Design is my Passion/Hevipelle did nothing wrong",
    achievement: `Beat Infinity Challenge 5 in 15 seconds or less.`,
    strategy: `Trivial after Eternity. You can do it before then, but it's more tedious.`
  },
  "82": {
    id: 82,
    fullName: "Anti-antichallenged",
    achievement: "Complete all 8 Infinity Challenges."
  },
  "83": {
    id: 83,
    fullName: "YOU CAN GET 50 GALAXIES?!?!",
    achievement: "Get 50 Antimatter Galaxies.",
    reward: "Tickspeed is just over 5% faster per Antimatter Galaxy.",
    rewardFormula: "`0.95 ^ galaxies`"
  },
  "84": {
    id: 84,
    fullName: "I got a few to spare",
    achievement: "Reach 1e35000 antimatter.",
    reward: "Antimatter Dimensions are stronger the more unspent antimatter you have.",
    rewardFormula: "`(antimatter ^ 0.00002) + 1`"
  },
  "85": {
    id: 85,
    fullName: "ALL YOUR IP ARE BELONG TO US",
    achievement: "Big Crunch for 1e150 Infinity Points.",
    reward: "Additional ×4 multiplier to Infinity Points"
  },
  "86": {
    id: 86,
    fullName: "Do you even bend time bro?",
    achievement: "Reach ×1e3 faster per Tickspeed upgrade.",
    reward: "All Galaxies are 1% stronger."
  },
  "87": {
    id: 87,
    fullName: "2 Million Infinities",
    achievement: `Infinity 2 million (2e6) times.`,
    reward: `Infinities more than 5 seconds long give ×250 more Infinities.`,
    strategy: `Buy TS 32, disable galaxy autobuyer, set boost autobuyer to 0s, and crunch autobuyer to 0.1-1s depending on how long it takes to buy dimboosts for 32.`,
  },
  "88": {
    id: 88,
    fullName: "Yet another infinity reference",
    achievement: "Get a ×1.8e308 multiplier in a single Dimensional Sacrifice.",
    reward: "`AD1 ^ 0.012` -> `AD1 ^ 0.013`"
  },
  "91": {
    id: 91,
    fullName: `Ludicrous speed`,
    achievement: `Big Crunch for 1e200 Infinity Points in 2 seconds or less.`,
    reward: `All Antimatter Dimensions are significantly stronger in the first 5 seconds of Infinities`,
    rewardFormula: `\`max((5 - time in this infinity in seconds) * 60, 1)\``,
    strategy: `Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`
  },
  "92": {
    id: 92,
    fullName: `I break for nobody`,
    achievement: `Big Crunch for 1e250 Infinity Points in 20 seconds or less`,
    reward: `All Antimatter Dimensions are significantly stronger in the first 5 seconds of Infinities`,
    rewardFormula: `\`max((1 - time in this infinity in minutes) * 100, 1)\``,
    strategy: `Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`
  },
  "93": {
    id: 93,
    fullName: "MAXIMUM OVERDRIVE",
    achievement: "Big Crunch for 1e300 Infinity Points.",
    reward: "Additional ×4 multiplier to Infinity Points"
  },
  "94": {
    id: 94,
    fullName: "4.3333 minutes of Infinity",
    achievement: "Reach 1e260 Infinity Power.",
    reward: "Double Infinity Power gain"
  },
  "95": {
    id: 95,
    fullName: "Is this safe?",
    achievement: "Gain 1.8e308 Replicanti in 1 hour.",
    reward: `You keep your Replicanti and 1 Replicanti Galaxy on Infinity.`
  },
  "96": {
    id: 96,
    fullName: "Time is relative",
    achievement: "Go Eternal."
  },
  "97": {
    id: 97,
    fullName: "Yes, this is hell/Like jumping on a lego",
    achievement: `Get the sum of Infinity Challenge times under 6.66 seconds.`,
    strategy: `Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`
  },
  "98": {
    id: 98,
    fullName: "0 degrees from Infinity",
    achievement: "Unlock the 8th Infinity Dimension."
  },
  "101": {
    id: 101,
    fullName: "8 nobody got time for that",
    achievement: "Eternity without buying Antimatter Dimensions 1-7."
  },
  "102": {
    id: 102,
    fullName: "This mile took an eternity",
    achievement: "Get all Eternity milestones."
  },
  "103": {
    id: 103,
    fullName: "Tätä saavutusta ei ole olemassa II",
    achievement: "Reach 9.99999e999 Infinity Points.",
    reward: `Make the Infinity Point formula better`,
    rewardFormula: `log(x / 308) ➜ log(x / 307.8)`
  },
  "104": {
    id: 104,
    fullName: "That wasn't an eternity",
    achievement: "Eternity in under 30 seconds.",
    reward: `Start Eternities with 5e25 Infinity Points.`,
  },
  "105": {
    id: 105,
    fullName: "Infinite Time",
    achievement: "Have 308 Tickspeed upgrades from Time Dimensions.",
    reward: "Time Dimensions gain a multiplier based on tickspeed.",
    rewardFormula: "`tickspeed per second ^ 0.000005`"
  },
  "106": {
    id: 106,
    fullName: "The swarm",
    achievement: "Get 10 Replicanti Galaxies in 15 seconds."
  },
  "107": {
    id: 107,
    fullName: "Do you really need a guide for this",
    achievement: `Eternity with less than 10 Infinities`,
    strategy: `Respec out of TS 32 and infinity in under 5s to avoid multiplying your infinity gain. Effortless with TS181. Alternatively, read the achievement image.`
  },
  "108": {
    id: 108,
    fullName: "We could afford 9",
    achievement: `Eternity with **exactly** 9 Replicanti`,
    strategy: `Get it once you can eternity easily without buying replicanti. Then do an eternity and buy 2-3% replicanti chance and a few interval upgrades.`
  },
  "111": {
    id: 111,
    fullName: "Yo dawg, I heard you liked infinities...",
    achievement: `Have all your Infinities in your past 10 Infinities be at least 1.8e308 times higher Infinity Points than the previous one.`,
    reward: `Your antimatter doesn't reset on Dimension Boosts or Antimatter Galaxies`,
    strategy: `Get it once you can quickly reach e4000 IP. Set autocrunch to 2e308 x last, eternity, and wait. We use 2e308 in order to avoid any unlucky errors.`,
  },
  "112": {
    id: 112,
    fullName: "Never again",
    achievement: "Get the sum of Infinity Challenge times below 750ms."
  },
  "113": {
    id: 113,
    fullName: "Eternities are the new infinity",
    achievement: "Eternity in under 250ms.",
    reward: "Gain x2 more Eternities."
  },
  "114": {
    id: 114,
    fullName: "You're a mistake.",
    achievement: "Fail an Eternity Challenge",
    reward: `A fading sense of accomplishment`,
    rewardFormula: `Sense of accomplishment (fading)`,
    strategy: `Can only be done in EC4 and EC12, as those are the only Eternity Challenges that can be failed.`
  },
  "115": {
    id: 115,
    fullName: "I wish I had gotten 7 eternities",
    achievement: "Start an Infinity Challenge inside an Eternity Challenge."
  },
  "116": {
    id: 116,
    fullName: "Do I really need to infinity",
    achievement: `Eternity with only 1 Infinity`,
    reward: `Multiplier to Infinity Points based on Infinities`,
    rewardFormula: `\`Infinities ^ log10(2) / 4\` (affected by TS31)`,
    strategy: `Respec out of TS 32 and infinity in under 5s to avoid multiplying your infinity gain. Effortless with TS181. Alternatively, read the achievement image for Achievement 107.`
  },
  "117": {
    id: 117,
    fullName: "Costco sells Dimboosts now!",
    achievement: "Bulk buy 750 Dimension Boosts at once.",
    reward: `The multiplier from Dimension Boosts to Antimatter Dimensions is 1% higher.`
  },
  "118": {
    id: 118,
    fullName: "IT'S OVER 9000",
    achievement: "Get a total Dimensional Sacrifice multiplier of 1e9000.",
    reward: "Dimensional Sacrifice doesn't reset your Antimatter Dimensions.",
  },
  "121": {
    id: 121,
    fullName: "Can you get infinite IP?",
    achievement: "Reach 1e30008 Infinity Points."
  },
  "122": {
    id: 122,
    fullName: "You're already dead.",
    achievement: "Eternity without buying Antimatter Dimensions 2-8."
  },
  "123": {
    id: 123,
    fullName: "5 more eternities until the update",
    achievement: "Complete 50 unique Eternity Challenge tiers."
  },
  "124": {
    id: 124,
    fullName: "Long lasting relationship",
    achievement: "Have your Infinity Power per second exceed your Infinity Power for 60 consecutive seconds during a single Infinity.",
    strategy: "**THIS WILL HAPPEN NATURALLY. JUST LET IT HAPPEN INSTEAD OF FORCING IT**"
  },
  "125": {
    id: 125,
    fullName: "Like feasting on a behind.",
    achievement: `Reach 1e90 Infinity Points without having any Infinities or any 1st Antimatter Dimensions in your current Eternity.`,
    reward: "Infinity Point multiplier based on time spent this Infinity",
    rewardFormula: `thisInfinity = \`Time.thisInfinity.totalSeconds * 10 + 1\` \n \`2 ^ log(thisInfinity) * min(thisInfinity ^ 0.11, 500)\``,
    // eslint-disable-next-line max-len
    strategy: `Only possible after you buy TS 181. Using idle, disable AD/ID autobuyers and eternity, enter normal challenge 12, and buy a 4th dim. Depending on how many EP you have, it can be achieved instantly or it takes up to 60 minutes.`,
  },
  "126": {
    id: 126,
    fullName: "Popular music",
    achievement: `Have 180 times more Replicanti Galaxies than Antimatter Galaxies`,
    reward: `Replicanti Galaxies divide your Replicanti by 1.8e308 instead of resetting them to 1`,
    strategy: `Reach at least 180 max RGs (can buy antimatter galaxies). Use active path because of 50% more RGs. Disable galaxy autobuyer, crunch, then buy 180 RGs.`
  },
  "127": {
    id: 127,
    fullName: "But I wanted another prestige layer...",
    achievement: "Reach 1.8e308 Eternity Points."
  },
  "128": {
    id: 128,
    fullName: "What do I have to do to get rid of you",
    achievement: "Reach 1e22000 Infinity Points without any Time Studies.",
    reward: "Time Dimensions are multiplied by the number of Time Studies you have.",
    rewardFormula: "×`max(study amount, 1)`"
  },
  "131": {
    id: 131,
    fullName: "No ethical consumption",
    achievement: `Get 2e9 Banked Infinities`,
    reward: `After Eternity you permanently keep 5% of your Infinities as Banked Infinities (stacks with TS191 to a total of 10%)`,
    strategy: `See \`/infinitygrinding post\`. Done in conjunction with r134 (When will it be enough?).`,
  },
  "132": {
    id: 132,
    fullName: "Unique snowflakes",
    achievement: "Have 569 Antimatter Galaxies without getting any Replicanti Galaxies in your current Eternity.",
    reward: "Gain a multiplier to Tachyon Particle and Dilated Time gain based on Antimatter Galaxies.",
    rewardFormula: "×`max(galaxies ^ 0.04, 1)`"
  },
  "133": {
    id: 133,
    fullName: "I never liked this infinity stuff anyways",
    achievement: `Reach 1e200,000 Infinity Points without buying any Infinity Dimensions or the ×2 Infinity Point multiplier`,
    reward: "You start Eternities with all Infinity Challenges unlocked and completed",
    rewardFormula: `Due to eternity milestone 7 you beat ICs as soon as you unlock them. But you don't have the rewards in the first few ticks on a new eternity, because you still need to reach the amount of AM to unlock those ICs.
    This achievements grants you those rewards even if you haven't unlocked ICs yet.
    However, this achievement reward is pretty much negligible as not having the IC rewards in the first ~100ms won't hinder you that much.`,
    strategy: `Disable your ID autobuyer and the autobuyer for the 2xIP multiplier on the Infinity Upgrades (not Break Infinity Upgrades!) tab`
  },
  "134": {
    id: 134,
    fullName: "When will it be enough?",
    achievement: `Reach 1e18,000 Replicanti`,
    reward: `You gain Replicanti 2 times faster under 1.8e308 Replicanti`,
    strategy: `Disable RG autobuyer while grinding banked infinities and wait. Done in conjunction with r131 (No Ethical Consumption). Takes 9 hours on mobile, 30 on web.`
  },
  "135": {
    id: 135,
    fullName: "Faster than a potato^286078",
    achievement: "Get more than 1e8,296,262 ticks per second."
  },
  "136": {
    id: 136,
    fullName: "I told you already, time is relative",
    achievement: "Dilate time."
  },
  "137": {
    id: 137,
    fullName: "Now you're thinking with dilation!",
    achievement: "Get 1e260,000 antimatter in 1 minute or less while Dilated.",
    reward: `Gain ×2 Dilated Time and Time Theorems while Dilated.`
  },
  "138": {
    id: 138,
    fullName: "This is what I have to do to get rid of you.",
    achievement: "Reach 1e26000 Infinity Points without any Time Studies while Dilated.",
    reward: `Removes the downsides from Time Study 131 and Time Study 133 in the Active and Idle Time Study Paths.`,
    rewardFormula: `Study 131 requires you to always hold R (either directly, or via the swipe trick) to purchase Replicanti galaxies. Study 133 dramatically slows down replicanti growth early on in your eternities. 
    By removing the downsides, you can focus on other aspects of your eternities leading up to Reality.`
  },
  "141": {
    id: 141,
    fullName: "Snap back to Reality",
    achievement: "Make a new Reality",
    reward: `×4 infinity Point gain, and increase the multiplier for buying 10 Antimatter Dimensions by +0.1`
  },
  "142": {
    id: 142,
    fullName: "How does this work?",
    achievement: "Unlock the automator",
    reward: `Dimension Boosts are 50% stronger.`,
    strategy: `The automator is unlocked when you gain 100 Automator Points. If you haven't unlocked the Automator yet, check out the Automator tab to see all the possible sources of AP.`
  },
  "143": {
    id: 143,
    fullName: "Yo dawg, I heard you like reskins...",
    achievement: `Have all your Eternities in your past 10 Eternities be for at least 1.8e308 times higher Eternity Points than the previous one.`,
    reward: `Galaxies no longer reset Dimension Boosts.`,
    strategy: `When you reach about e5000 EP (higher EP gives more leeway), disable automatic Antimatter and Replicanti Galaxies. Set your Eternity autobuyer to 1 EP, and disable it after you get one Eternity. 
    Then, check your statistics to see how much EP you got from that Eternity. Set your Eternity autobuyer to at least ×1.8e308 of that. If you need to, purchase galaxies by pressing Shift-G and R. 
    Repeat this process 10 times to get the achievement.`
  },
  "144": {
    id: 144,
    fullName: "Is this an Interstellar reference?",
    achievement: "Unlock the Black Hole.",
  },
  "145": {
    id: 145,
    fullName: "Are you sure these are the right way around?",
    achievement: "Have either black hole interval smaller than its duration.",
    reward: "Black Hole intervals are 10% shorter."
  },
  "146": {
    id: 146,
    fullName: "Perks of Living",
    achievement: "Have all Perks bought.  ",
    reward: "+1% Glyph Rarity",
    rewardFormula: "Increase the rarity of all Glyphs, AFTER their glyph rarity has been calculated, by 1%. Caps at 100%."
  },
  "147": {
    id: 147,
    fullName: "Master of Reality",
    achievement: "Have all Reality upgrades bought.",
    reward: "Unlock ||Teresa, the Celestial of Reality||.",
    // Strategy: "Repeatable Reality upgrades do not count. You must meet all the requirements for every Reality Upgrade, and then purchase them."
  },
  "148": {
    id: 148,
    fullName: "Royal Flush",
    achievement: "Reality with one of each basic Glyph type.",
    reward: "Gained Glyph level is increased by the number of distinct Glyph types equipped.",
    rewardFormula: "For each unique Glyph equipped (Power, Infinity, Replication, Time, Dilation, etc), the level of the glyphs you generate when you create a new Reality is increased by 1.",
    strategy: `First, purchase the Reality Upgrades "Linguistically Expand" and "Synthetic Symbolism". 
    Then, get one of each glyph type (Power, Infinity, Replication, Time, Dilation). 
    Finally, equip each of these glyphs and perform a Reality reset.`
  },
  "151": {
    id: 151,
    fullName: "You really didn't need it anyway",
    achievement: "Get 800 Antimatter Galaxies without buying 8th Antimatter Dimensions in your current Infinity.",
    reward: "Unlock ||V, the Celestial of Achievements.||",
  },
  "152": {
    id: 152,
    fullName: "Y'all got any more of them Glyphs?",
    achievement: "Have 100 Glyphs in your inventory.",
  },
  "153": {
    id: 153,
    fullName: `More like "reallydoesn'tmatter"`,
    achievement: "Reality without producing antimatter.",
  },
  "154": {
    id: 154,
    fullName: "I am speed",
    achievement: "Reality in under 5 seconds (game time).",
    reward: "10% chance each Reality of ×2 Realities and Perk Points.",
  },
  "155": {
    id: 155,
    fullName: "Achievement #15983",
    achievement: "Play for 13.7 billion years.",
    reward: "Black Hole durations are 10% longer.",
  },
  "156": {
    id: 156,
    fullName: "College Dropout",
    achievement: "Reality without buying Time Theorems.",
    reward: "Gain ×2.5 generated Time Theorems, and a free coupon to McDonalds™️.",
  },
  "157": {
    id: 157,
    fullName: "It's super effective!",
    achievement: "Get a Glyph with 4 effects.",
  },
  "158": {
    id: 158,
    fullName: "Bruh, are you like, inside the hole?",
    achievement: "Make both Black Holes permanent.",
    reward: "Black Hole power increased by 10%.",
  },
  "161": {
    id: 161,
    fullName: "that's where you're wrong kiddo",
    achievement: "Get 1e100,000,000 antimatter while Dilated.",
  },
  "162": {
    id: 162,
    fullName: "Reinstalled the game and rejoined the server",
    achievement: "Have every Time Study at once.",
  },
  "163": {
    id: 163,
    fullName: "Actually, super easy! Barely an inconvenience!",
    achievement: "Complete all the Eternity Challenges 5 times with less than 1 second (game time) in your current Reality.",
  },
  "164": {
    id: 164,
    fullName: "Infinity times two",
    achievement: "Get 1.8e308 Infinities.",
    reward: "Gain ×1,024 more Infinities.",
  },
  "165": {
    id: 165,
    fullName: "Perfectly balanced",
    achievement: "Get a level 5,000 Glyph with all Glyph level factors equally weighted.",
    reward: "Unlock optimal automatic Glyph level factor adjustment.",
    rewardFormula: "Be sure to go turn this on under 'Glyph Level Factors' on the Glyphs tab!"
  },
  "166": {
    id: 166,
    fullName: "Nicenice.",
    achievement: "Get a Glyph with level exactly 6,969.",
    reward: "+69 to Glyph level.",
  },
  "167": {
    id: 167,
    fullName: "Mr. Layer? Sorry, you're not on the list",
    achievement: "Reach 1.8e308 Reality Machines.",
    reward: "Gain more Reality Machines based on your current Reality Machines.",
    rewardFormula: "`max(1, log_2(reality machines))`"
  },
  "168": {
    id: 168,
    fullName: "Woah, we're halfway there",
    achievement: "Get 50 total Ra Celestial Memory levels.",
    reward: "Get 10% more memories.",
  },
  "171": {
    id: 171,
    fullName: "The god is delighted",
    achievement: "Sacrifice every sacrificable Glyph type at least once.",
    reward: "Glyph sacrifice is ×2 stronger.",
  },
  "172": {
    id: 172,
    fullName: "Hitchhiker's Guide to Reality",
    achievement: "Reality for 1.8e308 Reality Machines without having any Charged Infinity Upgrades, having any equipped Glyphs, or buying any Triad Studies.",
  },
  "173": {
    id: 173,
    fullName: "Cet accomplissement n'existe pas III",
    achievement: "Reach 9.99999e999 Reality Machines.",
  },
  "174": {
    id: 174,
    fullName: "Don't you already have two of these?",
    achievement: "Get a Singularity.",
  },
  "175": {
    id: 175,
    fullName: "The First Antihistorian",
    achievement: "Get 25,000 of all Alchemy Resources.",
    reward: "Synergism can go above 100% and Momentum increases ×10 faster.",
  },
  "176": {
    id: 176,
    fullName: "Mom counted to 3",
    achievement: "Annihilate your Dark Matter Dimensions.",
  },
  "177": {
    id: 177,
    fullName: "This mile took a celestial",
    achievement: "Complete all Singularity Milestones at least once.",
  },
  "178": {
    id: 178,
    fullName: "Destroyer of Worlds",
    achievement: "Get 100,000 Antimatter Galaxies.",
    reward: "All Galaxies are 1% stronger.",
  },
  // Since we want a different scramble every time, we generate it dynamically in the DoomedAchievement function
  "181": {
    id: 181,
    fullName: "Antimatter Dimensions Eternal",
    achievement: "Doom your Reality."
  },
  "182": {
    id: 182,
    fullName: "One more time",
    achievement: "Permanently gain back all Antimatter Dimension autobuyers."
  },
  "183": {
    id: 183,
    fullName: "Deja vOoM",
    achievement: "Complete Infinity Challenge 5 while Doomed.",
    reward: "All Antimatter Dimensions are raised to ^1.081",
    rewardFormula: "`Antimatter Dimensions ^ 1.0812403840463596`"
  },
  "184": {
    id: 184,
    fullName: "You're out!",
    achievement: "Encounter the third Pelle Strike.",
  },
  "185": {
    id: 185,
    fullName: "Four score and seven years ago",
    achievement: "Encounter the fourth Pelle Strike.",
  },
  "186": {
    id: 186,
    fullName: "An unhealthy obsession",
    achievement: "Purchase Time Study 181 while Doomed.",
  },
  "187": {
    id: 187,
    fullName: "Doomed Time",
    achievement: "Unlock Dilation while Doomed.",
    reward: "Increase the multiplier per repeatable Dilated Time multiplier upgrade by ×1.35"
  },
  "188": {
    id: 188,
    fullName: "The End",
    achievement: "Beat the game."
  }
};

export const AchievementEmbeds: EmbedBuilder[] = [];
export const AchievementImages: AttachmentBuilder[] = [];

for (const achievement in achievements) {
  const ach = achievements[achievement].id;
  if (ach >= 181) AchievementImages[ach] = new AttachmentBuilder(`src/images/misc/doomed.png`);
  else AchievementImages[ach] = new AttachmentBuilder(`src/images/achievements/${ach}.png`);
}

for (const achievement in achievements) {
  const ach = achievements[achievement];
  if (ach.id >= 181) AchievementEmbeds[ach.id] = DoomedAchievement(ach).setThumbnail(`attachment://doomed.png`);
  else AchievementEmbeds[ach.id] = Achievement(ach).setThumbnail(`attachment://${ach.id}.png`);
}

export const achievementsMessageObject = {
  "r23": `Get it after your first galaxy and the 90 8th dim costing dimboost by toggling the 8th Dimension autobuyer to singles.`,
  get "9th Dimension is a lie"() { return this.r23; },

  "r28": `After you have e150 1st dims, toggle the 1st Dimension autobuyer to singles.`,
  get "There's no point in doing that..."() { return this.r28; },

  "r36": `Do ***not*** do this on your first Infinity. When you Infinity, Galaxies are reset back to 0, so you can attempt it later when it's easier.`,
  get "Claustrophobic"() { return this.r36; },

  "r71": `Do it after the e39 ID2. Disable boost, galaxy and all dim autobuyers, go into C2 and buy 10 1st dims.`,
  get "Error 909: Dimension Not Found"() { return this.r71; },

  // Remove r43 after Reality
  "r43": `Trivial after you get ID1. Do it in C3. It doesn't need to be attempted early; if it is, it takes about 16+ hours before ID1.`,
  get "r77"() { return this.r43; },
  get "Zero Deaths"() { return this.r43; },

  "r81": `Trivial after Eternity. You can do it before then, but it's more tedious.`,
  get "Game Design is my Passion/Hevipelle did nothing wrong"() { return this.r81; },

  "r87": `Buy TS 32, disable galaxy autobuyer, set boost autobuyer to 0s, and crunch autobuyer to 0.1-1s depending on how long it takes to buy dimboosts for 32.`,
  get "2 Million Infinities"() { return this.r87; },

  "r91": `Trivial after Eternity. Takes up too much time pre-Eternity, and Eternity just simplifies it a whole lot.`,
  get "r92"() { return this.r91; },
  get "r97"() { return this.r91; },
  get "Ludicrous speed"() { return this.r91; },
  get "I break for nobody"() { return this.r91; },
  get "Yes, this is hell/Like jumping on a lego"() { return this.r91; },

  "r107": `Respec out of TS 32 and infinity in under 5s to avoid multiplying your infinity gain. Effortless with TS181.`,
  get "Do you really need a guide for this"() { return this.r107; },
  get "r116"() { return this.r107; },
  get "Do I really need to infinity"() { return this.r107; },

  "r108": `Get it once you can eternity easily without buying replicanti. Then do an eternity and buy 2-3% replicanti chance and a few interval upgrades.`,
  get "We could afford 9"() { return this.r108; },

  "r111": `Get it once you can quickly reach e4000 IP. Set autocrunch to 2e308 x last, eternity, and wait.`,
  get "Yo dawg, I heard you liked infinities..."() { return this.r111; },

  "r114": `Can only be done in EC4 and EC12, as those are the only Eternity Challenges that can be failed.`,
  get "You're a mistake."() { return this.r114; },

  "r125": `Only possible after you buy TS 181. Using idle, disable AD/ID autobuyers and eternity, enter normal challenge 12, and buy a 4th dim. Depending on how many EP you have, it can be achieved instantly or it takes up to 60 minutes.`,
  get "Like feasting on a behind."() { return this.r125; },

  "r126": `Reach at least 180 max RGs (can buy antimatter galaxies). Use active path because of 50% more RGs. Disable galaxy autobuyer, crunch, then buy 180 RGs.`,
  get "Popular music"() { return this.r126; },

  "r131": `See \`/infinitygrinding post\`. Done in conjunction with r134 (When will it be enough?).`,
  get "No ethical consumption"() { return this.r131; },

  "r133": `Disable your ID autobuyer and the autobuyer for the 2xIP multiplier on the Infinity Upgrades (not Break Infinity Upgrades!) tab.

  Due to eternity milestone 7 you beat ICs as soon as you unlock them. But you don't have the rewards in the first few ticks on a new eternity, because you still need to reach the amount of AM to unlock those ICs.
  This achievements grants you those rewards even if you haven't unlocked ICs yet.
  However, this achievement reward is pretty much negligible as not having the IC rewards in the first ~100ms won't hinder you that much.`,
  get "I never liked this infinity stuff anyways"() { return this.r133; },

  "r134": `Disable RG autobuyer while grinding banked infinities and wait. Done in conjunction with r131 (No Ethical Consumption). Takes 9 hours on mobile, 30 on web.`,
  get "When will it be enough?"() { return this.r134; }
};

export const acceptableArgs = Object.keys(achievementsMessageObject).filter(key => !key.startsWith("r")).concat(Object.keys(achievements));