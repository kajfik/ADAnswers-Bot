/* eslint-disable no-console */

// eslint-disable-next-line strict
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
const Chalk = require("chalk");
const fs = require("fs"); 
const config = require("./utils/config.json");
const commands = require("./utils/commands");
const { Internal } = require("./classes/FunctionClasses/Internal");
const { Help } = require("./classes/FunctionClasses/Help");
const { Time } = require("./classes/FunctionClasses/Time");
const { Meta } = require("./classes/ApplicationCommand/MetaApplicationCommand");

// eslint-disable-next-line max-len
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_MEMBERS], partials: ["MESSAGE", "CHANNEL", "USER", "REACTION", "GUILD_MEMBER"] });
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.commands = new Discord.Collection();

const fieldsVar = [];
const fieldsVar2 = [];
const fieldsVar3 = [];
const fieldsVar4 = [];
const fieldsVar5 = [];
const fieldsVar6 = [];
const fieldsVar7 = [];
const fieldsVar69 = [];
const fieldsArray = [fieldsVar, fieldsVar2, fieldsVar3, fieldsVar4, fieldsVar5, fieldsVar6, fieldsVar7, fieldsVar69];

let Tags = undefined;
let TimeTags = undefined;

const commandNames = [];
const allCommands = [];

client.login(config.token);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

const timeSequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./timeTags.sqlite",
  logging: false,
});

/**
 * Handles the bot being ready.
 * @async
 */
