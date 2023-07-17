import { EmbedBuilder, EmbedField } from "discord.js";
import { Colour } from "../../colours";
import { RaCelestial } from "../../../utils/types";
import { footerText } from "../../../functions/Misc";

interface MemoryData {
  [key: string]: RaCelestial
}

export const raMemories: MemoryData = {
  "teresa": {
    name: "Teresa",
    chunkGain: {
      currency: "Eternity Points",
      formula: "`4 * (log10(ep) / 1e4)^3`"
    },
    unlocks: {
      "1": {
        level: 1,
        effect: {
          effect: "Tachyon Particles are given immediately when Time Dilation is active"
        }
      },
      "2": {
        level: 2,
        effect: {
          effect: "Unlock Charged Infinity Upgrades, You get one more maximum Charged Infinity Upgrade every 2 levels.",
          formula: "`min(12, floor(level / 2))"
        }
      },
      "5": {
        level: 5,
        effect: {
          effect: "All Memory Chunks produce more Memories based on Reality Machines",
          formula: "x`1 + sqrt(log10(RM) / 100)`"
        }
      },
      "8": {
        level: 8,
        effect: {
          effect: "Unlock Effarig's Memories"
        }
      },
      "10": {
        level: 10,
        effect: {
          effect: "Unlock Altered Glyphs, which grant new effects to Glyphs based on Glyph Sacrifice"
        }
      },
      "15": {
        level: 15,
        effect: {
          effect: "Purchase caps are raised in Teresa's Perk Point Shop"
        }
      },
      "25": {
        level: 25,
        effect: {
          effect: "In non-Celestial Realities, gain Tachyon Particles as if you reached the square root of your total antimatter in Dilation. Any multipliers to TP gain are applied retroactively, even outside Dilation"
        }
      }
    }
  },
  "effarig": {
    name: "Effarig",
    chunkGain: {
      currency: "Relic Shards",
      formula: "`4 * (shards)^0.1`"
    },
    unlocks: {
      "1": {
        level: 1,
        effect: {
          effect: "Get 2x Glyph choices and the bonus to Glyph rarity from Relic Shards is always its maximum value"
        }
      },
      "2": {
        level: 2,
        effect: {
          effect: "Unlock Glyph Alchemy, which adds alchemical resources you can increase by Refining Glyphs. You unlock more resources through Effarig levels. Access through a new Reality tab.",
        }
      },
      "5": {
        level: 5,
        effect: {
          effect: "All Memory Chunks produce more Memories based on highest Glyph level",
          formula: "x`1 + (best glyph level / 7000)`"
        }
      },
      "8": {
        level: 8,
        effect: {
          effect: "Unlock Nameless' Memories"
        }
      },
      "10": {
        level: 10,
        effect: {
          effect: `Glyphs always have 4 effects, and Effarig Glyphs can now have up to 7`
        }
      },
      "15": {
        level: 15,
        effect: {
          effect: "Glyph level is increased based on Relic Shards gained",
          formula: "`100 * log10(max(shards, 1))^2`"
        }
      },
      "25": {
        level: 25,
        effect: {
          effect: "Glyphs are always generated with 100% rarity and Glyph Sacrifice gain is raised to a power based on Relic Shards"
        }
      }
    }
  },
  "nameless": {
    name: "Nameless",
    chunkGain: {
      currency: "Time Shards",
      formula: "`4 * (log10(shards) / 3e5)^2`"
    },
    unlocks: {
      "1": {
        level: 1,
        effect: {
          effect: "Unlock Black Hole power upgrade autobuyers"
        }
      },
      "2": {
        level: 2,
        effect: {
          effect: "Stored game time is amplified and you can store more real time, increasing with Nameless levels",
          formula: "Game time amplification: `20 ^ level`\nReal time cap: `1000 * 3600 * level`"
        }
      },
      "5": {
        level: 5,
        effect: {
          effect: "All Memory Chunks produce more Memories based on total time played",
          formula: "x`1 + log10(time played) / 200`"
        }
      },
      "8": {
        level: 8,
        effect: {
          effect: "Unlock V's Memories"
        }
      },
      "10": {
        level: 10,
        effect: {
          effect: `Black Hole charging now only uses 99% of your game speed and you can automatically discharge 1% of your stored game time every 5 ticks.`
        }
      },
      "15": {
        level: 15,
        effect: {
          effect: "Gain more Dilated Time based on peak game speed in each Reality",
          formula: "`max((log10(peak speed) - 90)^3, 1)`"
        }
      },
      "25": {
        level: 25,
        effect: {
          effect: "All basic Glyphs gain the increased game speed effect from Time Glyphs, and Time Glyphs gain an additional effect"
        }
      }
    }
  },
  "v": {
    name: "V",
    chunkGain: {
      currency: "Infinity Power",
      formula: "`4 * (log10(infinity power) / 1e7)^1.5`"
    },
    unlocks: {
      "1": {
        level: 1,
        effect: {
          effect: "Rebuyable Reality upgrades are bought automatically and Auto-Eternity Challenges happen instantly"
        }
      },
      "2": {
        level: 2,
        effect: {
          effect: "In non-Celestial Realities, Time Dilation is unlocked automatically for free at 12900 Time Theorems",
        }
      },
      "5": {
        level: 5,
        effect: {
          effect: "All Memory Chunks produce more Memories based on total Celestial levels",
          formula: "x`1 + levels / 50`"
        }
      },
      "6": {
        level: 6,
        effect: {
          effect: "Unlock Hard V-Achievements and unlock a Triad Study every 6 levels. Triad Studies are located at the bottom of the Time Studies page"
        }
      },
      "10": {
        level: 10,
        effect: {
          effect: `Time Theorems boost all forms of continuous non-dimension production`,
          formula: `factor: \`min(10, max(0, log10(TT) - 350) / 50)\`
          TT generation: \`10 ^ (5 * factor)\`
          Eternities: \`10 ^ (2 * factor)\`
          Infinities: \`10 ^ (15 * factor)\`
          Replicanti: \`10 ^ (20 * factor)\`
          Memories: \`1 + factor / 50\`
          Memory chunks: \`1 + factor / 50\`
          IP/EP generation: \`1 + 2.4 * factor\``
        }
      },
      "15": {
        level: 15,
        effect: {
          effect: "Achievement multiplier applies to Time Theorem generation",
        }
      },
      "25": {
        level: 25,
        effect: {
          effect: "Achievement multiplier is raised ^1.5"
        }
      }
    }
  }
};

