/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable no-console */

"use strict";

const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const functions = require("./functions");

const client = new Discord.Client();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.commands = new Discord.Collection();

const fieldsVar = [];
const fieldsVar2 = [];
const fieldsVar3 = [];
const fieldsVar4 = [];
const fieldsVar5 = [];
const fieldsVar6 = [];
const fieldsVar69 = [];
const allFields = [];

const fieldsArray = [fieldsVar, fieldsVar2, fieldsVar3, fieldsVar4, fieldsVar5, fieldsVar6, fieldsVar69];

client.once("ready", () => {
  console.log(`Good morning. The current date and time is ${Date()}.`);
  client.user.setActivity(" and helping people since 1992 || created by earth#1337 || use ++help!", { type: "LISTENING" });
});

client.login(config.token);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.commands.forEach(element => {
  if (element.number === 1) fieldsVar.push({ name: element.name, value: element.description });
  else if (element.number === 2) fieldsVar2.push({ name: element.name, value: element.description });
  else if (element.number === 3) fieldsVar3.push({ name: element.name, value: element.description });
  else if (element.number === 4) fieldsVar4.push({ name: element.name, value: element.description });
  else if (element.number === 5) fieldsVar5.push({ name: element.name, value: element.description });
  else if (element.number === 6) fieldsVar6.push({ name: element.name, value: element.description });
  else if (element.number === 69) fieldsVar69.push({ name: element.name, value: element.description });
  else console.log(element);
});

for (const field of fieldsArray) {
  allFields.push(...field);
}
// Uncomment for commands for /docs
// console.log(allFields);

client.on("message", message => {
  if (!message.content.startsWith(config.prefix)) return;
  // eslint-disable-next-line require-unicode-regexp
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const id = message.channel.id;

  if (command === "help" && functions.botCommandsCheck(id, message)) {
    const a = functions.misc.toNumber(args[0]);
    if (Number.isNaN(a)) {
      message.channel.send({ embed: functions.constructEmbedObject(1, fieldsArray) });
      return;
    }
    switch (a) {
    case 1:
      message.channel.send({ embed: functions.constructEmbedObject(1, fieldsArray) });
      break;
    case 2:
      message.channel.send({ embed: functions.constructEmbedObject(2, fieldsArray) });
      break;
    case 3:
      message.channel.send({ embed: functions.constructEmbedObject(3, fieldsArray) });
      break;
    case 4:
      message.channel.send({ embed: functions.constructEmbedObject(4, fieldsArray) });
      break;
    case 5:
      message.channel.send({ embed: functions.constructEmbedObject(5, fieldsArray) });
      break;
    case 6:
      message.channel.send({ embed: functions.constructEmbedObject(6, fieldsArray) });
      break;
    case 69:
      message.channel.send({ embed: functions.constructEmbedObject(69, fieldsArray) });
      break;
    case undefined:
      message.channel.send({ embed: functions.constructEmbedObject(1, fieldsArray) });
      break;
    case null:
      message.channel.send({ embed: functions.constructEmbedObject(1, fieldsArray) });
      break;
    default:
      message.channel.send("Unknown help page.");
    }
  } else if (command === "help" && !functions.botCommandsCheck(id, message)) {
    message.channel.send("Please use <#351479640755404820> for `++help`.");
  }

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, id);
  } catch (error) {
    console.error(error);
    console.log(`${Date()}`);
    console.log(`${message.url}`);
    message.reply(`Command ${command} is not a command.`);
  }
});

