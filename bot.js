/* eslint-disable capitalized-comments */
/* eslint-disable complexity */
/* eslint-disable max-len */
/* eslint-disable no-console */

"use strict";

// DO NOT TOUCH LIKE HALF OF THIS STUFF IT JUST WORKS LMAOOOOOOOOOOOO
// CONFIG LOOKS LIKE THIS https://i.imgur.com/WuAs6b5.png IF YOU NEED ME TO ADD
// ANYTHING TO IT THAT YOU MAY USE OUTSIDE OF ONE FILE

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
const fieldsVar7 = [];
// const fieldsVar8 = [];
const fieldsVar69 = [];
const allFields = [];

const fieldsArray = [fieldsVar, fieldsVar2, fieldsVar3, fieldsVar4, fieldsVar5, fieldsVar6, fieldsVar7, fieldsVar69];

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
  // Some commands have type: "shorthand" to make it not appear in the help embeds. This just works lol If you're adding a shorthand, please make sure to put that in.
  if (element.type !== "shorthand") {
    if (element.number === 1) fieldsVar.push({ name: element.name, value: element.description });
    else if (element.number === 2) fieldsVar2.push({ name: element.name, value: element.description });
    else if (element.number === 3) fieldsVar3.push({ name: element.name, value: element.description });
    else if (element.number === 4) fieldsVar4.push({ name: element.name, value: element.description });
    else if (element.number === 5) fieldsVar5.push({ name: element.name, value: element.description });
    else if (element.number === 6) fieldsVar6.push({ name: element.name, value: element.description });
    else if (element.number === 7) fieldsVar7.push({ name: element.name, value: element.description });
    // else if (element.number === 8) fieldsVar8.push({ name: element.name, value: element.description });
    else if (element.number === 69) fieldsVar69.push({ name: element.name, value: element.description });
    else console.log(element);
  }
});

for (const field of fieldsArray) {
  allFields.push(...field);
}
// Uncomment for commands for /docs
// console.log(allFields);

client.on("message", message => {
  try {
    if (!message.content.startsWith(config.prefix)) return;
    // eslint-disable-next-line require-unicode-regexp
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const id = message.channel.id;

    functions.help(message, fieldsArray, { command, args, id });

    if (!client.commands.has(command) && command !== "help") {
      message.channel.send(`Command \`${command}\` is not a command!`);
      return;
    } 
    if (!client.commands.has(command) && command === "help") {
      return;
    }

    try {
      client.commands.get(command).execute(message, args, id);
    } catch (error) {
      console.error(error);
      console.log(`${Date()}`);
      console.log(`${message.url}`);
      message.reply(`Command ${command} is not a command.`);
    }
  } catch (error) {
    console.log(`something went sicko mode ${error}`);
    message.channel.send(`something went sicko mode ${error}`);
  }
});

