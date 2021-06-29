/* eslint-disable capitalized-comments */
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

const fieldsArray = [fieldsVar, fieldsVar2, fieldsVar3, fieldsVar4, fieldsVar5, fieldsVar6, fieldsVar7, fieldsVar69];

client.once("ready", () => {
  console.log(`Good morning. The current date and time is ${Date()}.`);
  functions.internal.startIntervals(client);
});

client.login(config.token);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // eslint-disable-next-line no-negated-condition
  if (command.command !== undefined) {
    client.commands.set(command.command.name, command.command);
  } else {
    client.commands.set(command.name, command);
  }
}

client.commands.forEach(element => {
  // Some commands have type: "shorthand" to make it not appear in the help embeds. This just works lol 
  // If you're adding a shorthand, please make sure to put that in.
  let e = null;
  // This element.command thing is for commands I have refactored into classes.
  // eslint-disable-next-line no-negated-condition
  if (element.command !== undefined) {
    e = element.command;
  } else {
    e = element;
  }
  if (e.type !== "shorthand") {
    // eslint-disable-next-line max-len
    if (e.number > 0 && e.number < fieldsArray.length) fieldsArray[e.number - 1].push({ name: e.name, value: e.description });
    // eslint-disable-next-line max-len
    else if (e.number === 69) fieldsArray[fieldsArray.length - 1].push({ name: e.name, value: e.description });
    else console.log(e);
  }
});


// Uncomment for docs
// const allFields = [];
// for (const field of fieldsArray) {
//   allFields.push(...field);
// }
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
      if (command.startsWith("ec") && command.includes("x")) {
        try {
          // Gets the completion and number
          const a = command.split("c");
          const b = a[1].split("x");
          // Tries to execute the EC command.
          // Here we access the EC command directly instead of routing it through ec.js 
          // to improve code slightly.
          client.commands.get("eternitychallenge").execute(message, b, id);
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
      // to make it all one object. As of right now, though, the object at the end is
      // solely for being able to do something like ++ts 12x5. It's finicky, it's cool, it works.
      client.commands.get(command).execute(message, args, id, { c: client.commands });
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

