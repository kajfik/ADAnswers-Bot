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
const fieldsVar69 = [];
const fieldsArray = [fieldsVar, fieldsVar2, fieldsVar3, fieldsVar4, fieldsVar5, fieldsVar6, fieldsVar7, fieldsVar69];

client.login(config.token);

client.once("ready", () => {
  const NOW = Date.now();
  setup();
  console.log(`\n\nGood morning. The current date and time is ${Date()}.`);
  functions.internal.startIntervals(client);
  console.log(`Setting and sorting commands took ${Date.now() - NOW}ms.`);

  // Uncomment for /docs
  // const allFields = [];
  // for (const field of fieldsArray) {
  //   allFields.push(...field);
  // }
  // console.log(allFields);
});

function setup() {
  let iteration = 0;
  let jiteration = 0;
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    iteration++;
    console.log(`Setting command ${command.command.name}, command ${iteration}...`);
    client.commands.set(command.command.name, command.command);
  }
  console.log(`Setting command complete. Beginning sorting...\n\n\n`);
  client.commands.forEach(element => {
    // Some commands have type: "shorthand" to make it not appear in the help embeds. This just works lol 
    // If you're adding a shorthand, please make sure to put that in.
    const e = element;
    if (element.type === undefined) {
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

client.on("message", message => {
  try {
    if (!message.content.startsWith(config.prefix)) return;
    // eslint-disable-next-line require-unicode-regexp
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const id = message.channel.id;

    functions.help(message, fieldsArray, { command, args, id });

    if (!client.commands.has(command) && command !== "help") {
      if (command.startsWith("ec") && command.includes("x")) {
        try {
          // Gets the completion and number
          const a = command.split("c");
          // Tries to execute the EC command.
          // Here we access the EC command directly instead of routing it through ec.js 
          // to improve code slightly.
          // The args has to be passed in as an array or else it's read as a string in eternitychallenge.js
          client.commands.get("eternitychallenge").execute(message, [a[1]], id);
          return;
        } catch (error) {
          console.log(error);
        }
      }
      message.reply(`Command \`${command}\` is not a command!`);
      return;
    } 
    if (!client.commands.has(command) && command === "help") {
      return;
    }

    try {
      // This is a lot of parameters and eventually I think it would be cool
      // to make it all one object.
      client.commands.get(command).execute(message, args, id);
    } catch (error) {
      console.error(error);
      console.log(`${Date()}`);
      console.log(`${message.url}`);
      // eslint-disable-next-line max-len
      message.reply(`Command \`${command}\` is, in fact, a command, but it appears there was an internal issue with the bot and the bot is going offline. Thank you for your patience. Paging earth...<@213071245896450068>`);
    }
  } catch (error) {
    console.log(`something went sicko mode ${error}`);
    message.channel.send(`something went sicko mode ${error}`);
  }
});