async function ready() {
  const NOW = Date.now();
  setup();
  Internal.startIntervals(client);
  console.log(`Setting and sorting commands took ${Date.now() - NOW}ms.`);

  await createTags(0);

  try {
    await sequelize.authenticate();
    await timeSequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  Tags.sync();
  TimeTags.sync();

  console.log(`\n\nGood morning. The current date and time is ${Date()}.\n\n`);

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
  Tags = sequelize.define("tags", {
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
  TimeTags = timeSequelize.define("TimeTags", {
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
  let iteration = 0;
  let jiteration = 0;
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    iteration++;
    console.log(Chalk.grey(`Setting command ${command.command.name}, command ${iteration}...`));
    client.commands.set(command.command.name, command.command);
  }
  console.log(Chalk.greenBright(`\n\n\nSetting commands complete. Beginning sorting...\n\n\n`));
  client.commands.forEach(element => {
    // Some commands have type: "shorthand" to make it not appear in the help embeds. This just works lol 
    // If you're adding a shorthand, please make sure to put that in.
    const e = element;
    commandNames.push(e.name);
    allCommands.push({ name: e.name, value: e.description, type: e.type, check: e.check, acceptableArgs: e.acceptableArgs, page: e.number });
    if (e.type === undefined) {
      jiteration++;
      console.log(Chalk.grey(`Sorting command ${e.name}, command ${jiteration}...`));
      // eslint-disable-next-line max-len
      if (e.number > 0 && e.number < fieldsArray.length) fieldsArray[e.number - 1].push({ name: e.name, value: e.description });
      // eslint-disable-next-line max-len
      else if (e.number === 69) fieldsArray[fieldsArray.length - 1].push({ name: e.name, value: e.description });
      else console.log(e);
    }
  });
}

/**
 * Creates sequelize tags.
 * @param {Number} startingValue - the value at which to start the for loop.
 */
async function createTags(startingValue) {
  if (startingValue > commandNames.length) return;
  try {
    for (let i = startingValue; i < commandNames.length; i++) {
      const tag = await Tags.create({
        name: commandNames[i],
        timesUsed: 0
      });
      Tags.create({
        name: "totalRequests",
        timesUsed: 0
      });
      Tags.create({
        name: "totalSuccesses",
        timesUsed: 0
      });
      Tags.create({
        name: "help",
        timesUsed: 0
      });
      console.log(`Tag ${tag.name} added.`);
    }
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      createTags(startingValue + 1);
    } else console.log(`Something went wrong while adding tag, ${e}`);
  }
}

/**
 * Increments a sequelize tag.
 * @param {String} name - name of the tag to increment
 */
async function incrementTag(name, database, databaseName) {
  const tag = databaseName === "Tags" ? await database.findOne({ where: { name } }) : await database.findOne({ where: { hour: name } });
  if (tag) {
    tag.increment("timesUsed");
    console.log(Chalk.blue(`[${Date()}] Tag ${name} incremented successfully. New value: ${tag.timesUsed}`));
  }
}

let lastErrorUserID = "635628027258339328";

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  if (!client.application?.owner) await client.application?.fetch();
  if (interaction.channelId === "351478114620145665" && !interaction.commandName === "deadchat") {
    interaction.reply({ content: `hey buddy! can't use commands in general. nice try though. proud of u`, ephemeral: true });
    return;
  }

  if (!client.commands.has(interaction.commandName) && interaction.commandName !== "help") return;

  incrementTag("totalRequests", Tags, "Tags");

  if (interaction.commandName === "help") { 
    const args = interaction.options.getInteger("page") ? interaction.options.getInteger("page") : 1; 
    if (args > fieldsArray.length && args !== 69) {
      interaction.reply({ content: `I'm sorry, I don't know what page you're looking for.`, ephemeral: false });
      return; 
    }
    const helpClass = new Help({ 
      client, 
      page: args,
      message: interaction,
      fieldsArray,
      id: interaction.channelId,
    });
    helpClass.send();
    incrementTag("help", Tags, "Tags");
    incrementTag("totalSuccesses", Tags, "Tags");
    incrementTag(Time.newDate().getHours(), TimeTags, "TimeTags");
    console.log(Chalk.blueBright(`/--------------------------------------------------------------------/`));
    return;
  }

  try {
    if (interaction.commandName === "meta") {
      const m = new Meta({
        client,
        page: 1,
        message: interaction,
        id: interaction.channelId,
        Tags,
        TimeTags
      });
      m.send();
    } else client.commands.get(interaction.commandName).execute(interaction, interaction.channelId, Tags);
    incrementTag("totalSuccesses", Tags, "Tags"); 
    incrementTag(interaction.commandName, Tags, "Tags");
    incrementTag(Time.newDate().getHours(), TimeTags, "TimeTags");
    console.log(Chalk.blueBright(`/--------------------------------------------------------------------/`));
  } catch (error) {
    interaction.reply({ content: `Bot ran into an error while executing command ${interaction.commandName}. ${error}`, ephemeral: false });
    const moreInfo = `From: ${interaction.user.username}#${interaction.user.discriminator}
                             Attempted command: ${interaction.commandName}
                             Channel type: ${interaction.channel.type}
                             Time: ${Date()}
                             User ID: ${interaction.user.id}`;
    console.log(moreInfo);
    client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    console.log(error);
    lastErrorUserID = interaction.user.id;
  }
});

// eslint-disable-next-line complexity
client.on("messageCreate", async message => {
  try {
    let mods;
    // AD
    if (message.guildId === "351476683016241162") {
      if (message.stickers.size > 0) message.delete()
        .then(() => {
          // Mod logs in antimatter dimensions
          const person = `${message.author.username}#${message.author.discriminator}`;
          client.channels.cache.get("769210858035085383").send(`${person} sent a sticker in <#${message.channelId}>.`);
          console.log(`Sticker deleted. Sent by ${person}. ${Date()}`);
        }).catch(error => {
          console.log(error);
        });
      await message.guild.members.fetch();
      mods = message.guild.roles.resolve("351477471725617172").members.map(member => member.id);
    }
    // General in AD
    if (message.channelId === "351478114620145665") return;
    // eslint-disable-next-line require-unicode-regexp
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    let slashCommand;
    if (command.substring(0, 2) === "ec" && command.length <= 7 && !isNaN(parseInt(command.slice(-1), 10)) && (command[2] === " " || !isNaN(parseInt(command[2], 10))) && !isNaN(parseInt(command.slice(-3, -2), 10))) {
      if ((command[2] === " " && parseInt(command[3], 10) === 1 && !isNaN(parseInt(command[4], 10))) || (parseInt(command[2], 10) === 1 && !isNaN(parseInt(command[3], 10)))) {
        slashCommand = `ec ${command.slice(-4, -2)} ${command.slice(-1)}`;
      } else {
        slashCommand = `ec ${command.slice(-3, -2)} ${command.slice(-1)}`;
      }
    } else slashCommand = command;
    const isMod = message.guildId === "351476683016241162" ? mods.includes(message.author.id) : false;
    if (message.author.id !== "213071245896450068" && message.author.id !== "830197123378053172" && message.content.startsWith(config.prefix) && !isMod) {
      message.reply(`Using the ++ prefix is now deprecated. Please switch to using slash commands. You can start by typing /
      When typing slash commands, you should see a small preview on the message bar. If you don't, update your Discord. This will help you with the commands.

      (for example, the command you just tried to use (++${command}) would now be "/${slashCommand}".)
      
      This change was made for the convenience of new users with the bot. I do understand that many of you are used to the ++, and if I
      could've kept it I would've. But when push comes to shove, I believe that the slash commands are generally better for the bot.`);
      return;
    }
    if (!client.application?.owner) await client.application?.fetch();
    if (message.content.toLowerCase() === "++deploy" && message.author.id === "213071245896450068") {
      message.reply(`Beginning hostile takeover. Thank you for your patience and cooperation.`);
      await client.application?.commands.set(commands.all).then(() => {
        message.reply({ content: `Successfully deployed commands globally.`, ephemeral: false });
      });
      await client.guilds.cache.get("722268615973273722")?.commands.set(commands.all).then(() => {
        message.reply({ content: `Successfully deployed commands to test server.`, ephemeral: false });
      });

      message.reply(`Deployment success. Expect results within the hour.`);
      console.log(`Deployment success at ${new Date()}.`);
      return;
    }
    if (message.content.toLowerCase() === "++helpers" && ((message.author.id === "213071245896450068" && message.guildId === "351476683016241162") || isMod)) {
      const namesAndIDs = message.guild.roles.resolve("878418120719626320").members.map(member => `${member.user.username}#${member.user.discriminator} (${member.user.id})`);
      console.log(namesAndIDs);
      message.reply(`Currently, ${message.guild.roles.resolve("878418120719626320").members.size} person(s) have the Helper role.`);
      message.author.send(namesAndIDs.join("\n"));
    }
    if (message.content.toLowerCase().startsWith(`++intercom`) && message.author.id === "213071245896450068") { 
      let id;
      if (args[0].length === "213071245896450068".length) id = args[0];
      else id = lastErrorUserID;
      const user = await client.users.fetch(id);
      lastErrorUserID = id;
      const person = `${user.username}#${user.discriminator}`;
      const sent = id === args[0] ? message.content.slice(`++intercom`.length + id.length + 2) : message.content.slice(`++intercom`.length);
      user.send(`${sent}\n**/-------------------------------------------------------------/**\n the above message was sent by earth#1337, the owner of the bot. this is a one way intercom.`).catch(error => { 
        console.log(error); 
        message.reply(`Cannot send messages to ${person}.`);
      });
      console.log(`Intercom message successfully sent to ${person}. Message: \n
      ${sent}`);
      message.reply(`Successfully sent message to ${person}.`);
    }
  } catch (e) {
    console.log(`Deployment failed.`);
    console.log(e);
  }
});