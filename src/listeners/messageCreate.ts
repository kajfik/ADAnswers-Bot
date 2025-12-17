import { Client, Colors, EmbedBuilder, Message, TextChannel } from "discord.js";
import { ids } from "../config.json";

export default (client: Client): void => {
  client.on("messageCreate", async(message: Message<boolean>): Promise<void> => {
    if (message.author.bot) return;
    if (message.mentions.has(ids.bot)) mentioned(message);
    if (message.guildId === ids.AD.serverID || message.guildId === ids.testServer) {
      //if (message.stickers.size > 0) handleStickers(message);
      if (await isScammer(message)) muteScammer(message);
    }
  });
};

function handleStickers(message: Message<boolean>): void {
  message.delete()
    .then(() => {
      const person = `${message.author.username}#${message.author.discriminator}`;
      (message.guild?.channels.cache.get(ids.AD.modLogs) as TextChannel).send(`${person} sent a sticker in <#${message.channelId}>`);
    });
}

async function isMod(message: Message<boolean>): Promise<boolean> {
  if (message.guildId !== ids.AD.serverID) return false;
  if (!message.inGuild()) return false;

  // Prefer the member attached to the message; fetch only THIS ONE member if missing
  const member =
    message.member ?? (await message.guild.members.fetch(message.author.id).catch(() => null));

  return member ? member.roles.cache.has(ids.AD.modRole) : false;
}

async function isScammer(message: Message<boolean>): Promise<boolean> {
  const mod = await isMod(message);
  const isBot = message.author.id === ids.bot;
  const atEveryone = message.content.includes("@everyone");
  const isLink = message.content.includes("http");

  return !isBot && atEveryone && isLink && !mod;
}

async function muteScammer(message: Message<boolean>): Promise<void> {
  console.log("Running muteScammer");

  const embed = new EmbedBuilder()
    .setTitle(`${message.author.username}#${message.author.discriminator}`)
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(Colors.Blurple)
    .addFields({ name: "Message", value: message.content.substring(0, 1023), inline: false })
    .setDescription(`Message sent by <@${message.author.id}> was deleted and member was muted.`)
    .setTimestamp();

  if (message.guildId === ids.AD.serverID && message.inGuild()) {
    const member =
      message.member ?? (await message.guild.members.fetch(message.author.id).catch(() => null));

    if (member) await member.roles.add(ids.mutedRole).catch(console.error);

    await message.delete().catch(console.error);
    (message.guild.channels.cache.get(ids.AD.modChannel) as TextChannel)?.send({ embeds: [embed] });
  }
}

function mentioned(message: Message<boolean>): void {
  try {
    message.author.send("hey, you mentioned me! I'm here to help you! For more information about commands, check out `/help`! you can use me in DMs as well!");
  } catch (e) {
    console.log("User had messages disabled from ADAB");
  }
}