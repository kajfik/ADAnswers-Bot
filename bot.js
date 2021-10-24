/* eslint-disable no-console */
"use strict";

// DO NOT TOUCH LIKE HALF OF THIS STUFF IT JUST WORKS LMAOOOOOOOOOOOO
// CONFIG LOOKS LIKE THIS https://i.imgur.com/WuAs6b5.png IF YOU NEED ME TO ADD
// ANYTHING TO IT THAT YOU MAY USE OUTSIDE OF ONE FILE

// A lot of these things are exclusively for the database. As such, please refrain from touching anything
// to do with Tags or Sequelize. With that, there are plenty of functions in this file too that eventually
// I would like to remove and place into functions.js. For now, though, I'm just going to leave them here.

// There's a lot of database code here. 

const Discord = require("discord.js");
const Sequelize = require("sequelize");
const config = require("./utils/config.json");
const { Internal } = require("./classes/FunctionClasses/Internal");
const { Help } = require("./classes/FunctionClasses/Help");
const { Meta } = require("./classes/Meta");
const { Log } = require("./classes/FunctionClasses/Log");
const Global = require("./utils/constants");

const client = new Discord.Client({ 
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES, 
    Discord.Intents.FLAGS.DIRECT_MESSAGES, 
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS, 
    Discord.Intents.FLAGS.GUILD_MEMBERS
  ], 
  partials: [
    "MESSAGE", 
    "CHANNEL", 
    "USER", 
    "REACTION", 
    "GUILD_MEMBER"
  ] 
});

client.login(config.token);

async function ready() {
  Global.client = client;
  Global.client.commands = new Discord.Collection();
  Global.sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
  });
  Global.timeSequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./timeTags.sqlite",
    logging: false,
  });
  Global.userSequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./userTags.sqlite",
    logging: false,
  });
  Global.setTags();
  await Global.ready(false);
  Internal.startIntervals();
  if (process.argv.length > 2) {
    process.argv.forEach(arg => {
      if (arg.startsWith("--")) {
        Global[arg.slice(2)]();
        console.log(`Ran process ${arg}`);
      }
    });
  }
}

client.once("ready", ready);

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  if (!Global.client.application?.owner) await Global.client.application?.fetch();
  if (interaction.channelId === config.ids.AD.general && interaction.commandName !== "deadchat") {
    interaction.reply({ content: `hey buddy! can't use commands in general. nice try though. proud of u`, ephemeral: true });
    return;
  }
  const hasCommand = Global.client.commands.has(interaction.commandName) || interaction.commandName === "help" || interaction.commandName === "meta";

  if (hasCommand) await Global.incrementTag("totalRequests", "Tags");
  const person = `${interaction.user.username}#${interaction.user.discriminator}`;

  if (interaction.commandName === "help") { 
    const args = interaction.options.getInteger("page") ? interaction.options.getInteger("page") : 1; 
    if (args > Global.fieldsArray.length && args !== 69) {
      interaction.reply({ content: `I'm sorry, I don't know what page you're looking for.`, ephemeral: false });
      return; 
    }
    const helpClass = new Help({ 
      page: args,
      message: interaction,
      id: interaction.channelId,
    });
    helpClass.send();
    await Global.incrementBigFourTags("help", person);
    Log.divider();
    return;
  } 
  if (interaction.commandName === "meta") {
    const metaClass = new Meta({
      page: 1,
      message: interaction,
      id: interaction.channelId,
    });
    metaClass.send();
    await Global.incrementBigFourTags("meta", person);
    Log.divider();
    return;
  }

  if (!hasCommand) return;

  try {
    Global.client.commands.get(interaction.commandName).execute(interaction, interaction.channelId);
    await Global.incrementBigFourTags(interaction.commandName, person);
    Log.divider();
  } catch (error) {
    interaction.reply({ content: `Bot ran into an error while executing command ${interaction.commandName}. ${error}`, ephemeral: false });
    const moreInfo = `From: ${person}
                             Attempted command: ${interaction.commandName}
                             Channel type: ${interaction.channel.type}
                             Time: ${Date()}
                             User ID: ${interaction.user.id}`;
    Log.info(moreInfo);
    Global.client.channels.cache.get(config.ids.testServerErrorLoggingChannel).send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    Global.client.users.cache.get(config.ids.earth).send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    Log.error(`[${Date()}] ${error}`);
    Global.lastErrorUserID = interaction.user.id;
  }
});

client.on("messageCreate", async message => {
  const adIDs = config.ids.AD;
  let mods;
  if (message.mentions.has("830197123378053172")) message.author.send("hey, you mentioned me! I'm here to help you! For more information about commands, check out `/help`!");
  if (message.channelId === adIDs.general && !message.stickers.size > 0) return;
  try {
    if (message.guildId === adIDs.serverID) {
      if (message.stickers.size > 0) Global.stickerDelete(message);
      await message.guild.members.fetch();
      mods = message.guild.roles.resolve(adIDs.modRole).members.map(member => member.id);
    }
    // eslint-disable-next-line require-unicode-regexp
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const isMod = message.guildId === adIDs.serverID ? mods.includes(message.author.id) : false;
    if (!Global.client.application?.owner) await Global.client.application?.fetch();

    // Sends a message with the amount of helpers, and then DMs you the list.
    if (message.content.toLowerCase() === "++helpers" && ((message.author.id === config.ids.earth && message.guildId === adIDs.serverID) || isMod)) {
      const roleInfo = message.guild.roles.resolve(config.ids.helperRole);
      const namesAndIDs = roleInfo.members.map(member => `${member.user.username}#${member.user.discriminator} (${member.user.id}) [${member.roles.highest.name}]`);
      
      Log.info(namesAndIDs.join("\n"));
      message.reply(`Currently, ${roleInfo.members.size} person(s) have the Helper role.`);
      message.author.send(namesAndIDs.join("\n"));
    }

    // Allows me (earth) to message the most recent person to cause an error
    if (message.content.toLowerCase().startsWith(`++intercom`) && message.author.id === config.ids.earth) { 
      let id;
      if (args[0].length === "213071245896450068".length) id = args[0];
      else id = Global.lastErrorUserID;
      const user = await Global.client.users.fetch(id);
      Global.lastErrorUserID = id;
      const person = `${user.username}#${user.discriminator}`;
      const sent = id === args[0] ? message.content.slice(`++intercom`.length + id.length + 2) : message.content.slice(`++intercom`.length);
      user.send(`${sent}\n**/-------------------------------------------------------------/**\n the above message was sent by earth#1337, the owner of the bot. this is a one way intercom.`).catch(error => { 
        Log.error(`[${Date()}] ${error}`);
        message.reply(`Cannot send messages to ${person}.`);
      });
      Log.info(`Intercom message successfully sent to ${person}. Message: \n
      ${sent}`);
      message.reply(`Successfully sent message to ${person}.`);
    }

  } catch (e) {
    Log.error(`[${Date()}] ${e}`);
  }
});