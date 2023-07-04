import { AlchemyResource } from "../types";
import { EmbedField } from "discord.js";
import { Symbols } from "../symbols";
import { capitalize } from "../extensions";
import { makeEnumeration } from "../../functions/Misc";

interface AlchemyResourcesList {
  [key: string]: AlchemyResource
}

export const alchemyResources: AlchemyResourcesList = {
  // T1 resources (Non-Effarig "base" resources)
  // I'm personally not sure why this doesn't include Effarig; this is just how it's organised in the AD code
  "power": {
    name: "Power",
    unlocksAt: 2,
    symbol: Symbols.power,
    effect: "Provide a power to Antimatter Dimensions",
    effectFormula: "^`1 + amount / 200000`",
    tier: 1,
  },
  "infinity": {
    name: "infinity",
    unlocksAt: 3,
    symbol: Symbols.infinity,
    effect: "Provide a power to Infinity Dimensions",
    effectFormula: "^`1 + amount / 200000`",
    tier: 1,
  },
  "time": {
    name: "Time",
    unlocksAt: 4,
    symbol: Symbols.time,
    effect: "Provide a power to Time Dimensions",
    effectFormula: "^`1 + amount / 200000`",
    tier: 1,
  },
  "replication": {
    name: "Replication",
    unlocksAt: 5,
    symbol: Symbols.replication,
    effect: "Increases Replication speed",
    effectFormula: "x`10 ^ (amount / 1000)`",
    tier: 1,
  },
  "dilation": {
    name: "Dilation",
    unlocksAt: 6,
    symbol: Symbols.dilation,
    effect: "Increases Dilated Time production",
    effectFormula: "x`10 ^ (amount / 2000)`",
    tier: 1,
  },
  // T2 resources (combinations of pairs of T1 resources)
  "cardinality": {
    name: "Cardinality",
    unlocksAt: 8,
    symbol: Symbols.cardinality,
    effect: "Replicanti interval increases slower (down from x1.2) per 1.8e308 Replicanti",
    effectFormula: "x`1 + 0.2 / (1 + amount / 20000)`",
    tier: 2,
    reagents: [
      {
        resource: "Time",
        amount: 8
      },
      {
        resource: "Replication",
        amount: 7
      }
    ]
  },
  "eternity": {
    name: "Eternity",
    unlocksAt: 9,
    symbol: Symbols.eternity,
    effect: "Provide a power to Eternity generation",
    effectFormula: "^`1 + amount / 15000`",
    tier: 2,
    reagents: [
      {
        resource: "Time",
        amount: 11
      },
      {
        resource: "Infinity",
        amount: 4
      }
    ]
  },
  "dimensionality": {
    name: "Dimensionality",
    unlocksAt: 9,
    symbol: Symbols.dimensionality,
    effect: "Provide a large multiplier to all Dimensions",
    effectFormula: "x`10 ^ (5 * amount)`",
    tier: 2,
    reagents: [
      {
        resource: "Power",
        amount: 10
      },
      {
        resource: "Infinity",
        amount: 5
      }
    ]
  },
  "inflation": {
    name: "Inflation",
    unlocksAt: 9,
    symbol: Symbols.inflation,
    effect: "All Antimatter Dimension multipliers are raised to the 1.05 power if they are above a certain value",
    effectFormula: "`10 ^ (6e9 - 3e5 * amount)`",
    tier: 2,
    reagents: [
      {
        resource: "Power",
        amount: 9
      },
      {
        resource: "Dilation",
        amount: 6
      }
    ]
  },
  "alternation": {
    name: "Alternation",
    unlocksAt: 12,
    symbol: Symbols.alternation,
    effect: "Tachyon Galaxies are stronger per 1e1e6 Replicanti",
    effectFormula: "`amount / 200000`%",
    tier: 2,
    reagents: [
      {
        resource: "Replication",
        amount: 5
      },
      {
        resource: "Dilation",
        amount: 10
      }
    ]
  },
  // T3 resources (Effarig and combinations of T1/T2 with Effarig)
  "effarig": {
    name: "Effarig",
    unlocksAt: 7,
    symbol: Symbols.effarig,
    effect: "Increase Relic Shard gain",
    effectFormula: "x`10 ^ (amount / 2500)`",
    // It's organised with T3 resources while still being a T1 resource in the AD code
    tier: 1
  },
  "synergism": {
    name: "Synergism",
    unlocksAt: 13,
    symbol: Symbols.synergism,
    effect: "Increase the yield of Alchemy Reactions from 30%",
    effectFormula: "`0.3 + 1.3 * sqrt(amount / 25000)`%, capped at 100% (if Achievement 175 is unlocked, then uncapped)",
    tier: 3,
    reagents: [
      {
        resource: "Effarig",
        amount: 3
      },
      {
        resource: "Replication",
        amount: 16
      },
      {
        resource: "Infinity",
        amount: 14
      }
    ]
  },
  "momentum": {
    name: "Momentum",
    unlocksAt: 15,
    symbol: Symbols.momentum,
    effect: "Provides a power to all Dimensions that grows over time since resource unlock",
    effectFormula: "^`1 + 0.005 * hours since Momentum unlock` to a maximum of ^`1 + amount / 125000`",
    tier: 3,
    reagents: [
      {
        resource: "Effarig",
        amount: 11
      },
      {
        resource: "Power",
        amount: 4
      },
      {
        resource: "Time",
        amount: 20
      }
    ]
  },
  "decoherence": {
    name: "Decoherence",
    unlocksAt: 14,
    symbol: Symbols.decoherence,
    effect: "Gives a percentage of a refined Glyph's value to all other basic Alchemy Resources",
    effectFormula: "`0.15 * sqrt(amount / 25000)`%",
    tier: 3,
    reagents: [
      {
        resource: "Effarig",
        amount: 13
      },
      {
        resource: "Alternation",
        amount: 8
      }
    ]
  },
  // T4 resources (resources that feed into the final resource, Reality)
  "exponential": {
    name: "Exponential",
    unlocksAt: 18,
    symbol: Symbols.exponential,
    effect: "Multiply Infinity Point gain based on Replicanti",
    effectFormula: "Replicanti^`10 * ((amount / 10000) ^ 2)`",
    tier: 4,
    reagents: [
      {
        resource: "Inflation",
        amount: 18
      },
      {
        resource: "Synergism",
        amount: 3
      }
    ],
  },
  "force": {
    name: "Force",
    unlocksAt: 17,
    symbol: Symbols.force,
    effect: "Mutliply Antimatter Dimensions based on Reality Machines",
    effectFormula: "Reality Machines^`5 * amount`",
    tier: 4,
    reagents: [
      {
        resource: "Dimensionality",
        amount: 7
      },
      {
        resource: "Momentum",
        amount: 8
      }
    ]
  },
  "uncountability": {
    name: "Uncountability",
    unlocksAt: 19,
    symbol: Symbols.uncountability,
    effect: "Passively generate Realities and Perk Points",
    effectFormula: "`160 * sqrt(amount / 25000)`",
    tier: 4,
    reagents: [
      {
        resource: "Infinity",
        amount: 20
      },
      {
        resource: "Effarig",
        amount: 6
      },
      {
        resource: "Cardinality",
        amount: 16
      }
    ]
  },
  "boundless": {
    name: "Boundless",
    unlocksAt: 20,
    symbol: Symbols.boundless,
    effect: "Improve Tesseracts",
    effectFormula: "`amount / 80000`%",
    tier: 4,
    reagents: [
      {
        resource: "Eternity",
        amount: 13
      },
      {
        resource: "Inflation",
        amount: 18
      }
    ]
  },
  "multiversal": {
    name: "Multiversal",
    unlocksAt: 16,
    symbol: Symbols.multiversal,
    effect: "Make each Reality simulate more Realities, giving the same rewards as if it were amplified",
    effectFormula: "`32 * ((amount / 25000) ^ 2)`",
    tier: 4,
    reagents: [
      {
        resource: "Alternation",
        amount: 16
      },
      {
        resource: "Decoherence",
        amount: 3
      }
    ]
  },
  "unpredictability": {
    name: "Unpredictability",
    unlocksAt: 20,
    symbol: Symbols.unpredictability,
    effect: "Give each Alchemy Reaction a chance to happen twice",
    effectFormula: "`amount / (10714.28 + amount)`%",
    tier: 4,
    reagents: [
      {
        resource: "Effarig",
        amount: 15
      },
      {
        resource: "Decoherence",
        amount: 3
      },
      {
        resource: "Synergism",
        amount: 10
      }
    ]
  },
  // T5 resources (reality)
  "reality": {
    name: "Reality",
    unlocksAt: 25,
    symbol: Symbols.reality,
    effect: "Create a Reality Glyph",
    effectFormula: "Reality Glyph of level `Math.floor(amount)`",
    tier: 5,
    reagents: [
      {
        resource: "Exponential",
        amount: 1
      },
      {
        resource: "Force",
        amount: 1
      },
      {
        resource: "Uncountability",
        amount: 1
      },
      {
        resource: "Boundless",
        amount: 1
      },
      {
        resource: "Multiversal",
        amount: 1
      },
      {
        resource: "Unpredictability",
        amount: 1
      }
    ]
  }
};

