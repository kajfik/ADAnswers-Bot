import { BaseCommandInteraction, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js";
import { isEligibleForHelper, isHelper } from "../../functions/Misc";
import { Command } from "../../command";
import { ids } from "../../config.json";

export const helperRequest: Command = {
  name: "helper",
  description: "sends a consent form to become a designated helper",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const isCurrentlyHelper: boolean = isHelper(interaction) as boolean;
    const isEligible: boolean = isEligibleForHelper(interaction);

    if (!isEligible) {
      await interaction.reply({ content: `Hey! I'm glad you want to get the Helper role, but in order to do so, you need to have the "Infinity Dimension" role or greater.` });
      return;
    }

    const field = isCurrentlyHelper
      ? { name: "Removing the helper role will...", value: `prevent you from using the bot in Progression Discussion visibly. You can add this role at any time by doing /helper again.` }
      // eslint-disable-next-line max-len
      : { name: "Adding the helper role will...", value: `allow you to use the bot in Progression Discussion. To become a Helper, understand that you agree to keep all *personal* use of the bot to <#351479640755404820> or the bot's DMs, and only use the bot outside of there to assist others on their journey through Antimatter Dimensions. **You are not free of consequences.** This is effectively a contract. Breaking it can result in some form of punishment. Moderators and admins are aware at all times of who is and who isn't a helper.\nYou can remove this role at any time by doing /helper again.` };

    const embed: MessageEmbed = new MessageEmbed()
      .setColor("DARK_AQUA")
      .setTitle("ADAnswersBot Helper")
      .setDescription(`Are you sure you want to ${isCurrentlyHelper ? "remove" : "add"} the helper role?`)
      .setThumbnail(interaction.user.displayAvatarURL())
      .addField(field.name, field.value)
      .setTimestamp();

    const buttons: MessageActionRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle(isCurrentlyHelper ? "DANGER" : "SUCCESS")
          .setLabel(isCurrentlyHelper ? "Remove" : "Add")
          .setCustomId(isCurrentlyHelper ? "button_remove" : "button_add")
      );

    const filter = (i: MessageComponentInteraction) => i.customId.startsWith("button");
    const collector = interaction.channel?.createMessageComponentCollector({ componentType: "ACTION_ROW", filter, time: 60000 });

    await interaction.reply({ embeds: [embed], components: [buttons] })
      .then(() => {
        collector?.on("collect", async i => {
          await interaction.guild?.members.fetch(interaction.user.id).then(async member => {
            if (isCurrentlyHelper) member.roles.remove(ids.helperRole);
            else member.roles.add(ids.helperRole);

            // eslint-disable-next-line max-len
            await i.update({ content: `You have successfully ${isCurrentlyHelper ? "removed" : "added"} the helper role. You can safely remove this image. Remember, you can always run /helper again to reverse your decision.` });
          });
        });
      }).catch(e => console.log(e));
  }
};