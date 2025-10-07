import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  Client,
  Colors,
  EmbedBuilder,
  Interaction,
  Message,
  MessageContextMenuCommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
  MessageFlags,
} from "discord.js";
import { incrementBigFourTags, incrementTag } from "../functions/database";
import { AutocompleteCommand } from "../command";
import { Commands } from "../commands";
import { InteractionEvents } from "../classes/events/InteractionEvents";
import { ids } from "../config.json";
import { link } from "../functions/Misc";
import { tags } from "../bot";

// No longer need a global variable to store the interaction state.
// let currentMessageBeingReported: MessageContextMenuCommandInteraction;

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    try {
      if (interaction.isMessageContextMenuCommand()) {
        await handleContextMenu(interaction);
      } else if (interaction.isChatInputCommand()) {
        // No need for the extra check, isChatInputCommand is already true.
        await handleSlashCommand(client, interaction);
      } else if (interaction.isModalSubmit()) {
        // Use startsWith for our new dynamic customId
        if (interaction.customId.startsWith("report-message-modal:")) {
          await interaction.deferReply({ flags: MessageFlags.Ephemeral });
          await handleModalSubmit(interaction);
        }
      } else if (interaction.isAutocomplete()) {
        const command = Commands.find(c => c.name === interaction.commandName) as AutocompleteCommand;
        if (!command) {
          console.error(`Command ${interaction.commandName} not found`);
          return;
        }
        try {
          await command.autocomplete(interaction);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const handleContextMenu = async (interaction: MessageContextMenuCommandInteraction) => {
  if (new Date().getTime() - interaction.targetMessage.createdAt.getTime() > 6.048e8) {
    await interaction.reply({ content: "This message was created more than a week ago, so it cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }
  // Simplified the check here.
  if (!interaction.targetMessage.content || interaction.targetMessage.author.bot) {
    await interaction.reply({ content: "This type of message cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }
  if (interaction.targetMessage.guildId !== ids.AD.serverID) {
    await interaction.reply({ content: "This message is not from the AD server, so it cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }

  // Create a dynamic customId to store the message ID
  const customId = `report-message-modal:${interaction.targetMessage.id}`;

  const modal = new ModalBuilder()
    .setCustomId(customId)
    .setTitle("Report message");

  const input = new TextInputBuilder()
    .setCustomId("report-message-input")
    .setLabel("Reason for reporting (Optional)")
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));

  await interaction.showModal(modal);
  // No longer need to set a global variable or defer a reply here.
};

// The function now only needs the ModalSubmitInteraction
const handleModalSubmit = async (modalSubmitInteraction: ModalSubmitInteraction) => {
  const reason = modalSubmitInteraction.fields.getTextInputValue("report-message-input") || "No reason provided.";

  // Get the message ID from the customId
  const messageId = modalSubmitInteraction.customId.split(":")[1];
  const targetMessage = await modalSubmitInteraction.channel?.messages.fetch(messageId) as Message;

  // Now, we get the reporter's info from the modalSubmitInteraction itself.
  const reporter = modalSubmitInteraction.user;

  const messageReportEmbed = new EmbedBuilder()
    .setTitle("Message reported")
    .setColor(Colors.Red)
    .setTimestamp()
    .setFields(
      { name: "Reason", value: `Reported by <@${reporter.id}> because: ${reason.substring(0, 400)}` },
      { name: `Message`, value: `${targetMessage.content.substring(0, 400)}${targetMessage.content.length > 400 ? "..." : ""} \n ${link("__**[link]**__", targetMessage.url)}` },
      { name: "Channel", value: `<#${targetMessage.channel.id}>` },
      { name: "Author", value: `<@${targetMessage.author.id}> (${targetMessage.author.username}#${targetMessage.author.discriminator})` },
      { name: "Sent/reported", value: `Sent at <t:${Math.floor(targetMessage.createdTimestamp / 1000)}:f>, reported at <t:${Math.floor(modalSubmitInteraction.createdTimestamp / 1000)}:f>` }
    )
    .setAuthor({ name: `Reported by ${reporter.username}#${reporter.discriminator}`, iconURL: reporter.displayAvatarURL() });

  const reportsChannel = await modalSubmitInteraction.guild?.channels.fetch(ids.AD.reportsChannel) as TextChannel;
  if (reportsChannel) {
    await reportsChannel.send({ content: `<@&${ids.AD.modRole}>`, embeds: [messageReportEmbed] });
  }

  await modalSubmitInteraction.editReply({ content: "Report successfully sent to the mod team with the below information.", embeds: [messageReportEmbed] });
};

// ... (handleSlashCommand remains the same, but I removed the redundant check)
const handleSlashCommand = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
  if (!client.application?.owner) await client.application?.fetch();

  if (await InteractionEvents.hasCommand(interaction, client)) await incrementTag("totalRequests", tags.commandUsage);

  const command = Commands.find(c => c.name === interaction.commandName);

  if (!command) {
    interaction.followUp({ content: `Command ${interaction.commandName} not found` });
    return;
  }

  try {
    await command.run(interaction, client);
    await incrementBigFourTags(interaction.commandName, `${interaction.user.id}`);
  } catch (error) {
    console.log(error);
    // Use editReply or followUp for replies to deferred interactions.
    // Assuming the command might defer, a generic followUp is safer.
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: `Error running command ${interaction.commandName} <@${ids.kajfik}>`, flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: `Error running command ${interaction.commandName} <@${ids.kajfik}>`, flags: MessageFlags.Ephemeral });
    }
  }
};