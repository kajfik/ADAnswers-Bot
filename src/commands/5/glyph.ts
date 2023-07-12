import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import { GlyphEmbedGetter, basicGlyphs, specialGlyphs } from "../../utils/databases/glyphs";
import { authorTitle, isHelper } from "../../functions/Misc";
import { Command } from "../../command";
import { GlyphInfo } from "../../utils/types";
import config from "../../config.json";
import { utilsGlyphSubcommand } from "./glyph/utils";

function getEffectChoices(): { name: string, value: string, type: any }[] {
  const choices = [];
  for (const glyph in { ...basicGlyphs, ...specialGlyphs }) {
    const glyphObject: GlyphInfo = basicGlyphs[glyph] ?? specialGlyphs[glyph];
    choices.push({
      name: glyphObject.name,
      value: glyphObject.name,
      type: ApplicationCommandOptionType.String,
    });
  }
  return choices;
}

interface serverSpecificOutput {
  [key: string]: Function;
}

const glyphInfoCommand: serverSpecificOutput = {
  /* eslint-disable max-len */
  intro(isADServer: boolean): string {
    return `Welcome to Reality!

Whenever you create a new Reality, you will choose (or be given) a new Glyph. These Glyphs provide powerful bonuses, but only while they are equipped.

These glyphs appear in the Glyph tab, in a massive grid called the Glyph Inventory. At the top of the Glyph tab is a series of 3-5 circles, which represent your equipped glyphs. 

On your first Reality, you are guaranteed to receive a ${isADServer ? "<:glyph_power:586607087744843776>" : "**Ω**"} Power Glyph that raises all Antimatter Dimensions to a small power. It is recommended that you equip it immediately.`;
  },
  // eslint-disable-next-line no-unused-vars
  equipping(_isADServer: boolean): string {
    return `To equip a Glyph, you must do one of two things:

    a) Double click the glyph in your inventory. Your glyph inventory is in the lower right corner of the Glyph tab. Go there, find a glyph (such as the power glyph you got from your first Reality), and double click it. 
    
    b) Click and drag the glyph to a slot. At the top of the screen will be 3-5 slots (depending on Reality Upgrades) that you can fill with glyphs. Click on a glyph, hold down the mouse button, and drag it up to one of the empty slots. Attempting to place a glyph in a filled slot will require you to reset the Reality. 
    
To unequip a glyph, you have to click on the "Unequip Glyphs on Reality" button below the equipped glyphs. Then, you have to either complete your reality, or reset it using the "Start this Reality over" button. 

Glyphs that are not equipped have no effect.`;
  },
  types(isADServer: boolean): string {
    return `Each Glyph's type is based on its name, and the symbol located within that glyph. Each Glyph type has its own unique effects, based on the area of the game it represents. 

Before you encounter any Celestials, you will have access to 5 effective glyph types:

    - ${isADServer ? "<:glyph_power:586607087744843776>" : "**Ω**"} Power
    - ${isADServer ? "<:glyph_infinity:586607119856304129>" : "**∞**"} Infinity
    - ${isADServer ? "<:glyph_replication:586607179432460298>" : "**Ξ**"} Replication
    - ${isADServer ? "<:glyph_time:586607148985876501>" : "**Δ**"} Time
    - ${isADServer ? "<:glyph_dilation:586607200626278421>" : "**Ψ**"} Dilation`;
  },
  // eslint-disable-next-line no-unused-vars
  rarity(_isADServer: boolean): string {
    return `Rarity is one of the two values determining the strength of a glyph's effects, the other being Level.
    
The rarity of a glyph is given as a percentage, ranging from 0% to 100%. At first, this value will be determined solely by RNGesus. Later on, there will be ways to improve your odds; the first improvement comes as a result of the achievement "Perks of Living", which increases the rarity of all future Glyphs by 1%. 

This rarity is wholly independent from level, and is determined from the moment that you create a new Reality, so you can't savescum them. Your first ever glyph has a rarity of 20%. 

At certain rarity thresholds, the color of your glyph will change. These colors are as follows:

    - Common: 0 - 20%, White
    - Uncommon: 20 - 40%, Green
    - Rare: 40 - 60%, Light Blue
    - Epic: 60 - 70%, Purple
    - Legendary, 70 - 80%, Orange
    - Mythical, 80 - 90%, Red
    - Transcendent, 90 - 99.9%, Cyan
    - Celestial, 100%, Celestial Blue`;
  },
  // eslint-disable-next-line no-unused-vars
  level(_isADServer: boolean): string {
    return `Level is one of the two values determining the strength of a glyph's effects, the other being Rarity.
    
The level of a glyph is calculuated based on 3 (or 4) resources you collect during a Reality. These resources are Eternity Points, Replicanti, and Dilated Time. When you purchase the Reality Upgrade "Measure of Forever", Eternities also become a part of the equation. Only the highest amount reached in a Reality is considered.

Initially, these factors are as follows: 
Eternity Points: \`0.016 * log(EP)^0.5\`
Replicanti: \`0.025 * log(Rep)^0.4\`
Dilated Time: \`0.025 * log(DT)^1.3\`
Eternities: \`0.450 * log(Eternities)^0.5\` (if unlocked)

All of the above factors are then multiplied together. Finally, other bonuses (Such as the number of Reality Upgrade rows you have completed, or achievements such as Royal Flush) are added, and that value, rounded down, is your final Glyph level. 

All this information can be found under "Glyph Level Factors" in the Glyph tab. `;
  },
  // eslint-disable-next-line no-unused-vars
  sacrifice(_isADServer: boolean): string {
    return `Glyph Sacrifice is a mechanic that you unlock from the Reality Upgrade "Scour to Empower", once you have at least 30 glyphs in your inventory. **"Sacrificing" Glyphs will give you no benefit until you unlock it!**

Glyph Sacrifice allows you to get rid of glyphs that you no longer need, in exchange for a permanent boost based on the glyph's type. Each glyph has a "sacrifice score", based on its level and rarity; when you destroy a glyph, this sacrifice score is added to your total glyph sacrifice for that type.`;
  },
  companion(isADServer: boolean): string {
    return `Oh, I forgot to mention! After you complete your first Reality, you will receive a ${isADServer ? "<:glyph_companion:1053705550644391946>" : "❤️"} Companion Glyph. 
    
This is a unique, one-of-a-kind glyph that simply exists to bring you joy. 

It also records the amount of Eternity Points you gained on your first Reality. It allows some of the older AD players to flex a little.

Destroying it gives no benefits, so why would you want to?`;
  },
  // eslint-disable-next-line no-unused-vars
  nextgl(_isADServer: boolean): string {
    return `
The X% to next shows how close you are to your Glyph level on reality increasing. You can see the exact breakdown of how this is calculated on the Glyphs screen under "Glyph Level Factors". Once it reaches 100% the Glyph level on Reality will increase by 1.

Basically what the % is showing really is the decimal in the Glyph level formula. Say your Glyph level factors are 1.3x from EP, 1.2x from Replicanti and 1.4x from DT, and +1 from a row of upgrades. Overall that's equal to (1.3 x 1.2 x 1.4) + 1 = 3.184. So you would have a Glyph level of 3, and are 18.4% to next Glyph level.`;
  }
  /* eslint-enable max-len */
};

