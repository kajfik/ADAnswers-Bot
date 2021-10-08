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
const commands = require("./utils/commands");
const { Internal } = require("./classes/FunctionClasses/Internal");
const { Help } = require("./classes/FunctionClasses/Help");
const { Time } = require("./classes/FunctionClasses/Time");
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

function setGlobal() {
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
  Global.Tags = Global.sequelize.define("tags", {
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    timesUsed: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });
  Global.TimeTags = Global.timeSequelize.define("TimeTags", {
    hour: {
      type: Sequelize.NUMBER,
      defaultValue: 0,
      allowNull: false,
      unique: true
    },
    timesUsed: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });
  Global.UserTags = Global.userSequelize.define("UserTags", {
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    timesUsed: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });
}

/**
 * Handles the bot being ready.
 * @async
 */
async function ready() {
  const NOW = Date.now();
  setGlobal();
  setup();
  Internal.startIntervals();
  Log.success(`Setting and sorting commands took ${Date.now() - NOW}ms.`);

  await Global.createTags(0);

  await Global.authAndSyncDatabases();

  Log.important(`\n\nGood morning. The current date and time is ${Date()}.\n\n`);

  // Console.log(allCommands);
  // Uncomment for /docs
  // const allFields = [];
  // for (const field of fieldsArray) {
  //   allFields.push(...field);
  // }
  // console.log(allFields);
}

client.once("ready", ready);

/**
 * Sets up the bot to be able to use the database, prepares the commands, and sorts them into help pages.
 */
function setup() {
  let iteration = 0;
  let jiteration = 0;
  for (const file of Global.commandFiles) {
    const command = require(`./commands/${file}`);
    iteration++;
    Log.loading(`Loading command ${iteration}/${Global.commandFiles.length}`);
    Global.client.commands.set(command.command.name, command.command);
  }
  Log.success(`\n\n\nSetting commands complete. Beginning sorting...\n\n\n`);
  Global.client.commands.forEach(element => {
    // Some commands have type: "shorthand" to make it not appear in the help embeds. This just works lol 
    // If you're adding a shorthand, please make sure to put that in.
    const e = element;
    Global.commandNames.push(e.name);
    Global.allCommands.push({ name: e.name, value: e.description, type: e.type, check: e.check, acceptableArgs: e.acceptableArgs, page: e.number });
    if (e.type === undefined) {
      jiteration++;
      Log.loading(`Sorting command ${jiteration}/${Global.client.commands.size - 8}`);
      // eslint-disable-next-line max-len
      if (e.number > 0 && e.number < Global.fieldsArray.length) Global.fieldsArray[e.number - 1].push({ name: e.name, value: e.description });
      // eslint-disable-next-line max-len
      else if (e.number === 69) Global.fieldsArray[Global.fieldsArray.length - 1].push({ name: e.name, value: e.description });
      else Log.error(e);
    }
  });
}

let lastErrorUserID = "635628027258339328";

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  if (!Global.client.application?.owner) await Global.client.application?.fetch();
  if (interaction.channelId === config.ids.AD.general && interaction.commandName !== "deadchat") {
    interaction.reply({ content: `hey buddy! can't use commands in general. nice try though. proud of u`, ephemeral: true });
    return;
  }

  if (!Global.client.commands.has(interaction.commandName) && interaction.commandName !== "help" && interaction.commandName !== "meta") return;

  Log.divider();
  Global.incrementTag("totalRequests", "Tags");
  const person = `${interaction.user.username}#${interaction.user.discriminator}`;
  const tag = await Global.UserTags.findOne({ where: { name: person } });

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
    Global.incrementTag("help", "Tags");
    Global.incrementTag("totalSuccesses", "Tags");
    Global.incrementTag(Time.newDate().getHours(), "TimeTags");
    Log.divider();
    if (tag) Global.incrementTag(person, "UserTags");
    else {
      Global.UserTags.create({
        name: person,
        timesUsed: 1
      });
      Log.success(`Created tag ${person}`);
      Log.divider();
    }
    return;
  }

  try {
    if (interaction.commandName === "meta") {
      const m = new Meta({
        page: 1,
        message: interaction,
        id: interaction.channelId,
      });
      m.send();
    } else Global.client.commands.get(interaction.commandName).execute(interaction, interaction.channelId);
    Global.incrementTag("totalSuccesses", "Tags"); 
    Global.incrementTag(interaction.commandName, "Tags");
    Global.incrementTag(Time.newDate().getHours(), "TimeTags");
    if (tag) Global.incrementTag(person, "UserTags");
    else {
      Global.UserTags.create({
        name: person,
        timesUsed: 1
      });
      Log.success(`Created tag ${person}`);
      Log.divider();
    }
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
    lastErrorUserID = interaction.user.id;
  }
});

client.on("messageCreate", async message => {
  const adIDs = config.ids.AD;
  let mods;
  if (message.content.includes("<@!830197123378053172>")) message.reply("fuck off");
  if (message.channelId === adIDs.general) return;
  try {
    if (message.guildId === adIDs.serverID) {
      if (message.stickers.size > 0) message.delete()
        .then(() => {
          // Mod logs in antimatter dimensions
          const person = `${message.author.username}#${message.author.discriminator}`;
          client.channels.cache.get(adIDs.modLogs).send(`${person} sent a sticker in <#${message.channelId}>.`);
          Log.info(`[${Date()}] ${person} sent a sticker in <#${message.channelId}>.`);
        }).catch(error => {
          Log.error(`[${Date()}] ${error}`);
        });
      await message.guild.members.fetch();
      mods = message.guild.roles.resolve(adIDs.modRole).members.map(member => member.id);
    }
    // eslint-disable-next-line require-unicode-regexp
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const isMod = message.guildId === adIDs.serverID ? mods.includes(message.author.id) : false;
    if (!Global.client.application?.owner) await Global.client.application?.fetch();
    
    // Deploys the commands for use throughout discord.
    if (message.content.toLowerCase() === "++deploy" && message.author.id === config.ids.earth) {
      message.reply(`Beginning hostile takeover. Thank you for your patience and cooperation.`);
      await Global.client.application?.commands.set(commands.all).then(() => {
        message.reply({ content: `Successfully deployed commands globally.`, ephemeral: false });
      });
      await Global.client.guilds.cache.get(config.ids.testServer)?.commands.set(commands.all).then(() => {
        message.reply({ content: `Successfully deployed commands to test server.`, ephemeral: false });
      });

      message.reply(`Deployment success. Expect results within the hour.`);
      Log.success(`[${Date()}] Deployment success. Expect results within the hour.`);
      return;
    }

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
      else id = lastErrorUserID;
      const user = await Global.client.users.fetch(id);
      lastErrorUserID = id;
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