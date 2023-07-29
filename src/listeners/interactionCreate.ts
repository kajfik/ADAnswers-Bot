import { ActionRowBuilder,
  ChatInputCommandInteraction,
  Client,
  Colors,
  EmbedBuilder,
  Interaction,
  MessageContextMenuCommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextChannel,
  TextInputBuilder,
  TextInputStyle } from "discord.js";
import { incrementBigFourTags, incrementTag } from "../functions/database";
import { AutocompleteCommand } from "../command";
import { Commands } from "../commands";
import { InteractionEvents } from "../classes/events/InteractionEvents";
import { ids } from "../config.json";
import { link } from "../functions/Misc";
import { tags } from "../bot";

let currentMessageBeingReported: MessageContextMenuCommandInteraction;

export default (client: Client): void => {
  client.on("interactionCreate", async(interaction: Interaction) => {
    try {
      if (interaction.isMessageContextMenuCommand()) {
        await handleContextMenu(interaction);
      } else if (interaction.isChatInputCommand()) {
        if (interaction.isMessageContextMenuCommand()) return;
        await handleSlashCommand(client, interaction as ChatInputCommandInteraction);
      } else if (interaction.isModalSubmit()) {
        if (interaction.customId === "report-message-modal") {
          await interaction.deferReply({ ephemeral: true });
          await handleModalSubmit(currentMessageBeingReported, interaction);
        }
      } else if (interaction.isAutocomplete()) {
        // If this is being run, it's an autocomplete command. We can just assume
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

const handleContextMenu = async(interaction: MessageContextMenuCommandInteraction) => {
  // 6.048e+8 is the amount of milliseconds in a week
  if (new Date().getTime() - interaction.targetMessage.createdAt.getTime() > 6.048e8) {
    await interaction.reply({ content: "This message was created more than a week ago, so it cannot be reported.", ephemeral: true });
    return;
  }
  if (interaction.targetMessage.content === undefined || interaction.targetMessage.author.bot) {
    await interaction.reply({ content: "This type of message cannot be reported.", ephemeral: true });
    return;
  }
  if (interaction.targetMessage.guildId !== ids.AD.serverID) {
    await interaction.reply({ content: "This message is not from the AD server, so it cannot be reported.", ephemeral: true });
    return;
  }

  const modal = new ModalBuilder()
    .setCustomId("report-message-modal")
    .setTitle("Report message");

  const input = new TextInputBuilder()
    .setCustomId("report-message-input")
    .setLabel("Reason for reporting (Optional)")
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(input));

  await interaction.showModal(modal);
  currentMessageBeingReported = interaction;
  interaction.deferReply({ ephemeral: true });
};

const handleModalSubmit = async(interaction: MessageContextMenuCommandInteraction, modalSubmitInteraction: ModalSubmitInteraction) => {
  const reason = modalSubmitInteraction.fields.getTextInputValue("report-message-input");

  const messageReportEmbed = new EmbedBuilder()
    .setTitle("Message reported")
    .setColor(Colors.Red)
    .setTimestamp()
    .setFields(
      { name: "Reason", value: `Reported by <@${interaction.user.id}> because: ${reason.substring(0, 400)}` },
      { name: `Message`, value: `${interaction.targetMessage.content.substring(0, 400)}${interaction.targetMessage.content.length > 400 ? "..." : ""} \n ${link("__**[link]**__", interaction.targetMessage.url)}` },
      { name: "Channel", value: `<#${interaction.targetMessage.channel.id}>` },
      { name: "Author", value: `<@${interaction.targetMessage.author.id}> (${interaction.targetMessage.author.username}#${interaction.targetMessage.author.discriminator})` },
      { name: "Sent/reported", value: `Sent at <t:${Math.floor(interaction.targetMessage.createdTimestamp / 1000)}:f>, reported at <t:${Math.floor(modalSubmitInteraction.createdTimestamp / 1000)}:f>` }
    )
    .setAuthor({ name: `Reported by ${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() });

  interaction.targetMessage.guild?.channels.fetch();
  await (interaction.targetMessage.guild?.channels.cache.get(ids.AD.reportsChannel) as TextChannel)?.send({ content: `<@&${ids.AD.modRole}>`, embeds: [messageReportEmbed] });
  await modalSubmitInteraction.editReply({ content: "Report successfully sent to mod team with the below information.", embeds: [messageReportEmbed] });
};

const handleSlashCommand = async(client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
  if (!client.application?.owner) await client.application?.fetch();

  if (await InteractionEvents.hasCommand(interaction, client)) await incrementTag("totalRequests", tags.commandUsage);

  const command = Commands.find(c => c.name === interaction.commandName);

  // Help and meta are actually called as normal commands now, so we no longer need to have special
  // cases for them.

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
    interaction.reply({ content: `Error running command ${interaction.commandName} <@${ids.earth}>` });
  }
};