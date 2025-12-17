import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, Colors, ComponentType, EmbedBuilder, MessageComponentInteraction, Role, MessageFlags, GuildMember } from "discord.js";
import { isEligibleForHelper, isHelper } from "../../functions/Misc";
import { Command } from "../../command";
import { ids } from "../../config.json";

// eslint-disable-next-line max-params
const runRoleRequest = async(roleName: string, hasRole: boolean, fieldContent: string[], roleID: string, interaction: ChatInputCommandInteraction, eligibilityCondition?: boolean) => {
  if (eligibilityCondition !== undefined && !eligibilityCondition) {
    await interaction.reply({ content: `You are not currently eligible for the ${roleName} role.`, flags: MessageFlags.Ephemeral });
    return;
  }

  const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);

  const field = hasRole
    ? { name: `Removing the "${roleName}" role will...`, value: fieldContent[0] }
    : { name: `Adding the "${roleName}" role will...`, value: fieldContent[1] };

  const embed = (disabled: boolean) => new EmbedBuilder()
    .setColor(Colors.DarkAqua)
    .setTitle(`${roleName} Role Request`)
    .setDescription(`Are you sure you want to ${hasRole ? "remove" : "add"} the "${roleName}" role?\nExpire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`)
    .setThumbnail(interaction.user.displayAvatarURL())
    .addFields(field)
    .setTimestamp();

  const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setDisabled(disabled)
        .setStyle(hasRole ? ButtonStyle.Danger : ButtonStyle.Success)
        .setLabel(hasRole ? "Remove" : "Add")
        .setCustomId(hasRole ? `role_request_button_remove_${expirationTimestamp}` : `role_request_button_add_${expirationTimestamp}`)
    );

  // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
  const filter = (i: MessageComponentInteraction) =>
  i.user.id === interaction.user.id && i.customId.endsWith(String(expirationTimestamp));
  const collector = interaction.channel?.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000, max: 1 });

  await interaction.reply({ embeds: [embed(false)], components: [buttons(false)], flags: MessageFlags.Ephemeral })
    .then(() => {
      collector?.once("collect", async (i) => {
        try {
          if (!i.inGuild()) {
            await i.update({ content: "This can only be used in a server.", components: [], embeds: [] });
            return;
          }

          const guild = i.guild;
          if (!guild) {
            await i.update({ content: "Couldn't access the server context.", components: [], embeds: [] });
            return;
          }

          const member: GuildMember =
            i.member instanceof GuildMember
              ? i.member
              : await guild.members.fetch(i.user.id);

          if (hasRole) await member.roles.remove(roleID);
          else await member.roles.add(roleID);

          await i.update({
            content: `You have successfully ${hasRole ? "removed" : "added"} the "${roleName}" role. You can safely remove this embed. Remember, you can always run /rolerequest again to reverse your decision.`,
            components: [],
            embeds: [],
          });
        } catch (err) {
          console.error("Failed to update role:", err);
          await i.update({
            content: "I couldn't update your role (timeout/permissions). Please try again in a moment.",
            components: [],
            embeds: [],
          });
        }
      });
      collector?.on("end", async() => {
        await interaction.editReply({
          embeds: [embed(true)],
          components: [buttons(true)],
        });
      });
    }).catch(e => console.log(e));
};

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
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const roleRequested: Role = interaction.options.getRole("role") as Role;

    if (!Object.values(ids.AD.requestableRoles).includes(roleRequested.id)) {
      await interaction.reply({ content: `You can't request the \`${roleRequested.name}\` role, dummy!`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (!interaction.inGuild() || interaction.guildId !== ids.AD.serverID) {
      await interaction.reply({ content: `To request this role, you must be using the command in the AD server.`, flags: MessageFlags.Ephemeral });
      return;
    }

    if (roleRequested.id === ids.AD.requestableRoles.helperRole) {
      await runRoleRequest(
        "Helper",
        isHelper(interaction) as boolean,
        ["prevent you from using the bot in Progression Discussion visibly. You can add this role at any time by doing /helper again.",
          // eslint-disable-next-line max-len
          `allow you to use the bot in Progression Discussion. To become a Helper, understand that you agree to keep all *personal* use of the bot to <#351479640755404820> or the bot's DMs, and only use the bot outside of there to assist others on their journey through Antimatter Dimensions. **You are not free of consequences.** This is effectively a contract. Breaking it can result in some form of punishment. Moderators and admins are aware at all times of who is and who isn't a helper.\nYou can remove this role at any time by doing /helper again.`],
        ids.AD.requestableRoles.helperRole,
        interaction,
        isEligibleForHelper(interaction)
      );
    }

    if (roleRequested.id === ids.AD.requestableRoles.notificationsRole) {
      const guild = interaction.guild; // interaction.inGuild() already checked above
      const member = await guild?.members.fetch(interaction.user.id).catch(() => null);

      const hasNotificationsRole =
        member ? member.roles.cache.has(ids.AD.requestableRoles.notificationsRole) : false;
      await runRoleRequest(
        "ADAnswersBot Notifications",
        hasNotificationsRole,
        ["mean that you are no longer mentioned when the bot either receives an update or is experiencing an outage. You can add this role at any time by doing /rolerequest again.",
          "mean that you will begin to be mentioned when the bot either receives an update or is experiencing an outage. You can remove this role at any time by doing /rolerequest again."],
        ids.AD.requestableRoles.notificationsRole,
        interaction,
        true
      );
    }
  }
};