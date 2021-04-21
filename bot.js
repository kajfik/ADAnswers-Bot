/* eslint-disable complexity */
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
const fieldsVar3 = [];
const fieldsVar4 = [];
const fieldsVar5 = [];
const fieldsVar69 = [];
const allFields = [];


const fieldsArray = [fieldsVar, fieldsVar2, fieldsVar3, fieldsVar4, fieldsVar5, fieldsVar69];

client.once("ready", () => {
  console.log(`Good morning. The current date and time is ${Date()}.`);
  client.user.setActivity(" and helping people since 1992 || created by earth#1337 || use ++help!", { type: "LISTENING" });
});

client.login(config.token);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // If (command.name === "eternitychallenge") {
  // continue;
  // } else {
  client.commands.set(command.name, command);
  // }
}

client.commands.forEach(element => {
  if (element.number === 1) fieldsVar.push({ name: element.name, value: element.description });
  else if (element.number === 2) fieldsVar2.push({ name: element.name, value: element.description });
  else if (element.number === 3) fieldsVar3.push({ name: element.name, value: element.description });
  else if (element.number === 4) fieldsVar4.push({ name: element.name, value: element.description });
  else if (element.number === 5) fieldsVar5.push({ name: element.name, value: element.description });
  else if (element.number === 69) fieldsVar69.push({ name: element.name, value: element.description });
  else console.log(element);
});

for (const field of fieldsArray) {
  allFields.push(...field);
}
// Uncomment when you need commands for /docs
// console.log(allFields);

function sumAllCommands() {
  let sum = 0;
  for (const array of fieldsArray) {
    sum += array.length;
  }
  sum += fieldsArray.length;
  sum -= 1;
  return sum;
}

const embedObject = {
  color: "#AAAAAA",
  title: "Help (p1/5)",
  description: `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sumAllCommands()} commands.`,
  fields: fieldsVar,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands, or use \"++meta suggest\".\nUse ++help [number] to go to more pages of commands."
  }
};

const embedObject2 = {
  color: "#BBBBBB",
  title: "Help (p2/5)",
  description: `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sumAllCommands()} commands.`,
  fields: fieldsVar2,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands, or use \"++meta suggest\".\nUse ++help [number] to go to more pages of commands."
  }
};

const embedObject3 = {
  color: "#CCCCCC",
  title: "Help (p3/5)",
  description: `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sumAllCommands()} commands.`,
  fields: fieldsVar3,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands, or use \"++meta suggest\".\nUse ++help [number] to go to more pages of commands."
  }
};

const embedObject4 = {
  color: "#DDDDDD",
  title: "Help (p4/5)",
  description: `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sumAllCommands()} commands.`,
  fields: fieldsVar4,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands, or use \"++meta suggest\".\nUse ++help [number] to go to more pages of commands."
  }
};

const embedObject5 = {
  color: "#EEEEEE",
  title: "Help (p5/5)",
  description: `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${sumAllCommands()} commands.`,
  fields: fieldsVar5,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands, or use \"++meta suggest\".\nUse ++help [number] to go to more pages of commands."
  }
};

const embedObject69 = {
  color: "#696969",
  title: "Help (p69/5)",
  description: `I can't believe you even tried this. You really thought there were commands here?`,
  fields: fieldsVar69,
  timestamp: new Date(),
  footer: {
    text: "This superfluous bot was created by @earth#1337. Bug him for more commands, or use `++meta suggest`.\nUse ++help [number] to go to more pages of commands."
  }
};

function toNumber(string) {
  return parseInt(string, 10);
}

client.on("message", message => {
  if (!message.content.startsWith(config.prefix)) return;
  // eslint-disable-next-line require-unicode-regexp
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "help" && message.channel.id === "351479640755404820") {
    const a = toNumber(args[0]);
    if (Number.isNaN(a)) {
      message.channel.send({ embed: embedObject });
      return;
    }
    switch (a) {
    case 1:
      message.channel.send({ embed: embedObject });
      break;
    case 2:
      message.channel.send({ embed: embedObject2 });
      break;
    case 3:
      message.channel.send({ embed: embedObject3 });
      break;
    case 4:
      message.channel.send({ embed: embedObject4 });
      break;
    case 5:
      message.channel.send({ embed: embedObject5 });
      break;
    case 69:
      message.channel.send({ embed: embedObject69 });
      break;
    case undefined:
      message.channel.send({ embed: embedObject });
      break;
    case null:
      message.channel.send({ embed: embedObject });
      break;
    default:
      console.log(a);
      message.channel.send("Unknown help page.");
    }
  } else if (command === "help" && message.channel.id !== "351479640755404820") {
    message.channel.send("Please use <#351479640755404820> for `++help`.");
  }

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply(`Command ${command} is not a command.`);
  }
});

