/* eslint-disable max-len */
/* eslint-disable no-console */
"use strict";

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const config = require("./config.json");
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.commands = new Discord.Collection();
const fieldsVar = [];
const fieldsVar2 = [];
const fieldsVar69 = [];

client.login(config.token);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.commands.forEach(element => {
  if (element.number === 1) fieldsVar.push({ name: element.name, value: element.description });
  else if (element.number === 2) fieldsVar2.push({ name: element.name, value: element.description });
  else if (element.number === 69) fieldsVar69.push({ name: element.name, value: element.description });
  else console.log(element);
});

const embedObject = {
  color: "#AAAAAA",
  title: "Help (p1)",
  description: `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${fieldsVar.length + fieldsVar2.length + 1} commands.`,
  fields: fieldsVar,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands.\nUse +help [number] to go to more pages of commands."
  }
};

const embedObject2 = {
  color: "#BBBBBB",
  title: "Help (p2)",
  description: `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${fieldsVar.length + fieldsVar2.length + 1} commands.`,
  fields: fieldsVar2,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands.\nUse +help [number] to go to more pages of commands."
  }
};

const embedObject69 = {
  color: "#696969",
  title: "Help (p69)",
  description: `I can't believe you even tried this. You really thought there were commands here?`,
  fields: fieldsVar69,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands.\nUse +help [number] to go to more pages of commands."
  }
};

client.once("ready", () => {
  console.log(`Good morning. The current date and time is ${Date()}.`);
});

client.on("message", message => {
  if (!message.content.startsWith(config.prefix)) return;
  // eslint-disable-next-line require-unicode-regexp
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if ((command === "help" && args.includes("1")) || (command === "help" && !args.includes("1") && !args.includes("2") && !args.includes("69"))) {
    message.channel.send({ embed: embedObject });
  } else if (command === "help" && args.includes("2")) {
    message.channel.send({ embed: embedObject2 });
  } else if (command === "help" && args.includes("69")) {
    message.channel.send({ embed: embedObject69 });
  }

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`Command ${command} is not a command.`);
  }
});

