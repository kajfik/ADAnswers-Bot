import { EmbedBuilder, EmbedField } from "discord.js";
import { footerText, formatNumber, pluralise } from "../../functions/Misc";
import { UpgradeInfo } from "../types";

export interface UpgradeData {
  [key: string]: {
    [key: string]: UpgradeInfo
  }
}

export const upgrades: UpgradeData = {
  infinity: {
    "timeMult": {
      id: "timeMult",
      name: "Time Multiplier",
      effect: "Antimatter Dimensions gain a multiplier based on time played",
      requirement: "None",
      cost: 1,
      formula: "`(time played in minutes / 2) ^ 0.15`"
    },
    "18mult": {
      id: "18mult",
      name: "1st & 8th Antimatter Dimension Multiplier",
      effect: "1st and 8th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "Time Multiplier",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)"
    },
    "27mult": {
      id: "27mult",
      name: "2nd & 7th Antimatter Dimension Multiplier",
      effect: "2nd and 7th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "Buy 10 Multiplier Increase",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)"
    },
    "36mult": {
      id: "36mult",
      name: "3rd & 6th Antimatter Dimension Multiplier",
      effect: "3rd and 6th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "1st & 8th Antimatter Dimension Multiplier",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)"
    },
    "45mult": {
      id: "45mult",
      name: "4th & 5th Antimatter Dimension Multiplier",
      effect: "4th and 5th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "2nd & 7th Antimatter Dimension Multiplier",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)"
    },
    "resetBoost": {
      id: "resetBoost",
      name: "Dimboost & Galaxy requirement reduction",
      effect: "Dimboost and Galaxy requirements are reduced by 9",
      requirement: "3rd & 6th Antimatter Dimension Multiplier",
      cost: 1,
    },
    "buy10mult": {
      id: "buy10mult",
      name: "Buy 10 Multiplier Increase",
      effect: "Increase the multiplier for buying 10 Antimatter Dimensions",
      requirement: "None",
      cost: 1,
      formula: "`2.0` -> `2.2`"
    },
    "galaxyBoost": {
      id: "galaxyBoost",
      name: "Galaxy Effect Boost",
      effect: "All Galaxies are twice as strong",
      requirement: "4th & 5th Antimatter Dimension Multiplier",
      cost: 2,
    },
    "thisInfinityTimeMult": {
      id: "thisInfinityTimeMult",
      name: "This Infinity Time Multiplier",
      effect: "Antimatter Dimensions gain a multiplier based on time spent in current Infinity",
      requirement: "None",
      cost: 3,
      formula: "`max((time in this infinity in minutes / 5) ^ 0.25, 1)`"
    },
    "unspentIPMult": {
      id: "unspentIPMult",
      name: "Unspent IP Multiplier",
      effect: "Multiplier to 1st Antimatter Dimension based on unspent Infinity Points",
      requirement: "This Infinity Time Multiplier",
      cost: 5,
      formula: "`((infinity points / 2) ^ 1.5) + 1`"
    },
    "dimboostMult": {
      id: "dimboostMult",
      name: "Dimboost Multiplier Increase",
      effect: "Increase Dimension Boost multiplier",
      requirement: "Unspent IP Multiplier",
      cost: 7,
      formula: "`2.0` -> `2.5`"
    },
    "ipGen": {
      id: "ipGen",
      name: "Infinity Point Generation",
      effect: "Passively generate Infinity Points 10 times slower than your fastest Infinity",
      requirement: "Dimboost Multiplier Increase",
      cost: 10,
      formula: "1 IP (affected by all IP multipliers) every `fastest infinity in milliseconds * 10`"
    },
    "skipReset1": {
      id: "skipReset1",
      name: "Free Dimboost 1",
      effect: "Start every reset with 1 Dimension Boost, automatically unlocking the 5th Antimatter Dimension",
      requirement: "None",
      cost: 20,
    },
    "skipReset2": {
      id: "skipReset2",
      name: "Free Dimboost 2",
      effect: "Start every reset with 2 Dimension Boosts, automatically unlocking the 6th Antimatter Dimension",
      requirement: "Free Dimboost 1",
      cost: 40,
    },
    "skipReset3": {
      id: "skipReset3",
      name: "Free Dimboost 3",
      effect: "Start every reset with 3 Dimension Boosts, automatically unlocking the 7th Antimatter Dimension",
      requirement: "Free Dimboost 2",
      cost: 80,
    },
    "skipReset4": {
      id: "skipReset4",
      name: "Free Dimboost 4",
      effect: "Start every reset with 4 Dimension Boosts, automatically unlocking the 8th Antimatter Dimension; and an Antimatter Galaxy",
      requirement: "Free Dimboost 3",
      cost: 300,
    }
  },
  break: {
    "totalAMMult": {
      id: "totalAMMult",
      name: "Total AM Multiplier",
      effect: "Antimatter Dimensions gain a multiplier based on total antimatter",
      formula: "`total antimatter exponent + 1 ^ 0.5`",
      cost: 1e4
    },
    "currentAMMult": {
      id: "currentAMMult",
      name: "Current AM Multiplier",
      effect: "Antimatter Dimensions gain a multiplier based on current antimatter",
      formula: "`current antimatter exponent + 1 ^ 0.5`",
      cost: 5e4
    },
    "galaxyBoost": {
      id: "galaxyBoost",
      name: "Galaxy Effect Boost",
      effect: "All Galaxies are 50% stronger",
      cost: 5e11
    },
    "infinitiedMult": {
      id: "infinitiedMult",
      name: "AD Multiplier from Infinities",
      effect: "Antimatter Dimensions gain a multiplier based on Infinities",
      formula: "`log10(infinities) * 10`",
      cost: 1e5
    },
    "achievementMult": {
      id: "achievementMult",
      name: "Achievement Multiplier",
      effect: "Antimatter Dimensions gain a multiplier based on Achievements completed",
      formula: "`max(((achievements completed - 30) ^ 3) / 40, 1)`",
      cost: 1e6
    },
    "slowestChallengeMult": {
      id: "slowestChallengeMult",
      name: "Slowest Challenge Multiplier",
      effect: "Antimatter Dimensions gain a multiplier based on slowest challenge run",
      formula: "`50 / slowest challenge run in minutes` (minimum x1)",
      cost: 1e7
    },
    "infinitiedGen": {
      id: "infinitiedGen",
      name: "Infinity Generation",
      effect: "Passively generate Infinities based on your fastest Infinity",
      formula: "1 infinity (affected by multipliers) every `best infinity in milliseconds * 5`",
      cost: 2e7
    },
    "autobuyMaxDimboosts": {
      id: "autobuyMaxDimboosts",
      name: "Dimboost Autobuyer Improvement",
      effect: "Unlock the buy max Dimension Boost Autobuyer mode",
      cost: 5e9
    },
    "autobuyerSpeed": {
      id: "autobuyerSpeed",
      name: "Autobuyer Improvement",
      effect: "Autobuyers unlocked or improved by Normal Challenges work twice as fast",
      cost: 1e15,
    },
    "tickspeedCostMult": {
      id: "tickspeedCostMult",
      name: "Tickspeed Cost Multiplier Reduction",
      effect: "Reduce post-infinity Tickspeed Upgrade cost multiplier scaling",
      cost: "Initially `5e6` Infinity Points, increasing by a factor of `5` every purchase",
      formula: "`-x`, where x is purchases of this upgrade (max 8)",
    },
    "dimCostMult": {
      id: "dimCostMult",
      name: "Dimension Cost Multiplier Reduction",
      effect: "Reduce post-infinity Antimatter Dimension cost multiplier scaling",
      cost: "Initially `1e7` Infinity Points, increasing by a factor of `5e3` every purchase",
      formula: "`-x`, where x is purchases of this upgrade (max 7)",
    },
    "ipGen": {
      id: "ipGen",
      name: "Infinity Point Generation",
      effect: "Gemerate a percentage of your best IP/min from your last 10 Infinities, works offline",
      cost: "Intially `1e7` Infinity Points, increasing by a factor of `10` every purchase",
      formula: "`(x * 5)%`, where x is purchases of this upgrade (max 10)",
    }
  },
  eternity: {
    "idMultEP": {
      id: "idMultEP",
      name: "ID Multiplier from Eternity Points (EU1)",
      effect: `Infinity Dimensions multiplier based on unspent Eternity Points`,
      formula: "`eternity points + 1`",
      cost: 5,
      formatNicely: false,
    },
    "idMultEternities": {
      id: "idMultEternities",
      name: "ID Multiplier from Eternities (EU2)",
      effect: `Infinity Dimensions multiplier based on Eternities, softcap at 1e5 Eternities`,
      formula: `
      (Softcap around 1e5 eternities; refer to graph)
      eterPreCap = \`clampMax(eternities, 1e5)\`
      base = \`eterPreCap / 200 + 1\`
      pow = \`log(eterPreCap * 2  + 1) / log10(4)\`
      multPreCap = \`base ^ pow\`

      eterPostCap = \`eternities - 1e5\`
      mult1 = \`eterPostCap / 200 + 1\`
      mult2 = \`ln(eterPostCap * 2 + 1) / log10(4)\`
      multPostCap = \`mult1 * mult2\`

      final multiplier: \`multPostCap * multPreCap\`
      `,
      cost: 10,
      formatNicely: false,
      hasGraph: true,
      graph: `https://cdn.discordapp.com/attachments/351479640755404820/990792593120063598/idMultEternities.png`,
    },
    "idMultICRecords": {
      id: "idMultICRecords",
      name: "ID Multiplier from Infinity Challenge Records (EU3)",
      effect: "Infinity Dimensions multiplier based on sum of Infinity Challenge times",
      formula: "`2 ^ 30 / sum of infinity challenge times`, capping at x`6.38e14`",
      cost: 5e4,
    },
    "tdMultAchs": {
      id: "tdMultAchs",
      name: "TD Multiplier from Achievements (EU4)",
      effect: "Your Achievement bonus affects Time Dimensions",
      cost: 1e16,
    },
    "tdMultTheorems": {
      id: "tdMultTheorems",
      name: "TD Multiplier from Theorems (EU5)",
      effect: "Time Dimensions are multiplied by your unspent Time Theorems",
      cost: 1e40,
    },
    "tdMultDaysPlayed": {
      id: "tdMultDaysPlayed",
      name: "TD Multiplier from Days Played (EU6)",
      effect: "Time Dimensions are multiplied by days played",
      cost: 1e50,
    }
  },
  dilation: {
    "dtGain": {
      id: "dtGain",
      name: "Dilation Gain Multiplier",
      effect: "Double Dilated Time gain",
      initialCost: 1e5,
      increment: 10,
      rebuyable: true,
    },
    "galaxyThreshold": {
      id: "galaxyThreshold",
      name: "Galaxy Threshold Reduction",
      effect: "Reset Dilated Time and Tachyon Galaxies, but lower their threshold",
      initialCost: 1e6,
      increment: 100,
      formula: "-`0.8 ^ bought`",
      rebuyable: true,
    },
    "tachyonGain": {
      id: "tachyonGain",
      name: "Tachyon Gain Multiplier",
      effect: "Triple the amount of Tachyon Particles gained",
      initialCost: 1e7,
      increment: 20,
      rebuyable: true,
    },
    "doubleGalaxies": {
      id: "doubleGalaxies",
      name: "Double Galaxies",
      effect: "Gain twice as many Tachyon Galaxies",
      initialCost: 5e6
    },
    "tdMultReplicanti": {
      id: "tdMultReplicanti",
      name: "TD Multiplier from Replicanti",
      effect: "Time Dimensions are affected by Replicanti Multiplier ^0.1",
      initialCost: 1e9,
    },
    "adMultDT": {
      id: "adMultDT",
      name: "AD Multiplier from Dilated Time",
      effect: "Antimatter Dimension multiplier based on Dialted Time, unaffected by Time Dilation",
      initialCost: 5e7,
      formula: "`dilated time ^ 308`",
    },
    "ipMultDT": {
      id: "ipMultDT",
      name: "IP Multiplier from Dilated Time",
      effect: "Gain a multiplier to Infinity Points based on Dilated Time",
      initialCost: 2e12,
      formula: "`dilated time ^ 1000`"
    },
    "timeStudySplit": {
      id: "timeStudySplit",
      name: "All three Dimension Path trees",
      effect: "You can buy all three Time Study paths from the Dimension Split",
      initialCost: 1e10,
    },
    "dilationPenalty": {
      id: "dilationPenalty",
      name: "Dilation Penalty Reduction",
      effect: "Reduce the Dilation penalty (^1.05 after reduction)",
      formula: "No, this does not make Dilation better than outside of it. It adds a ^1.05 after the main Dilation penalty",
      initialCost: 1e11,
    },
    "ttGenerator": {
      id: "ttGenerator",
      name: "Time Theorem Generator",
      effect: "Generate Time Theorems based on Tachyon Particles",
      initialCost: 1e15,
      formula: "`tachyon particles / 20000` per second"
    }
  },
  reality: {
    "temporalAmplifier": {
      id: "temporalAmplifier",
      name: "Temporal Amplifier",
      effect: "Gain Dilated Time 3 times faster",
      initialCost: 1,
      increment: 30,
      rebuyable: true,
    },
    "replicativeAmplifier": {
      id: "replicativeAmplifier",
      name: "Replicative Amplifier",
      effect: "Gain Replicanti 3 times faster",
      initialCost: 1,
      increment: 30,
      rebuyable: true,
    },
    "eternalAmplifier": {
      id: "eternalAmplifier",
      name: "Eternal Amplifier",
      effect: "Gain 3 times more Eternities",
      initialCost: 2,
      increment: 30,
      rebuyable: true,
    },
    "superluminalAmplifier": {
      id: "superluminalAmplifier",
      name: "Superluminal Amplifier",
      effect: "Gain 3 times more Tachyon Particles",
      initialCost: 2,
      increment: 30,
      rebuyable: true,
    },
    "boundlessAmplifier": {
      id: "boundlessAmplifier",
      name: "Boundless Amplifier",
      effect: "Gain 5 times more Infinities",
      initialCost: 3,
      increment: 50,
      rebuyable: true,
    },
    "cosmicallyDuplicate": {
      id: "cosmicallyDuplicate",
      name: "Cosmically Duplicate",
      effect: "Replicanti speed is multiplied based on Replicanti Galaxies",
      formula: "1 + 0.02 * (Replicanti Galaxies)",
      initialCost: 15,
      requirement: "Complete your first Eternity in a Reality without using Replicanti Galaxies"
    },
    "innumerablyConstruct": {
      id: "innumerablyConstruct",
      name: "Innumerably Construct",
      effect: "Infinity gain is boosted from Antimatter Galaxy count",
      // Formula: "1 + 0.02 * (Replicanti Galaxies)",
      initialCost: 15,
      requirement: "Complete your first Infinity in a Reality with at most 1 Antimatter Galaxy"
    },
    "paradoxicallyAttain": {
      id: "paradoxicallyAttain",
      name: "Paradoxically Attain",
      effect: "Tachyon Particle gain is boosted based on Achievement Multiplier",
      formula: "sqrt(Achievement Multiplier)",
      initialCost: 15,
      requirement: "Get to Eternity without any Automatic Achievements (Your first Reality does not count)"
    },
    "linguisticallyExpand": {
      id: "linguisticallyExpand",
      name: "Linguistically Expand",
      effect: "Gain another Glyph slot",
      initialCost: 15,
      requirement: "Eternity for 1e4000 Eternity Points using only a single Glyph with a level of 3 or more"
    },
    "existentiallyProlong": {
      id: "existentiallyProlong",
      name: "Existentially Prolong",
      effect: "Start every Reality with 100 Eternities (Also applies to current Reality)",
      initialCost: 15,
      requirement: "Complete your first Eternity with at least 1e400 IP"
    },
    "boundlessFlow": {
      id: "boundlessFlow",
      name: "The Boundless Flow",
      effect: "Every second, gain 10% of the Infinities you would normally gain from Infinitying",
      formula: "(Infinities gained on Crunch) * 0.1",
      initialCost: 50,
      requirement: "Have at least 1e12 Banked Infinities at once"
    },
    "knowingExistence": {
      id: "knowingExistence",
      name: "The Knowing Existence",
      effect: "Eternity Point multiplier based on Reality and Time Theorem count",
      // Formula: "Unknown",
      initialCost: 50,
      requirement: "Eternity for 1e70 Eternity Points without any Eternity Challenge 1 completions"
    },
    "telomechanicalProcess": {
      id: "telomechanicalProcess",
      name: "The Telomechanical Process",
      effect: "Improve Eternity Autobuyer and unlock autobuyers for Time Dimensions and the x5 EP upgrade",
      initialCost: 50,
      requirement: "Eternity for 1e4000 EP without Time Dimensions 5-8"
    },
    "eternalFlow": {
      id: "eternalFlow",
      name: "The Eternal Flow",
      effect: "Gain Eternities per second equal to your Reality count",
      formula: "(Reality count)",
      initialCost: 50,
      requirement: "Have at least 1e7 Eternities in a single Reality"
    },
    "paradoxicalForever": {
      id: "paradoxicalForever",
      name: "The Paradoxical Forever",
      effect: "Boost Tachyon Particle gain based on the x5 Eternity Point multiplier",
      // Formula: "Unknown",
      initialCost: 50,
      requirement: "Have 1e10 Eternity Points without purchasing the x5 Eternity Point Upgrade"
    },
    "disparityOfRarity": {
      id: "disparityOfRarity",
      name: "Disparity of Rarity",
      effect: "Improve the Glyph Rarity formula",
      // Formula: "Unknown, may be possible to just delete this",
      initialCost: 1500,
      requirement: "Make a new Reality with 4 Glyphs equipped of uncommon or better rarity"
    },
    "duplicityOfPotency": {
      id: "duplicityOfPotency",
      name: "Duplicity of Potency",
      effect: "50% chance to get an additional effect on Glyphs",
      initialCost: 1500,
      requirement: "Make a new Reality with 4 Glyphs equipped, each having at least 2 effects"
    },
    "measureOfForever": {
      id: "measureOfForever",
      name: "Measure of Forever",
      effect: "Eternity Count boosts Glyph level",
      formula: "0.45 * log(Eternities) ^ 0.5; see Glyph Level Factors panel for more info",
      initialCost: 1500,
      requirement: "Make a new Reality with 4 Glyphs equipped, each being level 10 or higher"
    },
    "scourToEmpower": {
      id: "scourToEmpower",
      name: "Scour to Empower",
      effect: "Unlock Glyph Sacrifice, allowing you to sacrifice glyphs for permanent bonuses",
      initialCost: 1500,
      requirement: "Have at least 30 Glyphs at once"
    },
    "parityOfSingularity": {
      id: "parityOfSingularity",
      name: "Parity of Singularity",
      effect: "Unlock a second Black Hole",
      initialCost: 1500,
      requirement: "Exist for 100 days after unlocking the first Black Hole"
    },
    "cosmicConglomerate": {
      id: "cosmicConglomerate",
      name: "Cosmic Conglomerate",
      effect: "Move Remote Antimatter Galaxy scaling to 100,000 galaxies",
      initialCost: 1e5,
      requirement: "Have a total of at least 2,800 Galaxies from all types"
    },
    "temporalTranscendence": {
      id: "temporalTranscendence",
      name: "Temporal Transcendence",
      effect: "Time Dimension multiplier based on days spent in a Reality",
      // Formula: "Unknown"
      initialCost: 1e5,
      requirement: "Have at least e28000 Time Shards"
    },
    "replicativeRapidly": {
      id: "replicativeRapidly",
      name: "Replicative Rapidly",
      effect: "Replicanti speed is boosted based on your fastest Reality (game time)",
      // Formula: "Unknown"
      initialCost: 1e5,
      requirement: "Make a new Reality in under 15 minutes (game time)"
    },
    "syntheticSymbolism": {
      id: "syntheticSymbolism",
      name: "Synthetic Symbolism",
      effect: "Gain another Glyph slot",
      initialCost: 1e5,
      requirement: "Reality for at least 5000 Machines without Glyphs equipped"
    },
    "effortlessExistence": {
      id: "effortlessExistence",
      name: "Effortless Existence",
      effect: "Unlock the Reality Autobuyer, the Reality automator command, and the Automator if you haven't done so yet",
      initialCost: 1e5,
      requirement: "Reach 1e11111 EP"
    },
  }
};

