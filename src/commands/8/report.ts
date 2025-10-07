import { ApplicationCommandOptionType, ApplicationCommandType, Colors, ChatInputCommandInteraction, EmbedBuilder, MessageResolvable, TextChannel } from "discord.js";
import { authorTitle, link } from "../../functions/Misc";
import { Command } from "../../command";
import { ids } from "../../config.json";

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
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const splitLink = interaction.options.getString("message")?.split("/") as Array<string>;
    const messageID = splitLink.pop() ?? null;
    const channelID = splitLink[splitLink.length - 1] ?? null;
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    console.log(reason);
    console.log(reason.substring(0, 400));

    if (messageID === null) {
      await interaction.reply({ content: "Invalid message link", flags: MessageFlags.Ephemeral });
      return;
    }

    if (channelID !== interaction.channelId) {
      await interaction.reply({ content: "Please report the message in the channel it was sent.", flags: MessageFlags.Ephemeral });
      return;
    }

    await interaction.guild?.channels.fetch();

    const messageChannel = await interaction.guild?.channels.fetch(splitLink[splitLink.length - 1] as string) ?? null;

    const message = await interaction.channel?.messages.fetch(messageID as MessageResolvable) ?? null;

    if (message === null || messageChannel === null) {
      await interaction.reply({ content: "Something went wrong. Either the message or the channel was not found.", flags: MessageFlags.Ephemeral });
      return;
    }

    if (new Date().getTime() - message.createdAt?.getTime() > 6.048e8) {
      await interaction.reply({ content: "This message was created more than a week ago, so it cannot be reported.", flags: MessageFlags.Ephemeral });
      return;
    }

    if (message.content === undefined || message.author.bot || message.guildId !== ids.AD.serverID) {
      await interaction.reply({ content: "This message cannot be reported.", flags: MessageFlags.Ephemeral });
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
        { name: "Author", value: `<@${message.author.id}> (${message.author.username}${message.author.discriminator === "0" ? `` : `#${message.author.discriminator}`})` },
        { name: "Sent/reported", value: `Sent at <t:${Math.floor(message.createdTimestamp / 1000)}:f>, reported at <t:${Math.floor(interaction.createdTimestamp / 1000)}:f>` }
      )
      .setAuthor({ name: `Reported by ${authorTitle(interaction)}`, iconURL: interaction.user.displayAvatarURL() });

    message.guild?.channels.fetch();
    await (message.guild?.channels.cache.get(ids.AD.reportsChannel) as TextChannel)?.send({ content: `<@&${ids.AD.modRole}>`, embeds: [messageReportEmbed] });
    await interaction.reply({ content: "Report successfully sent to the mod team with the below information.", embeds: [messageReportEmbed], flags: MessageFlags.Ephemeral });
  }
};