import {
  ActionRowBuilder, ChatInputCommandInteraction, Client, Colors, EmbedBuilder, Events,
  Interaction, MessageContextMenuCommandInteraction, ModalBuilder, ModalSubmitInteraction,
  TextChannel, TextInputBuilder, TextInputStyle, MessageFlags,
  InteractionReplyOptions
} from "discord.js";
import { incrementBigFourTags, incrementTag } from "../functions/database";
import { AutocompleteCommand } from "../command";
import { Commands } from "../commands";
import { InteractionEvents } from "../classes/events/InteractionEvents";
import { ids } from "../config.json";
import { link } from "../functions/Misc";
import { tags } from "../bot";

export default (client: Client): void => {
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    try {
      if (interaction.isMessageContextMenuCommand()) {
        await handleContextMenu(interaction);
      } else if (interaction.isChatInputCommand()) {
        await handleSlashCommand(client, interaction as ChatInputCommandInteraction);
      } else if (interaction.isModalSubmit()) {
        if (interaction.customId.startsWith("report-message-modal:")) {
          await interaction.deferReply({ flags: MessageFlags.Ephemeral });
          await handleModalSubmit(interaction);
        }
      } else if (interaction.isAutocomplete()) {
        const command = Commands.find(c => c.name === interaction.commandName) as AutocompleteCommand | undefined;
        if (command) await command.autocomplete(interaction);
      }
    } catch (err) {
      console.error(err);
      // best-effort error reply (won't throw if already replied/deferred)
      const opts: InteractionReplyOptions = { content: "Something went wrong.", flags: MessageFlags.Ephemeral };
      if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) {
        await interaction.reply(opts).catch(() => {});
      } else if (interaction.isRepliable()) {
        await interaction.followUp(opts).catch(() => {});
      }
    }
  });
};

const handleContextMenu = async (interaction: MessageContextMenuCommandInteraction) => {
  // Guardrails
  if (Date.now() - interaction.targetMessage.createdTimestamp > 6.048e8) {
    await interaction.reply({ content: "This message is over a week old, cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }
  if (!interaction.targetMessage.content || interaction.targetMessage.author.bot) {
    await interaction.reply({ content: "This type of message cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }
  if (interaction.targetMessage.guildId !== ids.AD.serverID) {
    await interaction.reply({ content: "Only messages from the AD server can be reported.", flags: MessageFlags.Ephemeral });
    return;
  }

  // Build modal; encode message & channel into customId
  const customId = `report-message-modal:${interaction.targetMessage.id}:${interaction.channelId}`;
  const modal = new ModalBuilder()
    .setCustomId(customId)
    .setTitle("Report message");

  const input = new TextInputBuilder()
    .setCustomId("report-message-input")
    .setLabel("Reason for reporting (Optional)")
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));

  // NOTE: do NOT defer/reply after showModal(); that's the initial response
  await interaction.showModal(modal);
};

const handleModalSubmit = async (modal: ModalSubmitInteraction) => {
  const reason = modal.fields.getTextInputValue("report-message-input") ?? "";
  const [, messageId, channelId] = modal.customId.split(":");

  // Fetch message again from ids encoded in customId
  const channel = await modal.client.channels.fetch(channelId).catch(() => null);
  if (!channel || !channel.isTextBased()) {
    await modal.editReply({ content: "Could not locate the message's channel." });
    return;
  }

  const msg = await (channel as TextChannel).messages.fetch(messageId).catch(() => null);
  if (!msg) {
    await modal.editReply({ content: "The message was not found (maybe deleted)." });
    return;
  }

  const reporter = modal.user; // always present

  const embed = new EmbedBuilder()
    .setTitle("Message reported")
    .setColor(Colors.Red)
    .setTimestamp()
    .setAuthor({ name: `Reported by ${reporter.username}#${reporter.discriminator}`, iconURL: reporter.displayAvatarURL() })
    .setFields(
      { name: "Reason", value: `Reported by <@${reporter.id}> because: ${reason.substring(0, 400) || "—"}` },
      { name: "Message", value: `${msg.content.substring(0, 400)}${msg.content.length > 400 ? "..." : ""} \n ${link("__**[link]**__", msg.url)}` },
      { name: "Channel", value: `<#${msg.channel.id}>` },
      { name: "Author", value: `<@${msg.author.id}> (${msg.author.username}#${msg.author.discriminator})` },
      { name: "Sent/reported", value: `Sent <t:${Math.floor(msg.createdTimestamp/1000)}:f>, reported <t:${Math.floor(modal.createdTimestamp/1000)}:f>` }
    );

  // Send to the reports channel
  const reports = msg.guild?.channels.cache.get(ids.AD.reportsChannel) as TextChannel | undefined;
  if (!reports) {
    await modal.editReply({ content: "Mod reports channel not found. Please notify admins." });
    return;
  }

  await reports.send({ content: `<@&${ids.AD.modRole}>`, embeds: [embed] });
  await modal.editReply({ content: "Report successfully sent to the mod team.", embeds: [embed] });
};

const handleSlashCommand = async (client: Client, interaction: ChatInputCommandInteraction) => {
  if (!client.application?.owner) await client.application?.fetch();

  if (await InteractionEvents.hasCommand(interaction, client)) {
    await incrementTag("totalRequests", tags.commandUsage);
  }

  const command = Commands.find(c => c.name === interaction.commandName);
  if (!command) {
    const opts: InteractionReplyOptions = { content: `Command ${interaction.commandName} not found`, flags: MessageFlags.Ephemeral };
    if (!interaction.deferred && !interaction.replied) await interaction.reply(opts);
    else await interaction.followUp(opts);
    return;
  }

  try {
    await command.run(interaction, client);
    await incrementBigFourTags(interaction.commandName, `${interaction.user.id}`);
  } catch (error) {
    console.error(error);
    const opts: InteractionReplyOptions = { content: `Error running command ${interaction.commandName} <@${ids.kajfik}>`, flags: MessageFlags.Ephemeral };
    if (!interaction.deferred && !interaction.replied) await interaction.reply(opts);
    else await interaction.followUp(opts);
  }
};