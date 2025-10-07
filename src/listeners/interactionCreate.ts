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

// The global variable is no longer needed.

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    try {
      if (interaction.isMessageContextMenuCommand()) {
        await handleContextMenu(interaction);
      } else if (interaction.isChatInputCommand()) {
        await handleSlashCommand(client, interaction as ChatInputCommandInteraction);
      } else if (interaction.isModalSubmit()) {
        // Check if the modal's custom ID starts with our identifier
        if (interaction.customId.startsWith("report-message-modal:")) {
          // Defer the reply immediately to prevent timeouts
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
  // 6.048e+8 is the amount of milliseconds in a week
  if (new Date().getTime() - interaction.targetMessage.createdAt.getTime() > 6.048e8) {
    await interaction.reply({ content: "This message was created more than a week ago, so it cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }
  if (interaction.targetMessage.content === undefined || interaction.targetMessage.author.bot) {
    await interaction.reply({ content: "This type of message cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }
  if (interaction.targetMessage.guildId !== ids.AD.serverID) {
    await interaction.reply({ content: "This message is not from the AD server, so it cannot be reported.", flags: MessageFlags.Ephemeral });
    return;
  }

  // Create a dynamic customId to pass the message ID to the modal submission
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
};

const handleModalSubmit = async (modalSubmitInteraction: ModalSubmitInteraction) => {
  try {
    const reason = modalSubmitInteraction.fields.getTextInputValue("report-message-input") || "No reason provided.";

    // Get the message ID from the customId
    const messageId = modalSubmitInteraction.customId.split(":")[1];

    // Ensure we have a guild and channel context
    if (!modalSubmitInteraction.guild || !modalSubmitInteraction.channel) {
      await modalSubmitInteraction.editReply({ content: "This command can only be used in a server channel." });
      return;
    }

    // --- Robustly fetch the target message ---
    let targetMessage: Message;
    try {
      targetMessage = await modalSubmitInteraction.channel.messages.fetch(messageId);
    } catch (error) {
      console.error("Failed to fetch the message to be reported:", error);
      await modalSubmitInteraction.editReply({ content: "The message you tried to report could not be found. It may have been deleted." });
      return; // Stop execution if the message isn't found
    }

    const reporter = modalSubmitInteraction.user;

    const messageReportEmbed = new EmbedBuilder()
      .setTitle("Message Reported")
      .setColor(Colors.Red)
      .setTimestamp()
      .setFields(
        { name: "Reason", value: `Reported by <@${reporter.id}>: ${reason.substring(0, 400)}` },
        { name: "Message", value: `${targetMessage.content.substring(0, 400)}${targetMessage.content.length > 400 ? "..." : ""} \n ${link("__**[Link to Message]**__", targetMessage.url)}` },
        { name: "Channel", value: `<#${targetMessage.channel.id}>` },
        { name: "Author", value: `<@${targetMessage.author.id}> (${targetMessage.author.username}#${targetMessage.author.discriminator})` },
        { name: "Sent/Reported", value: `Sent <t:${Math.floor(targetMessage.createdTimestamp / 1000)}:R>, Reported <t:${Math.floor(modalSubmitInteraction.createdTimestamp / 1000)}:R>` }
      )
      .setAuthor({ name: `Reported by ${reporter.username}#${reporter.discriminator}`, iconURL: reporter.displayAvatarURL() });

    // --- Robustly send the report to the moderators ---
    try {
      const reportsChannel = await modalSubmitInteraction.guild.channels.fetch(ids.AD.reportsChannel) as TextChannel;
      if (reportsChannel) {
        await reportsChannel.send({ content: `<@&${ids.AD.modRole}>`, embeds: [messageReportEmbed] });
      } else {
        throw new Error("Reports channel not found on the server.");
      }
    } catch (error) {
      console.error("Failed to send report to the moderators' channel:", error);
      await modalSubmitInteraction.editReply({ content: "Your report was processed, but I failed to deliver it to the moderators due to an internal error. Please contact them directly." });
      return;
    }

    // If everything succeeds, confirm to the user.
    await modalSubmitInteraction.editReply({ content: "Report successfully sent to the mod team. Thank you.", embeds: [messageReportEmbed] });

  } catch (error) {
    console.error("A critical error occurred in the modal submission process:", error);
    // This is a final fallback.
    if (!modalSubmitInteraction.replied) {
        await modalSubmitInteraction.editReply({ content: "An unexpected error occurred while processing your report." });
    }
  }
};

const handleSlashCommand = async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
  if (!client.application?.owner) await client.application?.fetch();

  if (await InteractionEvents.hasCommand(interaction, client)) await incrementTag("totalRequests", tags.commandUsage);

  const command = Commands.find(c => c.name === interaction.commandName);

  if (!command) {
    interaction.followUp({ content: `Command ${interaction.commandName} not found` });
    return;
  }

  try {
    if (interaction.isMessageContextMenuCommand()) return;
    await command.run(interaction, client);
    await incrementBigFourTags(interaction.commandName, `${interaction.user.id}`);
  } catch (error) {
    console.log(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: `Error running command ${interaction.commandName} <@${ids.kajfik}>`, flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: `Error running command ${interaction.commandName} <@${ids.kajfik}>`, flags: MessageFlags.Ephemeral });
    }
  }
};