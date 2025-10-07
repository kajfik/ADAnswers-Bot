import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, EmbedBuilder, InteractionReplyOptions, MessageComponentInteraction, User, MessageFlags } from "discord.js";
import { AlchemyEmbeds, AlchemyImages, alchemyResources } from "../../../utils/databases/alchemy";
import { AlchemyResource, Reagent } from "../../../utils/types";
import { authorTitle, isHelper } from "../../../functions/Misc";
import { Symbols } from "../../../utils/symbols";

export async function resourceAlchemySubcommand(interaction: ChatInputCommandInteraction, user: User): Promise<void> {
  if (!interaction || !interaction.isChatInputCommand()) return;
  let resource: string = interaction.options.getString("resource") as string;
  let resourceInfo: AlchemyResource = alchemyResources[resource];
  let disabled: boolean = false;
  const expirationTimestamp: number = Math.floor((Date.now() + 60000) / 1000);

  let image: AttachmentBuilder = AlchemyImages[resourceInfo.unlocksAt];

  let embed: EmbedBuilder = AlchemyEmbeds[resourceInfo.unlocksAt]
    .setTimestamp()
    .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
    .setDescription(`Expire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`);

  const createReagentButtons = (reagents?: Reagent[]) => {
    if (reagents === undefined) {
      return [];
    }
    // Discord only lets you have 5 buttons max in an action row
    // This is only relevant for the Reality resource, as all 6 T4 resources feed into it
    if (reagents.length > 5) {
      const half = Math.ceil(reagents.length / 2);
      const firstRow = reagents.slice(0, half);
      const secondRow = reagents.slice(half);
      const firstRowButtons = new ActionRowBuilder<ButtonBuilder>();
      const secondRowButtons = new ActionRowBuilder<ButtonBuilder>();

      for (const reagent of firstRow) {
        firstRowButtons.addComponents(
          new ButtonBuilder()
            .setLabel(`${Symbols[reagent.resource.toLowerCase()]} ${reagent.resource}`)
            .setCustomId(`alchemy_button_${reagent.resource}_${expirationTimestamp}`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(disabled)
        );
      }

      for (const reagent of secondRow) {
        secondRowButtons.addComponents(
          new ButtonBuilder()
            .setLabel(`${Symbols[reagent.resource.toLowerCase()]} ${reagent.resource}`)
            .setCustomId(`alchemy_button_${reagent.resource}_${expirationTimestamp}`)
            .setStyle(ButtonStyle.Primary)
            .setDisabled(disabled)
        );
      }

      return [firstRowButtons, secondRowButtons];
    }
    const buttons = new ActionRowBuilder<ButtonBuilder>();
    for (const reagent of reagents) {
      buttons.addComponents(
        new ButtonBuilder()
          .setLabel(`${Symbols[reagent.resource.toLowerCase()]} ${reagent.resource}`)
          .setCustomId(`alchemy_button_${reagent.resource}_${expirationTimestamp}`)
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled)
      );
    }
    return [buttons];
  };

  const content: InteractionReplyOptions = {
    embeds: [embed],
    files: [image],
    ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }),
    components: createReagentButtons(resourceInfo.reagents)
  };

  // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
  const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
  const collector = interaction.channel?.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 });

  await interaction.reply(content).then(() => {
    collector?.on("collect", async i => {
      if (i.isButton()) {
        if (i.member?.user.id !== user.id) return;

        // The resource is always going to be after the second underscore in the custom ID as defined in createReagentButtons
        resource = i.customId.split("_")[2].toLowerCase();
        resourceInfo = alchemyResources[resource];
        image = AlchemyImages[resourceInfo.unlocksAt];
        embed = AlchemyEmbeds[resourceInfo.unlocksAt]
          .setTimestamp()
          .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
          .setDescription(`Expire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`);

        await i.update({
          embeds: [embed],
          files: [image],
          components: createReagentButtons(resourceInfo.reagents)
        });
      }
    });
    collector?.on("end", async() => {
      disabled = true;
      await interaction.editReply({
        embeds: [embed],
        files: [image],
        components: createReagentButtons(resourceInfo.reagents)
      });
    });
  });
}