function FieldsGetter(celestial: RaCelestial): EmbedField[] {
  const fields: EmbedField[] = [
    { name: "Chunk gain",
      value: `Chunk gain is based on ${celestial.chunkGain.currency}\nFormula: ${celestial.chunkGain.formula}`,
      inline: false
    }
  ];

  for (const unlock in celestial.unlocks) {
    const u = celestial.unlocks[unlock];
    fields.push({
      name: `Level ${u.level} Unlock`,
      value: `${u.effect.effect}\n${u.effect.formula ? `Formula: ${u.effect.formula}` : ""}`,
      inline: false
    });
  }
  return fields;
}

export const RaCelestialEmbedGetter = (celestial: RaCelestial) => new EmbedBuilder()
  .setTitle(`${celestial.name}`)
  .setColor(Colour[celestial.name.toLowerCase()])
  .addFields(FieldsGetter(celestial))
  .setTimestamp()
  .setFooter({ text: footerText(), iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

export const Ra = {
  /* eslint-disable max-len */
  info: `Ra, the fifth Celestial, is unlocked by completing all of V's Achievements. Ra utilizes memories to bring back enhanced positive effects from previous Celestials. Within Ra, you gradually unlock the previous four Celestials, each offering additional upgrades tied to their original themes. To level up the previous Celestials within Ra, you need to use memories generated passively over time from Memory Chunks. These chunks can only be obtained within Ra's Reality, where they are produced based on specific resource totals. Storing real time does not generate Chunks inside Ra's Reality, but Memories are still generated normally. Reaching a total of 20 levels across all Celestials unlocks Remembrance, allowing you to choose a Celestial to gain more chunks while inside Ra's Reality. Memories can be spent on increasing Memory Chunk gain, Memory gain, and leveling up the Celestial. Teresa is initially unlocked, and subsequent Celestials are unlocked by reaching level 8 with the previous one. Levels are capped at 25. Teresa enhances Infinity Upgrades, increasing their strength, and improves Glyph effects at certain Glyph sacrifice thresholds. Effarig, at level 2, introduces Glyph Alchemy, strengthening Effarig Glyphs and reducing randomness in Glyph generation. Glyph Alchemy has its own How To Play entry. The Nameless Ones introduce mechanics related to charging Black Holes and significantly amplify their power. V unlocks Triad Studies, costing Space Theorems and requiring nearby studies for purchase. Triad Studies also unlock more challenging V-Achievements for additional Space Theorems. Ra does not directly unlock the next Celestial.`,
  reality: `You only have 4 Dimension Boosts and cannot gain any more. The Tickspeed purchase multiplier is fixed at x1.125. Within Ra's Reality, Memory Chunks for Celestial Memories will be generated based on certain resource amounts. There is no direct reward for completing Ra's Reality.`,
  memories: raMemories,
  embed: RaCelestialEmbedGetter
};