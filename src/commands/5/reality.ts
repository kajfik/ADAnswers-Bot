import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";
import { StringIndexedStringObjectType } from "../../utils/types";
import { isHelper } from "../../functions/Misc";

/* eslint-disable max-len */
const realityMessageObject: StringIndexedStringObjectType = {
  "link": `
Web: https://ivark.github.io/AntimatterDimensions
Android version: <https://play.google.com/store/apps/details?id=kajfosz.antimatterdimensions>
Steam: <https://store.steampowered.com/app/1399720/Antimatter_Dimensions/>`,
  "automator": `The Automator is a key to further progress in AD post-Reality. Using a custom scripting language, you can automate nearly the entire game. It is unlocked upon reaching a total of 100 Automator Points, which are given when unlocking various Perks or Reality Upgrades, or just completing more Realities; you can see your current Automator Points and what gives AP in the "Automator" tab post-Reality. The Automator also boasts a block mode, which allows you to build scripts using a block-based structure which is helpful if you're unfamiliar with programming. Automator scripts can also be exported and shared to be imported; these will always begin with \`AntimatterDimensionsAutomatorScriptFormat\` and end with \`EndOfAutomatorScript\`.`,
  "perks": `Perks are an upgrade type unlocked upon Reality. These give various effects, but most are general quality of life improvements. You are able to carve your own path through the tree. You gain one Perk Point per Reality, and all Perks cost the same. Perks have two shapes - a diamond shaped Perk grants Automator Points in addition to its main effect, while a circular Perk just gives the effect. Different Perks have different colours, roughly indicating which part of the game they affect the most.`,
  "celestials": `After obtaining all Reality Upgrades, you unlock the first Celestial, revealing a new "Celestials" tab next to Reality. Within this tab, a map called "Celestial Navigation" updates as you progress. Defeating all seven Celestials is necessary to beat the game, each with unique mechanics and conditions. Celestials have their own Reality, which varies in relevance for progress through each Celestial. They are timeless and introduce mechanics unaffected by game speed.`,
  "blackhole": `The Black Hole feature periodically accelerates the game's speed. It runs at a normal pace for a while, then has a burst of extremely fast speed before returning to normal and repeating the cycle. The increased speed from Black Holes affects everything equally, unlike tickspeed. It boosts various aspects, including those partially affected by tickspeed, normally unaffected elements, and time-based effects. Only specific cases are mentioned as real time, while all other references assume game time. Reality Machines allow you to purchase three Black Hole upgrades: Interval, Power, and Duration, which respectively decrease the inactive time between bursts, increase the speed during bursts, and extend the duration of each burst. After 100 days of game time, unlocking the ability to buy a Reality Upgrade grants a second Black Hole. The second Black Hole's timer progresses only when the first Black Hole is active. When a Black Hole is active nearly 100% of the time, it becomes permanently active, tracked separately for each Black Hole. During offline play, Black Hole cycles advance normally, and their active speed boosts apply as if the game were open. Pausing the Black Holes halts their interval/duration cycle, but unpausing has a 5-second acceleration time. Pausing and unpausing affect both Black Holes simultaneously and can be automatically triggered before activation by adjusting the relevant setting.`,
  "reset": `Upon reaching 1e4000 EP and completing the first 13 rows of Achievements, you can purchase a Time Study that unlocks Reality. This grants access to a new tab where you can initiate a new Reality. Starting a new Reality resets most of the game progress but rewards you with Reality Machines, a Glyph, and a Perk Point. Unlike previous resets, you lose the first 13 rows of Achievements and their associated rewards. However, you retain values under the General header in the Statistics tab and your best Challenge times. After completing your first Reality, the Glyphs tab allows you to restart your current Reality without altering your upcoming Glyph choices. Note that this restart does not provide any rewards, even if you would normally obtain them. To regain Achievement rewards, you must fulfill their requirements again. Every 30 minutes, an incomplete Achievement is automatically completed without effort, unless you disable this feature. The timer continues while offline. Reality Machines become your main currency and can be spent on various upgrades in the Reality tab. Glyphs, equippable objects, grant boosts and their level depends on Eternity Points, Replicanti, and Dilated Time. Perk Points, another currency, are acquired once per Reality and can be spent on different Perks in the subtab. The amount of EP needed to obtain the next Reality Machine is displayed on the Reality button. The first 10 RM scale linearly between 1e4000 EP and 2e5333 EP, and beyond that, RM = \`1,000log10(EP)/4,000-1\`, providing higher RM gains than linear scaling above 2e5333 EP. Glyph level is determined by a combination of Eternity Points, Replicanti, and Dilated Time, with a minimum level of 1. The type, effects, and rarity of Glyphs are randomized. Each Reality grants exactly 1 Perk Point.`,
  "glyphs": `(For more specific Glyph information, use \`/glyph\`!)\nGlyphs are equippable objects with Type, Level, Rarity, and Effects. Type determines potential effects, Level scales based on acquired resources, Rarity affects strength and quality, and Effects provide boosts. To equip a Glyph, double-click or drag it to an active circle. Combining Glyphs with the same effect adds or multiplies their values. Empty slots can be filled during a Reality, applying immediate effects. Switching Glyphs restarts the Reality. "Protected" inventory slots exclude new Glyphs and are unaffected by sorting. Full inventory discards new Glyphs unless unlocked. Shift-clicking deletes Glyphs but provides no benefit without the relevant Reality Upgrade that unlocks Glyph Sacrifice. Unlocking Glyph Sacrifice disables the Glyph Selection modal, which can be overridden by shift-clicking the Reality button. Clicking a group of Glyphs opens a summary with shortened descriptions for sharing. This applies to Glyph records, equipped Glyphs, and Upcoming Glyph Selection.`
};
/* eslint-enable max-len */

export const reality: Command = {
  name: "reality",
  description: "Information surrounding the reality update.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "Shows selected information about the reality update.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: Object.keys(realityMessageObject).map(key => ({ name: key, value: key }))
    }
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const informationRequested: string = interaction.options.getString("info") as string;
    const content: string = realityMessageObject[informationRequested];

    await interaction.reply({ content, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};