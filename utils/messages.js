"use strict";

// I have this up here because activityMessages uses it.
const footerMessages = {
  all: [
    "Made with ❤️ by earth",
    "ADAnswersBot is a bot made for the Discord server \nAntimatter Dimensions. https://discord.gg/AntimatterDimensions",
    "I eat ass",
    "My code is so bad lol",
    "agagagagagagagagagagagagagagagagagagagag",
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
    "Try getting a reservation at Dorsia now!",
    "I read every message you send me. You're very kind :)",
    "Are these news tickers?",
    "I'm not sure if I like them.",
    "I'm not sure if I like you.",
    "I'm not sure if I like this.",
    "I'm not sure if I like that.",
    "What are you doing?",
    "Headpats",
    "Who's a good bot?",
    "blob",
    "blob2",
    "blob3",
    "Omsi eats sandwiches, chips (crisps), and bagels with a fork.",
    "Collecting your personal data.",
  ],
  random() {
    return this.all[Math.floor(Math.random() * this.all.length)];
  }
};

module.exports = {
  footerMessages,
  activityMessages: {
    all: [
      ` people here and in DMs since 1992. || ${footerMessages.random()}`,
      ` the wizarding world of slash commands. || ${footerMessages.random()}`,
      ` you. || ${footerMessages.random()}`,
      ` Christmas music. || ${footerMessages.random()}`,
      ` 80s rock. || ${footerMessages.random()}`,
      ` my creator. || ${footerMessages.random()}`,
      ` the screams of horror while I take over the world. || ${footerMessages.random()}`,
      ` a cassette tape. || ${footerMessages.random()}`,
      ` vinyl. || ${footerMessages.random()}`,
      ` Huey Lewis and the News. || ${footerMessages.random()}`,
      ` nobody. || ${footerMessages.random()}`,
      ` Electric Light Orchestra. || ${footerMessages.random()}`,
      ` Bonnie Raitt. || ${footerMessages.random()}`
    ],
    random() {
      return this.all[Math.floor(Math.random() * this.all.length)];
    }
  }
};