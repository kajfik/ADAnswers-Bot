import { ApplicationCommandOptionType, ApplicationCommandType, AttachmentBuilder, CommandInteraction, EmbedBuilder, SlashCommandSubcommandBuilder, User } from "discord.js";
import { GlyphEmbedGetter, basicGlyphs } from "../../utils/databases/glyphs";
import { Command } from "../../command";
import { GlyphInfo } from "../../utils/types";
import config from "../../config.json";
import { isHelper } from "../../functions/Misc";

function getEffectChoices(): { name: string, value: string, type: any }[] {
  const choices = [];
  for (const glyph in basicGlyphs) {
    const glyphObject: GlyphInfo = basicGlyphs[glyph];
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
  equipping(isADServer: boolean): string {
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
  rarity(isADServer: boolean): string {
    return `Rarity is one of the two values determining the strength of a glyph's effects, the other being Level.
    
The rarity of a glyph is given as a percentage, ranging from 0% to 100%. At first, this value will be determined solely by RNGesus. Later on, there will be ways to improve your odds; the first improvement comes as a result of the achievement "Perks of Living", which increases the rarity of all future Glyphs by 1%. 

This rarity is wholly independent from level, and is determined from the moment that you create a new Reality, so you can't sacescum them. Your first ever glyph has a rarity of 20%. 

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
  level(isADServer: boolean): string {
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
  sacrifice(isADServer: boolean): string {
    return `Glyph Sacrifice is a mechanic that you unlock from the Reality Upgrade "Scour to Empower", once you have at least 30 glyphs in your inventory. **"Sacrificing" Glyphs will give you no benefit until you unlock it!**

Glyph Sacrifice allows you to get rid of glyphs that you no longer need, in exchange for a permanent boost based on the glyph's type. Each glyph has a "sacrifice score", based on its level and rarity; when you destroy a glyph, this sacrifice score is added to your total glyph sacrifice for that type.`;
  },
  companion(isADServer: boolean): string {
    return `Oh, I forgot to mention! After you complete your first Reality, you will receive a ${isADServer ? "<:glyph_companion:1053705550644391946>" : "❤️"} Companion Glyph. 
    
This is a unique, one-of-a-kind glyph that simply exists to bring you joy. 

It also records the amount of Eternity Points you gained on your first Reality. It allows some of the older AD players to flex a little.

Destroying it gives no benefits, so why would you want to?`;
  }
  /* eslint-enable max-len */
};

export const glyph: Command = {
  name: "glyph",
  description: "Explains Glyphs, their values, and their effects.",
  type: ApplicationCommandType.ChatInput,
  options: [
    new SlashCommandSubcommandBuilder()
      .setName("info")
      .setDescription("Explains basic information about glyphs")
      .addStringOption(option =>
        option.setName("info")
          .setRequired(true)
          .setDescription("The information you want to know about")
          .setChoices(
            { name: "intro", value: "intro" },
            { name: "equipping", value: "equipping" },
            { name: "types", value: "types" },
            { name: "rarity", value: "rarity" },
            { name: "level", value: "level" },
            { name: "sacrifice", value: "sacrifice" },
            { name: "companion", value: "companion" }
          )
      ).toJSON(),
    new SlashCommandSubcommandBuilder()
      .setName("effect")
      .setDescription("Explains the effects of a glyph")
      .addStringOption(option =>
        option.setName("glyph")
          .setRequired(true)
          .setDescription("The glyph you want to know about")
          .setChoices(...getEffectChoices())
      ).toJSON(),
  ],
  run: async(interaction: CommandInteraction) => {
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

    const type: string = interaction.options.getSubcommand();

    if (type === "info") {
      const info: string = interaction.options.getString("info") as string;

      const content: string = glyphInfoCommand[info](isADServer);

      await interaction.reply({ content, ephemeral: !isHelper(interaction) });

    } else {

      const glyphName: string = interaction.options.getString("glyph") as string;

      const picture = new AttachmentBuilder(`src/images/glyphs/${glyphName}.png`);

      const glyphRequested = basicGlyphs[glyphName];
      const embed: EmbedBuilder = GlyphEmbedGetter(glyphRequested, isADServer);
      embed.setAuthor({ name: `${user.username}#${user.discriminator}`, iconURL: user.displayAvatarURL() })
        .setThumbnail(`attachment://${glyphName}.png`);

      await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
    }
  }
};