/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

const realityMessageObject = {
  "link": "https://ivark.github.io/Reality/",
  "automator": `Check out this video! <https://youtu.be/687i6dUkBlk>. The Automator will also have two modes, a "block" Automator and a regular scripting Automator. The Blocktomato has been compared to something akin to Scratch; drag blocks and create a script. The regular scripting Automator is exactly what it says on the tin. You may have heard something in the past about limited lines, however, this has changed, and there is no line limiting.`,
  "perks": `On Reality, you gain one Perk Point, which you can spend in the Perk Tree. Start reading <#351477847090659341> at <https://canary.discord.com/channels/351476683016241162/351477847090659341/606221441704394774>.`,
  "celestials": `After Reality, there are 7 Celestials. Each with unique mechanics and upgrades, and you need to defeat them all. The first four Celestials are pretty much ready, however, the fifth, sixth, and seventh are still being balanced. I'm not revealing more though, as it can be regarded as a spoiler.`,
  "blackhole": `The Black Hole is an upgradeable mechanic that speeds up time every now and again. It is active for a short time, then on cooldown, but during its active time the speed of time is multiplied.`,
  "reset": `When you reality, you gain a Glyph, with its level based on a few resources. There are 5 different Glyph types, each with 4 different effects. You will also gain Reality Machines, which are used for upgrades. These upgrades have requirements which you first need to meet. There's also Perk Points, which you can use on a perk tree, these are less of a production boost, and more of a quality of life, like a bit more automation, etc.  `,
  "releasedate": `There is no set release date for Reality. Even those who are close to the development do not know. We can also not give you an estimate. Reality is a big update with a lot of moving parts, and we want to make sure that it's up to snuff. Please remain patient! Reality will also be the last major update for Antimatter Dimensions, so we want to make sure we deliver the perfect product that we know you will enjoy.`
};

module.exports = {
  command: new ApplicationCommand({

    name: "reality",
    description: "Args: `link`, `automator`, `celestials`, `blackhole`, `reset`, `perks`, `releasedate`. Most of this information was either in an official Hevi spoiler or has been said in <#351477847090659341>. Information surrounding the upcoming reality update.",
    check: "e4000Check",
    acceptableArgs: Object.keys(realityMessageObject),
    sent: undefined,
    getArgMessage(arg) {
      if (this.acceptableArgs.includes(arg.toLowerCase())) return realityMessageObject[arg.toLowerCase()];
      return `Unknown arg in command reality`;
    },
    argInfo: {
      key: "feature",
      type: "string",
    },
    messageObject: realityMessageObject,
  })
};
