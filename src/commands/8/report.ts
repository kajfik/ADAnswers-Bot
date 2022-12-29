import { ApplicationCommandOptionType, ApplicationCommandType, Colors, CommandInteraction, EmbedBuilder, MessageResolvable, TextChannel } from "discord.js";
import { Command } from "../../command";
import { ids } from "../../config.json";
import { link } from "../../functions/Misc";

export const report: Command = {
  name: "reportmessage",
  description: "Report a message using the message link",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "message",
      description: "The link of the message to report",
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: "reason",
      description: "The reason for reporting the message",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const messageID = interaction.options.getString("message")?.split("/").pop() ?? null;
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    console.log(reason);
    console.log(reason.substring(0, 400));

    if (messageID === null) {
      await interaction.reply({ content: "Invalid message link", ephemeral: true });
      return;
    }

    const message = await interaction.channel?.messages.fetch(messageID as MessageResolvable) ?? null;

    if (message === null) {
      await interaction.reply({ content: "Message not found.", ephemeral: true });
      return;
    }

    if (new Date().getTime() - message.createdAt?.getTime() > 6.048e8) {
      await interaction.reply({ content: "This message was created more than a week ago, so it cannot be reported.", ephemeral: true });
      return;
    }

    if (message.content === undefined || message.author.bot) {
      console.log(message.content);
      console.log(message.author.bot);
      await interaction.reply({ content: "This type of message cannot be reported.", ephemeral: true });
      return;
    }

    if (message.guildId !== ids.AD.serverID) {
      await interaction.reply({ content: "This message is not from the AD server, so it cannot be reported.", ephemeral: true });
      return;
    }

    const messageReportEmbed = new EmbedBuilder()
      .setTitle("Message reported")
      .setColor(Colors.Red)
      .setTimestamp()
      .setFields(
        { name: "Reason", value: `Reported by <@${interaction.user.id}> because: ${reason.substring(0, 400)}` },
        { name: `Message`, value: `${message.content.substring(0, 400)}${message.content.length > 400 ? "..." : ""} \n ${link("__**[link]**__", message.url)}` },
        { name: "Channel", value: `<#${message.channel.id}>` },
        { name: "Author", value: `<@${message.author.id}> (${message.author.username}#${message.author.discriminator})` },
        { name: "Sent/reported", value: `Sent at <t:${Math.floor(message.createdTimestamp / 1000)}:f>, reported at <t:${Math.floor(interaction.createdTimestamp / 1000)}:f>` }
      )
      .setAuthor({ name: `Reported by ${interaction.user.username}#${interaction.user.discriminator}`, iconURL: interaction.user.displayAvatarURL() });

    message.guild?.channels.fetch();
    await (message.guild?.channels.cache.get(ids.AD.reportsChannel) as TextChannel)?.send({ content: `<@&${ids.AD.modRole}>`, embeds: [messageReportEmbed] });
    await interaction.reply({ content: "Report successfully sent to the mod team with the below information.", embeds: [messageReportEmbed], ephemeral: true });
  }
};