
import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { StringIndexedStringObjectType } from "../../utils/types";
import { isHelper } from "../../functions/Misc";

const autoAchievementCommand: StringIndexedStringObjectType = {
  /* eslint-disable max-len */
  "intro": `When you make a new Reality, you will lose all of the achievements you earned up to this point, from the first 13 rows. 
  Once you have purchased the \`START\` perk in the perk tree (See \`/perks\` for more information), you will begin to regain all the achievements you have unlocked before Reality. This means that certain achievements that are time-consuming (eg: "Don't you dare sleep") or potentially impossible (eg: "We COULD afford 9") can be completed automatically by just waiting.`,

  "speed": `You will initially autocomplete 1 achievement every 30 minutes. This interval can be decreased by purchasing the yellow \`ACH\` perks in the perk tab. Once you purchase the \`ACHNR\` perk, achievements will never reset, and your achievement autocompleter becomes redundant.`,

  "order": `When the timer in the achievements tab reaches 0, it will immediately complete the next achievement going in order from left to right, top to bottom. 
  The first achievement that will be autocompleted is "You have to start somewhere", and the last one will be "This is what I have to do to get rid of you". Achievements that will be automatically completed appear yellow. 
  Achievements that have already been completed are skipped. This means that if you can complete various trivial achievements early on (eg: every achievement involving completing challenges quickly), then you can reduce the amount of time required to autocomplete late achievements. The amount of time remaining until all achievements are automatically completed is shown below the achievement timer.`,

  "disable": `It is occasionally useful to temporarily disable the Achievement autocompleter. The most important use of this is to meet the unlock requirement of "Paradoxically Attain", although it can also be used in some niche cases to manually complete an achievement faster than the Autocompleter. 
  To disable Auto Achievements, navigate to the Achievements tab, and click the "Auto Achievements: ON" button to set it to "OFF". The timer will continue ticking down, but it will stop itself at 0. Then, you can complete an Eternity or whatever achievement you were going for. To re-enable Auto Achievements, click again on the "Auto Achievements" button to turn it back to "ON". If the timer had hit 0, you will immediately autocomplete another achievement.`
  /* eslint-enable max-len */
};

export const autoachievement: Command = {
  name: "autoachievement",
  description: "Args: `intro`, `speed`, `order`, `disable`. Explains the Auto Achievement timer.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "intro, speed, order, or disable",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "intro", value: "intro" },
        { name: "speed", value: "speed" },
        { name: "order", value: "order" },
        { name: "disable", value: "disable" },
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const info: string = interaction.options.getString("info") as string;

    const content: string = autoAchievementCommand[info];

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};