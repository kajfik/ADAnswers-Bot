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
    "the future's so bright I gotta wear shades",
    "use /help!",
    "You can use the bot in DMs, too!",
    "You like Huey Lewis and the News?",
    "Their early work was a little too new wave for my tastes.",
    "But when \"Sports\" came out in '83, I think they really came into their own, commercially and artistically.",
    "The whole album has a clear, crisp sound, and a new sheen of consummate professionalism that really gives the songs a big boost.",
    "He's been compared to Elvis Costello, but I think Huey has a far more bitter, cynical sense of humor.",
    "In '87, Huey released this; Fore!, their most accomplished album.",
    `I think their undisputed masterpiece is "Hip To Be Square".`,
    "A song so catchy, most people probably don't listen to the lyrics.",
    "But they should, because it's not just about the pleasures of conformity and the importance of trends",
    "It's also a personal statement about the band itself.",
    "Try getting a reservation at Dorsia now!"
  ],
  random() {
    return this.footerMessages[Math.floor(Math.random() * this.footerMessages.length)];
  }
};