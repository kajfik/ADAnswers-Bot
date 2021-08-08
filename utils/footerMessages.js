"use strict";

module.exports = {
  footerMessages: [
    "Made with ❤️ by earth",
    "ADAnswersBot is a bot made for the Discord server \nAntimatter Dimensions. https://discord.gg/AntimatterDimensions",
    "I eat ass",
    "My code is so bad lol",
    "agagagagagagagagag\nagagagagagagagagagagag",
    "I am a bot made by earth",
    "I am sentient",
    "Over 5 lines of code!",
    "Christmas in August isn't a bad thing, is it?",
    "Also try Mee6!",
    "Written in Discord.js. https://github.com/discordjs/discord.js.",
    "This is just like Minecraft splash screen messages, isn't it?",
    "something somethiung minceraft",
    "the future's so bright I gotta wear shades"
  ],
  random() {
    return this.footerMessages[Math.floor(Math.random() * this.footerMessages.length)];
  }
};