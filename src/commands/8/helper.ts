import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Colors, ChatInputCommandInteraction, ComponentType, EmbedBuilder, MessageComponentInteraction } from "discord.js";
import { isEligibleForHelper, isHelper } from "../../functions/Misc";
import { Command } from "../../command";
import { ids } from "../../config.json";

export const helperRequest: Command = {
  name: "helper",
  description: "sends a consent form to become a designated helper",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const isCurrentlyHelper: boolean = isHelper(interaction) as boolean;
    const isEligible: boolean = isEligibleForHelper(interaction);
    const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);

    if (!isEligible) {
      await interaction.reply({ content: `Hey! I'm glad you want to get the Helper role, but in order to do so, you need to have the "Infinity Dimension" role or greater.`, ephemeral: true });
      return;
    }

    const field = isCurrentlyHelper
      ? { name: "Removing the helper role will...", value: `prevent you from using the bot in Progression Discussion visibly. You can add this role at any time by doing /helper again.` }
      // eslint-disable-next-line max-len
      : { name: "Adding the helper role will...", value: `allow you to use the bot in Progression Discussion. To become a Helper, understand that you agree to keep all *personal* use of the bot to <#351479640755404820> or the bot's DMs, and only use the bot outside of there to assist others on their journey through Antimatter Dimensions. **You are not free of consequences.** This is effectively a contract. Breaking it can result in some form of punishment. Moderators and admins are aware at all times of who is and who isn't a helper.\nYou can remove this role at any time by doing /helper again.` };

    const embed = (disabled: boolean) => new EmbedBuilder()
      .setColor(Colors.DarkAqua)
      .setTitle("ADAnswersBot Helper")
      .setDescription(`Are you sure you want to ${isCurrentlyHelper ? "remove" : "add"} the helper role?\nExpire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`)
      .setThumbnail(interaction.user.displayAvatarURL())
      .addFields({ name: field.name, value: field.value })
      .setTimestamp();

    const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setDisabled(disabled)
          .setStyle(isCurrentlyHelper ? ButtonStyle.Danger : ButtonStyle.Success)
          .setLabel(isCurrentlyHelper ? "Remove" : "Add")
          .setCustomId(isCurrentlyHelper ? `helper_button_remove_${expirationTimestamp}` : `helper_button_add_${expirationTimestamp}`)
      );

    // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
    const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
    const collector = interaction.channel?.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 });

    await interaction.reply({ embeds: [embed(false)], components: [buttons(false)], ephemeral: true })
      .then(() => {
        collector?.on("collect", async i => {
          await interaction.guild?.members.fetch(interaction.user.id).then(async member => {
            if (isCurrentlyHelper) member.roles.remove(ids.AD.requestableRoles.helperRole);
            else member.roles.add(ids.AD.requestableRoles.helperRole);

            // eslint-disable-next-line max-len
            await i.update({ content: `You have successfully ${isCurrentlyHelper ? "removed" : "added"} the helper role. You can safely remove this image. Remember, you can always run /helper again to reverse your decision.` });
          });
        });
        collector?.on("end", async() => {
          await interaction.editReply({
            embeds: [embed(true)],
            components: [buttons(true)],
          });
        });
      }
      ).catch(e => console.log(e));
  }
};