const FieldGetter = {
  infinity(upgradeInfo: UpgradeInfo): EmbedField[] {
    const fields = [
      { name: "Effect", value: upgradeInfo.effect, inline: false },
      { name: "Requirement", value: upgradeInfo.requirement as string, inline: false },
      { name: "Cost", value: `${upgradeInfo.cost} ${pluralise("Infinity Point", upgradeInfo.cost as number)}`, inline: false },
    ];
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula, inline: false });
    return fields;
  },
  breakInfinity(upgradeInfo: UpgradeInfo): EmbedField[] {
    const fields = [
      { name: "Effect", value: upgradeInfo.effect, inline: false },
    ];
    if (typeof upgradeInfo.cost === "number") fields.push({ name: "Cost", value: `${formatNumber(upgradeInfo.cost)} ${pluralise("Infinity Point", upgradeInfo.cost)}`, inline: false });
    else if (typeof upgradeInfo.cost === "string") fields.push({ name: "Cost", value: upgradeInfo.cost, inline: false });
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula, inline: false });
    return fields;
  },
  eternity(upgradeInfo: UpgradeInfo): EmbedField[] {
    const formattedCost = upgradeInfo.formatNicely === undefined ? formatNumber(upgradeInfo.cost as number) : upgradeInfo.cost;
    const fields = [
      { name: "Effect", value: upgradeInfo.effect, inline: false },
      { name: "Cost", value: `${formattedCost} ${pluralise("Eternity Point", upgradeInfo.cost as number)}`, inline: false }
    ];
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula, inline: false });
    return fields;
  },
  dilation(upgradeInfo: UpgradeInfo): EmbedField[] {
    const formattedCost = formatNumber(upgradeInfo.initialCost as number);
    const fields = [
      { name: "Effect", value: upgradeInfo.effect, inline: false },
      { name: "Cost", value: `${formattedCost} Dilated Time${upgradeInfo.rebuyable ? `, increasing by a factor of ${upgradeInfo.increment} each purchase` : ``}`, inline: false },
    ];
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula, inline: false });
    return fields;
  },
  reality(upgradeInfo: UpgradeInfo): EmbedField[] {
    const formattedCost = formatNumber(upgradeInfo.initialCost as number);
    const fields = [
      { name: "Effect", value: upgradeInfo.effect, inline: false },
      { name: "Requirement", value: upgradeInfo.requirement as string, inline: false },
      { name: "Cost", value: `${formattedCost} ${pluralise("Reality Machine", upgradeInfo.cost as number)}${upgradeInfo.rebuyable ? `, increasing by a factor of ${upgradeInfo.increment} each purchase` : ``}`, inline: false },
    ];
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula, inline: false });
    return fields;

  }
};

const InfinityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor("#b67f33")
  .addFields(FieldGetter.infinity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const BreakInfinityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor("#b67f33")
  .addFields(FieldGetter.breakInfinity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const EternityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor("#b341e0")
  .addFields(FieldGetter.eternity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const DilationUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor("#64dd17")
  .addFields(FieldGetter.dilation(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const RealityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor("#0ba00e")
  .addFields(FieldGetter.reality(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

interface EmbedGetters {
  [key: string]: Function;
}

export const UpgradeEmbedGetters: EmbedGetters = {
  infinity: InfinityUpgrade,
  break: BreakInfinityUpgrade,
  eternity: EternityUpgrade,
  dilation: DilationUpgrade,
  reality: RealityUpgrade
};