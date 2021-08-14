"use strict";

const { TimeStudyApplicationCommand } = require("../classes/ApplicationCommand/TimeStudyApplicationCommand");

const peopleMessageObject = {
  "moderators": {
    "archa": `archa! really cool tester and stuff, real nice guy. there's no way you can hate archa.`,
    "kajfik": `i have known kaj for just over two years now and in that time he has managed to bring AD to so many more people and help grow the community. he is just such a nice guy and gets stuff done.`,
    "mage": `yo! this guy is real cool. does a lot of stuff for the people. became a mod in record time. be like mage. now he's an admin. what a weirdo. love you mage`,
    "omsi": `omsi is a really cool person! she's done a ton of work for AD and is all around a real neat person.`,
    "punk": `i have never spoken to punk but i really like their modding style`,
    "waitingidly": `god dang! this guy has done so much for AD in just the past year. he is a great guy who knows his stuff.`,
    "aesis": `aesis is really cool! slave to the 9-to-5, but still a great mod. give it up for aesis.`,
    "goldentritium": `gt is a pretty neat dude! one of the newer mods and has the ugliest colour ever, but still a good mod.`,
  },
  "nonmods": {
    "blob": "blob",
    "unsmith": "this command is dedicated to platonic. creator of synergism. love ya. go play synergism at https://pseudo-corp.github.io/SynergismOfficial/",
    "earth": `heyo! it's earth. i aint do much of nothin but i did make some stuff! check out my website at https://earthernsence.github.io/`,
    "spectralflame": `spec is a really cool dude who does stuff! he's been a good friend of mine for a a few years now. he also is really fuckin educated on some physics stuff, so he's got that going for him.`,
  }
};

module.exports = {
  command: new TimeStudyApplicationCommand({
    name: "people",
    number: 69,
    description: "see my opinions on people!",
    check: "botCommandsCheck",
    acceptableArgs: [Object.keys(peopleMessageObject), [Object.keys(peopleMessageObject.moderators), Object.keys(peopleMessageObject.nonmods)]],
    getArgMessage(args) {
      if (peopleMessageObject[args[0]]) {
        return peopleMessageObject[args[0]][args[1]];
      }
      return `Unknown person.`;
    },
    messageObject: peopleMessageObject,
    argInfo: {
      type: { key: "type", type: "string" },
      name: { key: "name", type: "string" },
    },
    ephemeral: false
  }),
};