export function getAlchemyCommandFields(resource: AlchemyResource): EmbedField[] {
  const fields: EmbedField[] = [
    { name: "Unlocks at...", value: `Effarig Level **${resource.unlocksAt}**\nTier ${resource.tier} resource`, inline: false },
    { name: "Effect", value: `${resource.effect}`, inline: false },
    { name: "Effect formula", value: `${resource.effectFormula}`, inline: false },
    { name: "Used for...", value: formatListOfResources(findResourcesWhereResourceIsReagent(resource.name), resource.name), inline: false }
  ];

  if (resource.reagents) {
    fields.push(
      { name: "Reaction for creation", value: formatAlchemicReaction(resource), inline: false },
      { name: "Reagent information", value: "You can use the below buttons to go to the respective reagent information.", inline: false }
    );
  }
  return fields;
}

export function findResourcesWhereResourceIsReagent(targetResource: string): AlchemyResource[] {
  const resources: AlchemyResource[] = [];
  for (const i in alchemyResources) {
    const resource = alchemyResources[i];
    if (resource.reagents === undefined) continue;
    const filteredReagents = resource.reagents.filter(r => r.resource.toLowerCase() === targetResource.toLowerCase());
    if (filteredReagents.length === 1) resources.push(resource);
  }
  return resources;
}

function formatListOfResources(resources: AlchemyResource[], targetResource: string): string {
  if (resources.length === 0) return `${capitalize(targetResource)} is not used in any reactions as a reagent.`;
  const namedResources = resources.map(resource => `**${resource.symbol} ${resource.name}**`);
  const usedIn = makeEnumeration<string>(namedResources, ", ", "", "and");
  return `${capitalize(targetResource)} is used in ${resources.length} reactions as a reagent.\nUsed in ${usedIn}.`;
}

export function formatAlchemicReaction(resource: AlchemyResource): string {
  if (resource.reagents) {
    const reagents = resource.reagents.map(reagent => `${reagent.amount} ${reagent.resource}`);
    const reactionString = makeEnumeration<string>(reagents, " + ", "", " + ").replace(",", "");
    return `${reactionString} ➜ 1 ${resource.name}`;
  }
  // This should never be returned, but it covers a possible case
  return "No reaction to create this resource";
}