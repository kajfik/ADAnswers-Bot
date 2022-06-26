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
const { Log } = require("./classes/FunctionClasses/Log");
const Global = require("./utils/constants");
const { OnMessageEvents } = require("./classes/FunctionClasses/Events/OnMessageEvents");
const { InteractionEvents } = require("./classes/FunctionClasses/Events/InteractionEvents");

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

function createSequelizes(name) {
  return new Sequelize({
    dialect: "sqlite",
    storage: `./${name}.sqlite`,
    logging: false,
  });
}

async function ready() {
  Global.client = client;
  Global.client.commands = new Discord.Collection();
  Global.sequelize = createSequelizes("database");
  Global.timeSequelize = createSequelizes("timeTags");
  Global.userSequelize = createSequelizes("userTags");
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

client.on("error", err => Log.error(err));
client.on("warn", warn => Log.warning(warn));

client.on("interactionCreate", async interaction => {
  const events = new InteractionEvents(interaction);
  if (!events.message.isCommand()) return;
  if (!Global.client.application?.owner) await Global.client.application?.fetch();
  if (events.message.channelId === config.ids.AD.general && events.message.commandName !== "deadchat") {
    events.commandInGeneral();
    return;
  }

  if (events.hasCommand) await events.requestsTag();

  if (events.message.commandName === "help") {
    await events.help();
    return;
  }

  if (events.message.commandName === "meta") {
    await events.meta();
    return;
  }

  if (!events.hasCommand) return;

  try {
    await events.execute();
  } catch (error) {
    events.error(error);
  }
});

// eslint-disable-next-line no-return-await
client.on("messageCreate", async message => {
  await new OnMessageEvents(message).run();
});