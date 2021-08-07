/* eslint-disable no-console */

"use strict";

// DO NOT TOUCH LIKE HALF OF THIS STUFF IT JUST WORKS LMAOOOOOOOOOOOO
// CONFIG LOOKS LIKE THIS https://i.imgur.com/WuAs6b5.png IF YOU NEED ME TO ADD
// ANYTHING TO IT THAT YOU MAY USE OUTSIDE OF ONE FILE

// A lot of these things are exclusively for the database. As such, please refrain from touching anything
// to do with Tags or Sequelize. With that, there are plenty of functions in this file too that eventually
// I would like to remove and place into functions.js. For now, though, I'm just going to leave them here.

const Discord = require("discord.js");
const Sequelize = require("sequelize");
const fs = require("fs"); 
const config = require("./config.json");
const functions = require("./functions");
const commands = require("./commands");

// eslint-disable-next-line max-len
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES, Discord.Intents.FLAGS.GUILD_INTEGRATIONS], partials: ["MESSAGE", "CHANNEL", "USER", "REACTION", "GUILD_MEMBER"] });
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

const commandNames = [];

client.login(config.token);

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

async function ready() {
  const NOW = Date.now();
  setup();
  functions.internal.startIntervals(client);
  console.log(`Setting and sorting commands took ${Date.now() - NOW}ms.`);

  await createTags(0);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  Tags.sync();

  console.log(`\n\nGood morning. The current date and time is ${Date()}.\n\n`);

  // Uncomment for /docs
  // const allFields = [];
  // for (const field of fieldsArray) {
  //   allFields.push(...field);
  // }
  // console.log(allFields);
}

client.once("ready", ready);

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
  let iteration = 0;
  let jiteration = 0;
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    iteration++;
    console.log(`Setting command ${command.command.name}, command ${iteration}...`);
    client.commands.set(command.command.name, command.command);
  }
  console.log(`\n\n\nSetting commands complete. Beginning sorting...\n\n\n`);
  client.commands.forEach(element => {
    // Some commands have type: "shorthand" to make it not appear in the help embeds. This just works lol 
    // If you're adding a shorthand, please make sure to put that in.
    const e = element;
    commandNames.push(e.name);
    if (e.type === undefined) {
      jiteration++;
      console.log(`Sorting command ${e.name}, command ${jiteration}...`);
      // eslint-disable-next-line max-len
      if (e.number > 0 && e.number < fieldsArray.length) fieldsArray[e.number - 1].push({ name: e.name, value: e.description });
      // eslint-disable-next-line max-len
      else if (e.number === 69) fieldsArray[fieldsArray.length - 1].push({ name: e.name, value: e.description });
      else console.log(e);
    }
  });
}

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

async function incrementTag(name) {
  const tag = await Tags.findOne({ where: { name } });
  if (tag) {
    tag.increment("timesUsed");
    console.log(`Tag ${name} incremented successfully. New value: ${tag.timesUsed}`);
  }
}

client.on("error", error => {
  console.error(error);
  client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}`);
  client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}.`);
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (!client.commands.has(interaction.commandName) && interaction.commandName !== "help") return;

  if (interaction.commandName === "help") { 
    const args = interaction.options.getInteger("page") ? interaction.options.getInteger("page") : 1; 
    if (args > fieldsArray.length && args !== 69) {
      interaction.reply({ content: `I'm sorry, I don't know what page you're looking for.`, ephemeral: true });
      return; 
    }
    functions.help(interaction, fieldsArray, { command: "help", args: [args], id: interaction.channelId, client });
    return;
  }

  try {
    client.commands.get(interaction.commandName).execute(interaction, interaction.channelId);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
  }
});

// eslint-disable-next-line complexity
client.on("messageCreate", async message => {
  try {
    if (!message.content.startsWith(config.prefix)) return;
    incrementTag("totalRequests");
    if (message.content.length > 1000) {
      message.channel.send(`You cannot try to trigger a command over this length!`);
      return;
    }
    // eslint-disable-next-line require-unicode-regexp
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const id = message.channel.id;
    if (!client.application?.owner) await client.application?.fetch();
    if (message.content.toLowerCase() === "++deploy") {
      message.reply(`Beginning hostile takeover. Thank you for your patience and cooperation.`);
      await client.application?.commands.set(commands.all).then(() => {
        message.reply({ content: `Successfully deployed commands globally.`, ephemeral: true });
      });
      await client.guilds.cache.get("722268615973273722")?.commands.set(commands.all).then(() => {
        message.reply({ content: `Successfully deployed commands to test server.`, ephemeral: true });
      });
      return;
    }

    if (!client.commands.has(command) && command !== "help") {
      if (command.startsWith("ec") && (command.includes("x") || command.includes("×"))) {
        try {
          // Gets the completion and number
          const a = command.split("c");
          // Tries to execute the EC command.
          // Here we access the EC command directly instead of routing it through ec.js 
          // to improve code slightly.
          // The args has to be passed in as an array or else it's read as a string in eternitychallenge.js
          // eslint-disable-next-line max-depth
          if (message.content.length > 1000) {
            message.channel.send(`You cannot try to trigger a command over this length!`);
            return;
          }
          client.commands.get("eternitychallenge").execute(message, [a[1]], id);
          incrementTag("ec");
          incrementTag("totalSuccesses");
          return;
        } catch (error) {
          console.log(error);
        }
      }
      message.reply(`Command \`${command}\` is not a command!`);
      return;
    } 
    if (!client.commands.has(command) && command === "help") {
      incrementTag("help");
      functions.help(message, fieldsArray, { command, args, id, client });
      return;
    }

    try {
      // This is a lot of parameters and eventually I think it would be cool
      // to make it all one object.

      if (message.content.length > 1000) {
        message.channel.send(`You cannot try to trigger a command over this length!`);
        return;
      }

      // I'm keeping this block of code here because I'm lazy.
      if (command === "xkcd") {
        client.commands.get(command).execute({ message, args, id, client, });
        incrementTag(command);
        incrementTag("totalSuccesses");
        return;
      }
      client.commands.get(command).execute(message, args, id);
      incrementTag(command);
      incrementTag("totalSuccesses");
    } catch (error) {
      const moreInfo = `From: ${message.author.username}#${message.author.discriminator}
      Content: ${message.content}
      Attempted command: ${command}
      Channel type: ${message.channel.type}
      Time: ${Date()}
      URL: ${message.channel.type === "dm" ? "N/A" : `${message.url}`}`;
      console.log(moreInfo);
      client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
      client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
      console.error(error);
      // eslint-disable-next-line max-len
      message.reply(`Command \`${command}\` is, in fact, a command, but it appears there was an internal issue with the bot. Thank you for your patience.`);
    }
  } catch (error) {
    // This catch has actually happened once! I don't remember what caused it, though.
    console.log(`something went sicko mode ${error}`);
    message.channel.send(`something went sicko mode ${error}`);
  }
});

