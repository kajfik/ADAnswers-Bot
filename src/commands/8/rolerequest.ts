import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Client, Colors, ComponentType, EmbedBuilder, MessageComponentInteraction, Role } from "discord.js";
import { Command } from "../../command";
import { helperRequest } from "./helper";
import { ids } from "../../config.json";

export const rolerequest: Command = {
  name: "rolerequest",
  description: "request various roles such as helper or adab notis",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "role",
      description: "what role would you like?",
      type: ApplicationCommandOptionType.Role,
      required: true
    }
  ],
  run: async(interaction: ChatInputCommandInteraction, client: Client) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const roleRequested: Role = interaction.options.getRole("role") as Role;

    if (!Object.values(ids.AD.requestableRoles).includes(roleRequested.id)) {
      await interaction.reply({ content: `You can't request the \`${roleRequested.name}\` role, dummy!`, ephemeral: true });
      return;
    }

    if (roleRequested.id === ids.AD.requestableRoles.helperRole) {
      await helperRequest.run(interaction, client);
    }

    if (roleRequested.id === ids.AD.requestableRoles.notificationsRole) {
      const hasRole: boolean = interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(ids.AD.requestableRoles.notificationsRole) as boolean;
      const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);

      if (!interaction.inGuild() || interaction.guildId !== ids.AD.serverID) {
        await interaction.reply({ content: `To request this role, you must be using the command in the AD server.`, ephemeral: true });
        return;
      }

      const fieldContent = hasRole
        ? { name: "Removing the ADAB Notifications role will...",
          value: `mean that you are no longer mentioned when the bot either receives an update or is experiencing an outage. You can add this role at any time by doing /rolerequest again.` }
        : { name: "Adding the ADAB Notifications role will...",
          value: "mean that you will begin to be mentioned when the bot either receives an update or is experiencing an outage. You can remove this role at any time by doing /rolerequest again." };

      const embed = (disabled: boolean) => new EmbedBuilder()
        .setColor(Colors.DarkAqua)
        .setTitle("ADAnswersBot Notifications Role Request")
        .setDescription(`Are you sure you want to ${hasRole ? "remove" : "add"} the notifications role?\nExpire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`)
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields(fieldContent)
        .setTimestamp();

      const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setDisabled(disabled)
            .setStyle(hasRole ? ButtonStyle.Danger : ButtonStyle.Success)
            .setLabel(hasRole ? "Remove" : "Add")
            .setCustomId(hasRole ? `notifications_button_remove_${expirationTimestamp}` : `notifications_button_add_${expirationTimestamp}`)
        );

      const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
      const collector = interaction.channel?.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 });

      await interaction.reply({ embeds: [embed(false)], components: [buttons(false)], ephemeral: true })
        .then(() => {
          collector?.once("collect", async i => {
            await interaction.guild?.members.fetch(interaction.user.id).then(async member => {
              if (hasRole) member.roles.remove(ids.AD.requestableRoles.notificationsRole);
              else member.roles.add(ids.AD.requestableRoles.notificationsRole);

              // eslint-disable-next-line max-len
              await i.update({ content: `You have successfully ${hasRole ? "removed" : "added"} the ADAB Notifications role. You can safely remove this embed. Remember, you can always run /rolerequest again to reverse your decision.` });
            });
          });
          collector?.on("end", async() => {
            await interaction.editReply({
              embeds: [embed(true)],
              components: [buttons(true)],
            });
          });
        }).catch(e => console.log(e));
    }

    // TODO: If mods approve the ADAB notifications role, utilise it here. Also, probably end up copying
    // the code for helper request here? Needs some more thought
  }
};