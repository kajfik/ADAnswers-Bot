"use strict";

const { MessageEmbed } = require("discord.js");
const { Misc } = require("../../classes/FunctionClasses/Misc");

const footerText = () => (Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Art by MrKrutaman#1705`);

const upgrades = {
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
  }
};

const FieldGetter = {
  infinity(upgradeInfo) {
    const fields = [
      { name: "Effect", value: upgradeInfo.effect },
      { name: "Requirement", value: upgradeInfo.requirement },
      { name: "Cost", value: `${upgradeInfo.cost} ${Misc.pluralise("Infinity Point", upgradeInfo.cost)}` },
    ];
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula });
    return fields;
  },
  breakInfinity(upgradeInfo) {
    const fields = [
      { name: "Effect", value: upgradeInfo.effect },
    ];
    if (typeof upgradeInfo.cost === "number") fields.push({ name: "Cost", value: `${Misc.formatNumber(upgradeInfo.cost)} ${Misc.pluralise("Infinity Point", upgradeInfo.cost)}` });
    else if (typeof upgradeInfo.cost === "string") fields.push({ name: "Cost", value: upgradeInfo.cost });
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula });
    return fields;
  },
  eternity(upgradeInfo) {
    const formattedCost = upgradeInfo.formatNicely === undefined ? Misc.formatNumber(upgradeInfo.cost) : upgradeInfo.cost;
    const fields = [
      { name: "Effect", value: upgradeInfo.effect },
      { name: "Cost", value: `${formattedCost} ${Misc.pluralise("Eternity Point", upgradeInfo.cost)}` }
    ];
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula });
    return fields;
  },
  dilation(upgradeInfo) {
    const formattedCost = Misc.formatNumber(upgradeInfo.initialCost);
    const fields = [
      { name: "Effect", value: upgradeInfo.effect },
      { name: "Cost", value: `${formattedCost} Dilated Time${upgradeInfo.rebuyable ? `, increasing by a factor of ${upgradeInfo.increment} each purchase` : ``}` },
    ];
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula });
    return fields;
  }
};

const InfinityUpgrade = upgradeInfo => new MessageEmbed()
  .setTitle(upgradeInfo.name)
  .setColor("#b67f33")
  .addFields(FieldGetter.infinity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const BreakInfinityUpgrade = upgradeInfo => new MessageEmbed()
  .setTitle(upgradeInfo.name)
  .setColor("#b67f33")
  .addFields(FieldGetter.breakInfinity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const EternityUpgrade = upgradeInfo => new MessageEmbed()
  .setTitle(upgradeInfo.name)
  .setColor("#b341e0")
  .addFields(FieldGetter.eternity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const DilationUpgrade = upgradeInfo => new MessageEmbed()
  .setTitle(upgradeInfo.name)
  .setColor("#64dd17")
  .addFields(FieldGetter.dilation(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const UpgradeEmbedGetters = {
  infinity: InfinityUpgrade,
  break: BreakInfinityUpgrade,
  eternity: EternityUpgrade,
  dilation: DilationUpgrade
};

module.exports = {
  InfinityUpgrade,
  BreakInfinityUpgrade,
  EternityUpgrade,
  DilationUpgrade,
  UpgradeEmbedGetters,
  upgrades
};