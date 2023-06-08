import { EmbedBuilder, EmbedField } from "discord.js";
import { footerText, pluralise } from "../../functions/Misc";
import { Colour } from "../colours";
import { UpgradeInfo } from "../types";
import { formatNumber } from "../../utils/format";

interface UpgradeData {
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
      formula: "`(time played in minutes / 2) ^ 0.15`",
      charged: {
        effect: "Antimatter Dimensions gain a power effect based on time played and Teresa level",
        formula: "`1 + (log10(log10(time played in milleseconds)) * (Teresa level ^ 0.5)) / 150`"
      }
    },
    "18mult": {
      id: "18mult",
      name: "1st & 8th Antimatter Dimension Multiplier",
      effect: "1st and 8th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "Time Multiplier",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)",
      charged: {
        effect: "1st and 8th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
        formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`",
      }
    },
    "27mult": {
      id: "27mult",
      name: "2nd & 7th Antimatter Dimension Multiplier",
      effect: "2nd and 7th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "Buy 10 Multiplier Increase",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)",
      charged: {
        effect: "2nd and 7th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
        formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`",
      }
    },
    "36mult": {
      id: "36mult",
      name: "3rd & 6th Antimatter Dimension Multiplier",
      effect: "3rd and 6th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "1st & 8th Antimatter Dimension Multiplier",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)",
      charged: {
        effect: "3rd and 6th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
        formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`",
      }
    },
    "45mult": {
      id: "45mult",
      name: "4th & 5th Antimatter Dimension Multiplier",
      effect: "4th and 5th Antimatter Dimensions gain a multiplier based on Infinities",
      requirement: "2nd & 7th Antimatter Dimension Multiplier",
      cost: 1,
      formula: "`infinities * 0.2 + 1` (affected by TS31)",
      charged: {
        effect: "4th and 5th Antimatter Dimensions gain a power effect based on Infinities and Teresa level",
        formula: "`1 + log10(max(1, log10(infinities))) * sqrt(Teresa level) / 150`",
      }
    },
    "resetBoost": {
      id: "resetBoost",
      name: "Dimboost & Galaxy requirement reduction",
      effect: "Dimboost and Galaxy requirements are reduced by 9",
      requirement: "3rd & 6th Antimatter Dimension Multiplier",
      cost: 1,
      charged: {
        effect: "Decrease Dimension Boost requirement based on Teresa level",
        formula: "`1 / (1 + sqrt(Teresa level) / 10)`",
      }
    },
    "buy10mult": {
      id: "buy10mult",
      name: "Buy 10 Multiplier Increase",
      effect: "Increase the multiplier for buying 10 Antimatter Dimensions",
      requirement: "None",
      cost: 1,
      formula: "`2.0` -> `2.2`",
      charged: {
        effect: "The multiplier for buying 10 Antimatter Dimensions gains a power effect based on Teresa level",
        formula: "`1 + (Teresa level) / 200`"
      }
    },
    "galaxyBoost": {
      id: "galaxyBoost",
      name: "Galaxy Effect Boost",
      effect: "All Galaxies are twice as strong",
      requirement: "4th & 5th Antimatter Dimension Multiplier",
      cost: 2,
      charged: {
        effect: "All Galaxies are stronger based on Teresa level",
        formula: "`2 + sqrt(Teresa level) / 100`\nThis upgrade in the code is a multiplier, so this is x times stronger galaxies. Subtract 1, and turn it into a percent to find the value on the upgrade."
      }
    },
    "thisInfinityTimeMult": {
      id: "thisInfinityTimeMult",
      name: "This Infinity Time Multiplier",
      effect: "Antimatter Dimensions gain a multiplier based on time spent in current Infinity",
      requirement: "None",
      cost: 3,
      formula: "`max((time in this infinity in minutes / 5) ^ 0.25, 1)`",
      charged: {
        effect: "Antimatter Dimensions gain a power effect based on time spent in current Infinity and Teresa level",
        formula: "`1 + (log10(log10(time played in milleseconds)) * (Teresa level ^ 0.5)) / 150`"
      }
    },
    "unspentIPMult": {
      id: "unspentIPMult",
      name: "Unspent IP Multiplier",
      effect: "Multiplier to 1st Antimatter Dimension based on unspent Infinity Points",
      requirement: "This Infinity Time Multiplier",
      cost: 5,
      formula: "`((infinity points / 2) ^ 1.5) + 1`",
      charged: {
        effect: "Multiplier to 1st Antimatter Dimension based on unspent Infinity Points, powered by Teresa level",
        formula: "`((IP / 2) ^ (sqrt(Teresa level) * 1.5)) + 1`"
      }
    },
    "dimboostMult": {
      id: "dimboostMult",
      name: "Dimboost Multiplier Increase",
      effect: "Increase Dimension Boost multiplier",
      requirement: "Unspent IP Multiplier",
      cost: 7,
      formula: "`2.0` -> `2.5`",
      charged: {
        effect: "Dimension Boost multiplier gains a power effect based on Teresa level",
        formula: "`1 + Teresa level / 200`"
      }
    },
    "ipGen": {
      id: "ipGen",
      name: "Infinity Point Generation",
      effect: "Passively generate Infinity Points 10 times slower than your fastest Infinity",
      requirement: "Dimboost Multiplier Increase",
      cost: 10,
      formula: "1 IP (affected by all IP multipliers) every `fastest infinity in milliseconds * 10`",
      charged: {
        effect: "Gain Reality Machines each real-time second proportional to amount gained on Reality, increasing with Teresa level",
        formula: "`Teresa level ^ 2`\nBoosted by V level 10 by a factor of `1 + 2.4 * (min(10, max(0, log10(TT) - 350) / 50))`"
      }
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
      formula: "`1 + 0.02 * (Replicanti Galaxies)`",
      initialCost: 15,
      requirement: "Complete your first Eternity in a Reality without using Replicanti Galaxies"
    },
    "innumerablyConstruct": {
      id: "innumerablyConstruct",
      name: "Innumerably Construct",
      effect: "Infinity gain is boosted from Antimatter Galaxy count",
      formula: "`1 + (galaxies / 30)`",
      initialCost: 15,
      requirement: "Complete your first Infinity in a Reality with at most 1 Antimatter Galaxy"
    },
    "paradoxicallyAttain": {
      id: "paradoxicallyAttain",
      name: "Paradoxically Attain",
      effect: "Tachyon Particle gain is boosted based on Achievement Multiplier",
      formula: "`sqrt(Achievement Multiplier)`",
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
      formula: "`(Infinities gained on Crunch) * 0.1`",
      initialCost: 50,
      requirement: "Have at least 1e12 Banked Infinities at once"
    },
    "knowingExistence": {
      id: "knowingExistence",
      name: "The Knowing Existence",
      effect: "Eternity Point multiplier based on Reality and Time Theorem count",
      formula: "`max(TT - 1e3, 2) ^ log2(min(realities, 1e4))`",
      initialCost: 50,
      requirement: "Eternity for 1e70 Eternity Points without any Eternity Challenge 1 completions"
    },
    "telemechanicalProcess": {
      id: "telemechanicalProcess",
      name: "The Telemechanical Process",
      effect: "Improve Eternity Autobuyer and unlock autobuyers for Time Dimensions and the x5 EP upgrade",
      initialCost: 50,
      requirement: "Eternity for 1e4000 EP without Time Dimensions 5-8"
    },
    "eternalFlow": {
      id: "eternalFlow",
      name: "The Eternal Flow",
      effect: "Gain Eternities per second equal to your Reality count",
      formula: "`(Reality count)`, affected by Eternity multipliers",
      initialCost: 50,
      requirement: "Have at least 1e7 Eternities in a single Reality"
    },
    "paradoxicalForever": {
      id: "paradoxicalForever",
      name: "The Paradoxical Forever",
      effect: "Boost Tachyon Particle gain based on the x5 Eternity Point multiplier",
      formula: "`max(sqrt(log10(ep mult effect)) / 9, 1)`",
      initialCost: 50,
      requirement: "Have 1e10 Eternity Points without purchasing the x5 Eternity Point Upgrade"
    },
    "disparityOfRarity": {
      id: "disparityOfRarity",
      name: "Disparity of Rarity",
      effect: "Improve the Glyph Rarity formula",
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
      formula: "`10 ^ (1 + (2 * log10(time in reality in days + 1)) ^ 1.6)`",
      initialCost: 1e5,
      requirement: "Have at least e28000 Time Shards"
    },
    "replicativeRapidity": {
      id: "replicativeRapidity",
      name: "Replicative Rapidity",
      effect: "Replicanti speed is boosted based on your fastest Reality (game time)",
      formula: "`15 / clamp(best reality in minutes, 1/12, 15)`",
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
  },
  imaginary: {
    // Repeatables
    "temporalIntensifier": {
      id: "temporalIntensifier",
      name: "Temporal Intensifier",
      effect: "Increase Temporal Amplifier multiplier by +0.15",
      initialCost: 3,
      increment: 60,
      rebuyable: true
    },
    "replicativeIntensifier": {
      id: "replicativeIntensifier",
      name: "Replicative Intensifier",
      effect: "Increase Replicative Amplifier multiplier by +0.15",
      initialCost: 4,
      increment: 60,
      rebuyable: true
    },
    "eternalIntensifier": {
      id: "eternalIntensifier",
      name: "Eternal Intensifier",
      effect: "Increase Eternal Amplifier multiplier by +0.40",
      initialCost: 1,
      increment: 40,
      rebuyable: true,
    },
    "superluminalIntensifier": {
      id: "superluminalIntensifier",
      name: "Superluminal Intensifier",
      effect: "Increase Superluminal Amplifier multiplier by +0.15",
      initialCost: 5,
      increment: 80,
      rebuyable: true,
    },
    "boundlessIntensifier": {
      id: "boundlessIntensifier",
      name: "Boundless Intensifier",
      effect: "Increase Boundless Amplifier multiplier by +0.60",
      initialCost: 1,
      increment: 30,
      rebuyable: true,
    },
    "ellipticMateriality": {
      id: "ellipticMateriality",
      name: "Elliptic Materiality",
      effect: "Increase the Reality Machine cap by ×1e100",
      initialCost: 1e4,
      increment: 500,
      rebuyable: true,
    },
    "runicAssurance": {
      id: "runicAssurance",
      name: "Runic Assurance",
      effect: "Delay Glyph Instability starting level by 200",
      initialCost: 2e5,
      increment: 500,
      rebuyable: true,
    },
    "hyperbolicApeirogon": {
      id: "hyperbolicApeirogon",
      name: "Hyperbolic Apeirogon",
      effect: "Multiply Infinity Dimensions by 1e100,000",
      initialCost: 1e7,
      increment: 800,
      rebuyable: true,
    },
    "cosmicFilament": {
      id: "cosmicFilament",
      name: "Cosmic Filament",
      effect: "Increase Galaxy strength",
      initialCost: 1e9,
      increment: 1000,
      rebuyable: true,
    },
    "entropicCondensing": {
      id: "entropicCondensing",
      name: "Entropic Condensing",
      effect: "Increase Singularity gain",
      initialCost: 8e9,
      increment: 2000,
      rebuyable: true,
    },
    // Single time
    "suspicionOfInterference": {
      id: "suspicionOfInterference",
      name: "Suspicion of Interference",
      effect: "Time Dimension power based on total antimatter",
      initialCost: 5e7,
      requirement: "1e90 total Relic Shards",
      formula: "`1 + (log10(log10(antimatter)) / 100)`"
    },
    "consequencesOfIllusions": {
      id: "consequencesOfIllusions",
      name: "Consequences of Illusions",
      effect: "Gain free Dimboosts based on Imaginary rebuyable count",
      initialCost: 5e7,
      requirement: "Make a level 9,000 Glyph with a single Glyph level factor weight at 100",
      formula: "`2e4 * rebuyable count`"
    },
    "transienceOfInformation": {
      id: "transienceOfInformation",
      name: "Transience of Information",
      effect: "Increase Imaginary Machine Cap based on Imaginary Upgrades purchased",
      initialCost: 5e7,
      requirement: "Reach 1.80e308 projected Reality Machines within The Nameless Ones' Reality",
      formula: "`1 + (rebuyables / 20) + (one time purchases / 2)`"
    },
    "recollectionOfIntrusion": {
      id: "recollectionOfIntrusion",
      name: "Recollection of Intrusion",
      effect: "Raise all Dimension per-purchase multipliers to ^1.5",
      initialCost: 3.5e8,
      requirement: "Reach a tickspeed of 1e7.500e10 / sec within Eternity Challenge 5"
    },
    "fabricationOfIdeals": {
      id: "fabricationOfIdeals",
      name: "Fabrication of Ideals",
      effect: "Convert Antimatter Dimensions to Continuum and unlock Lai'tela, Celestial of Dimensions",
      initialCost: 1e9,
      requirement: "Reach 1e1.500e12 antimatter without ever having any 1st Infinity Dimensions"
    },
    "masslessMomentum": {
      id: "masslessMomentum",
      name: "Massless Momentum",
      effect: "Unlock the 2nd Dark Matter Dimension",
      initialCost: 3.5e9,
      requirement: "Destabilize Lai'tela's Reality in under 30 seconds twice"
    },
    "chiralOscillation": {
      id: "chiralOscillation",
      name: "Chiral Oscillation",
      effect: "Unlock the 3rd Dark Matter Dimension",
      initialCost: 6e9,
      requirement: "Automatically condense at least 20 Singularities at once"
    },
    "dimensionalSymmetry": {
      id: "dimensionalSymmetry",
      name: "Dimensional Symmetry",
      effect: "Unlock the 4th Dark Matter Dimension",
      initialCost: 1.5e10,
      requirement: "Have 80,000 total Galaxies"
    },
    "deterministicRadiation": {
      id: "deterministicRadiation",
      name: "Deterministic Radiation",
      effect: "Unlock Dark Matter Annihilation",
      initialCost: 2.8e10,
      requirement: "Reach 3,850,000 Tickspeed Continuum without ever having more than 8 Time Studies in this Reality"
    },
    "vacuumAcceleration": {
      id: "vacuumAcceleration",
      name: "Vacuum Acceleration",
      effect: "Unlock Autobuyers for repeatable Imaginary Upgrades and generate Imaginary Machines 10 times faster",
      initialCost: 3e12,
      requirement: "Have a Continuum increase from Dark Matter of at least 100%"
    },
    "existentialElimination": {
      id: "existentialElimination",
      name: "Existential Elimination",
      effect: "Annihilation multiplier gain is improved based on Imaginary Machines",
      initialCost: 1e13,
      requirement: "Reach 1e7.400e12 antimatter with Continuum disabled",
      formula: "`max((log10(iM) - 10) ^ 3, 1)`"
    },
    "totalTermination": {
      id: "totalTermination",
      name: "Total Termination",
      effect: "Glyph Sacrifice totals for basic Glyphs are increased to 1e100",
      initialCost: 1.5e14,
      requirement: "Reach 1e1.500e11 antimatter in Effarig's Reality with at least 4 Cursed Glyphs equipped"
    },
    "planarPurification": {
      id: "planarPurification",
      name: "Planar Purification",
      effect: "Increase free Dimboost count based on Tesseract count",
      initialCost: 6e14,
      requirement: "Reach Glyph level 20,000 in Ra's Reality with at most 0 Glyphs equipped",
      formula: "`floor(0.25 * (tesseracts ^ 2))`"
    },
    "absoluteAnnulment": {
      id: "absoluteAnnulment",
      name: "Absolute Annulment",
      effect: "Increase free Dimboost strength based on Singularity count",
      initialCost: 6e14,
      requirement: "Have 13,000 Antimatter Galaxies in Ra's Reality with a fully inverted Black Hole",
      formula: "`singularities ^ 300`"
    },
    "omnipresentObliteration": {
      id: "omnipresentObliteration",
      name: "Omnipresent Obliteration",
      effect: "Unlock Pelle, Celestial of Antimatter",
      initialCost: 1.6e15,
      requirement: "Reach Reality in Lai'tela's Reality with all Dimensions disabled and at least 4 empty Glyph slots"
    }
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
  charged(upgradeInfo: UpgradeInfo): EmbedField[] {
    return [
      { name: "Effect", value: upgradeInfo.charged?.effect as string, inline: false },
      { name: "Formula", value: upgradeInfo.charged?.formula as string, inline: false }
    ];
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
      { name: "Cost", value: `${formattedCost} ${pluralise("Reality Machine", upgradeInfo.initialCost as number)}${upgradeInfo.rebuyable ? `, increasing by a factor of ${upgradeInfo.increment} each purchase` : ``}`, inline: false },
    ];
    if (upgradeInfo.requirement) fields.push({ name: "Requirement", value: upgradeInfo.requirement as string, inline: false });
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula, inline: false });
    return fields;
  },
  imaginary(upgradeInfo: UpgradeInfo): EmbedField[] {
    const formattedCost = formatNumber(upgradeInfo.initialCost as number);
    const fields = [
      { name: "Effect", value: upgradeInfo.effect, inline: false },
      { name: "Cost", value: `${formattedCost} ${pluralise("Imaginary Machine", upgradeInfo.initialCost as number)}${upgradeInfo.rebuyable ? `, increasing by a factor of ${upgradeInfo.increment} each purchase` : ``}`, inline: false },
    ];
    if (upgradeInfo.requirement) fields.push({ name: "Requirement", value: upgradeInfo.requirement as string, inline: false });
    if (upgradeInfo.formula) fields.push({ name: "Effect formula", value: upgradeInfo.formula, inline: false });
    return fields;
  },
};

const InfinityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor(Colour.infinity)
  .addFields(FieldGetter.infinity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const ChargedInfinityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor(Colour.celestial)
  .addFields(FieldGetter.charged(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const BreakInfinityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor(Colour.infinity)
  .addFields(FieldGetter.breakInfinity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const EternityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor(Colour.eternity)
  .addFields(FieldGetter.eternity(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const DilationUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor(Colour.dilation)
  .addFields(FieldGetter.dilation(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const RealityUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor(Colour.reality)
  .addFields(FieldGetter.reality(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

const ImaginaryUpgrade = (upgradeInfo: UpgradeInfo) => new EmbedBuilder()
  .setTitle(upgradeInfo.name)
  .setColor(Colour.imaginary)
  .addFields(FieldGetter.imaginary(upgradeInfo))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });
interface EmbedGetters {
  [key: string]: Function;
}

export const UpgradeEmbedGetters: EmbedGetters = {
  infinity: InfinityUpgrade,
  charged: ChargedInfinityUpgrade,
  break: BreakInfinityUpgrade,
  eternity: EternityUpgrade,
  dilation: DilationUpgrade,
  reality: RealityUpgrade,
  imaginary: ImaginaryUpgrade
};