export const glyph: Command = {
  name: "glyph",
  description: "Explains Glyphs, their values, and their effects.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "Explains basic information about glyphs",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "info",
          required: true,
          description: "The information you want to know about",
          type: ApplicationCommandOptionType.String,
          choices: [
            { name: "intro", value: "intro" },
            { name: "equipping", value: "equipping" },
            { name: "types", value: "types" },
            { name: "rarity", value: "rarity" },
            { name: "level", value: "level" },
            { name: "sacrifice", value: "sacrifice" },
            { name: "companion", value: "companion" },
            { name: "nextgl", value: "nextgl" }
          ]
        }
      ]
    },
    {
      name: "effect",
      description: "Explains the effects of a glyph.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "glyph",
          required: true,
          description: "The glyph you want to know about",
          type: ApplicationCommandOptionType.String,
          choices: getEffectChoices()
        },
        {
          name: "altered",
          required: false,
          description: "Show altered effects instead of normal effects?",
          type: ApplicationCommandOptionType.Boolean
        }
      ]
    },
    {
      name: "sacrifice",
      description: "Explains the effects from Glyph Sacrifice for each glyph type",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "glyph",
          required: true,
          description: "The glyph type you want to know about",
          type: ApplicationCommandOptionType.String,
          choices: getEffectChoices()
        },
      ]
    },
    {
      name: "utils",
      description: "access glyph utility functions to find probabilities or other information",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "threshold",
          description: "Returns the minimum level above which three or four effect glyphs start to appear",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "rarity",
              required: true,
              description: "The percentage rarity between 0 and 100",
              type: ApplicationCommandOptionType.Number
            }
          ]
        },
        {
          name: "rarityprobability",
          description: "Returns the probability of seeing a glyph with the specified rarity, or greater.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "bonus",
              description: "Refers to the total percentage rarity added bonus in game",
              required: true,
              type: ApplicationCommandOptionType.Number
            },
            {
              name: "ru16",
              description: "Has reality upgrade 16 (Disparity of Rarity) been bought?",
              required: true,
              type: ApplicationCommandOptionType.Boolean
            },
            {
              name: "rarity",
              description: "The target percentage rarity (must be between 0 and 100)",
              required: true,
              type: ApplicationCommandOptionType.Number
            }
          ]
        },
        {
          name: "effectprobability",
          description: "Returns the probability of seeing a glyph with the specified rarity, or greater.",
          type: ApplicationCommandOptionType.Subcommand,
          options: [
            {
              name: "ru17",
              description: "Has reality upgrade 17 (Duplicity of Potency) been bought?",
              required: true,
              type: ApplicationCommandOptionType.Boolean
            },
            {
              name: "rarity",
              description: "The target percentage rarity (must be between 0 and 100)",
              required: true,
              type: ApplicationCommandOptionType.Number
            },
            {
              name: "level",
              description: "The target level of the glyph",
              required: true,
              type: ApplicationCommandOptionType.Number
            },
            {
              name: "effects",
              description: "The target number of effects",
              required: true,
              type: ApplicationCommandOptionType.Number
            },
            {
              name: "effarig",
              description: "Is the target glyph type an Effarig glyph?",
              required: true,
              type: ApplicationCommandOptionType.Boolean
            }
          ],
        }
      ]
    },
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    if (interaction.options.data.length > 1) {
      await interaction.reply({ content: "You can only use one subcommand at a time." });
      return;
    }

    if (interaction.options.data.length === 0) {
      await interaction.reply({ content: "You must specify a subcommand." });
      return;
    }

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

    const isADServer: boolean = (interaction.guildId === config.ids.AD.serverID);

    if (interaction.options.getSubcommandGroup() !== null) {
      await utilsGlyphSubcommand(interaction);
      return;
    }

    const type: string = interaction.options.getSubcommand();

    if (type === "info") {
      const info: string = interaction.options.getString("info") as string;

      const content: string = glyphInfoCommand[info](isADServer);

      await interaction.reply({ content, ephemeral: !isHelper(interaction) });

    } else if (type === "effect") {

      const glyphName: string = interaction.options.getString("glyph") as string;
      const altered: boolean = interaction.options.getBoolean("altered") as boolean;
      const hasAlteredImage: boolean = ["dilation", "effarig", "infinity", "power", "replication", "time"].includes(glyphName);

      let picture = new AttachmentBuilder(`src/images/glyphs/${glyphName}.png`);
      if (altered && hasAlteredImage) picture = new AttachmentBuilder(`src/images/glyphs/altered/${glyphName}_altered.png`);
      else if (altered) picture = new AttachmentBuilder(`src/images/glyphs/altered/none_altered.png`);

      const glyphRequested = basicGlyphs[glyphName] ?? specialGlyphs[glyphName];

      let imageLink: string = `attachment://${glyphName}.png`;
      if (altered && hasAlteredImage) imageLink = `attachment://${glyphName}_altered.png`;
      else if (altered) imageLink = `attachment://none_altered.png`;

      const embed: EmbedBuilder = GlyphEmbedGetter(glyphRequested, isADServer, altered, false);
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
        .setThumbnail(imageLink);

      await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
    } else {
      const glyphName: string = interaction.options.getString("glyph") as string;
      const hasSacrificeImage: boolean = ["dilation", "effarig", "infinity", "power", "reality", "replication", "time"].includes(glyphName);

      let picture: AttachmentBuilder = new AttachmentBuilder(`src/images/glyphs/sacrificed/${glyphName}.png`);
      if (!hasSacrificeImage) picture = new AttachmentBuilder(`src/images/glyphs/${glyphName}.png`);
      const imageLink: string = `attachment://${glyphName}.png`;
      const glyphRequested = basicGlyphs[glyphName] ?? specialGlyphs[glyphName];

      const embed: EmbedBuilder = GlyphEmbedGetter(glyphRequested, isADServer, false, true);
      embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
        .setThumbnail(imageLink);

      await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
    }
  }
};