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

async function getMods(message: Message<boolean>): Promise<string[]> {
  await message.guild?.members.fetch();
  return message.guild?.roles.resolve(ids.AD.modRole)?.members.map(member => member.id) ?? [];
}

async function isMod(message: Message<boolean>): Promise<boolean> {
  const mods = await getMods(message);
  return message.guildId === ids.AD.serverID ? mods.includes(message.author.id) : false;
}

async function isScammer(message: Message<boolean>): Promise<boolean> {
  const mod = await isMod(message);
  const isBot = message.author.id === ids.bot;
  const atEveryone = message.content.includes("@everyone");
  const isLink = message.content.includes("http");
  const scammer = !isBot &&
  atEveryone &&
  isLink &&
  !mod;
  return scammer;
}

function muteScammer(message: Message<boolean>): void {
  console.log("Running muteScammer");
  // We have to truncate the message content -- if it's longer than 1024 characters, then discord throws an error
  // since embed field content can't be longer than that
  const embed = new EmbedBuilder()
    .setTitle(`${message.author.username}#${message.author.discriminator}`)
    .setThumbnail(message.author.displayAvatarURL())
    .setColor(Colors.Blurple)
    .addFields({ name: "Message", value: message.content.substring(0, 1023), inline: false })
    .setDescription(`Message sent by <@${message.author.id}> was deleted and member was muted.`)
    .setTimestamp();

  if (message.guildId === ids.AD.serverID) {
    message.member?.roles.add(ids.mutedRole);
    message.delete();
    (message.guild?.channels.cache.get(ids.AD.modChannel) as TextChannel).send({ embeds: [embed] });
  }
}

function mentioned(message: Message<boolean>): void {
  try {
    message.author.send("hey, you mentioned me! I'm here to help you! For more information about commands, check out `/help`! you can use me in DMs as well!");
  } catch (e) {
    console.log("User had messages disabled from ADAB");
  }
}