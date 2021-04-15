/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 1,
  name: "challenge",
  description: "Args: `c9`, `ic4`, `ic5`, `ecs`. Returns a guide for each argument.",
  execute(message, args) {
    switch (args[0]) {
    case "c9":
      message.channel.send(`I recommend having all Infinity upgrades (except the last 4 which don't work in challenges) and at least 10-100 unspent IP before attempting C9. Some players prefer attempting this challenge at higher IP values (10k+) where the challenge becomes trivial.\n
You can use this written guide: <https://pastebin.com/MBBTimjD> or this video guide: <https://youtu.be/6o-QKHLcimU> or you can use this strat: 
> Autobuyers off and manually buy the highest dimension available. Keep 6th dim, 8th dim, dimboost, and galaxy autobuyers on. Keep tickspeed cost under the cost of dimensions. Remember to always buy 8th dimension if it's available.`);
      break;
    case "ic4":
      message.channel.send(`IC4 video guide (for mobile): <https://youtu.be/kytefPmkqL4>
IC4 written guide (for web): <https://pastebin.com/aZktZs8m>`);
      break;
    case "ic5":
      message.channel.send(`IC5 video guide (for mobile): <https://www.youtube.com/watch?v=eNqPZ9kGurE>
IC5 written guide (for web): <https://pastebin.com/sj2nFFjH>`);
      break;
    case "ecs":
      message.channel.send(`Check out this helpful guide from Ninjatsu. https://canary.discord.com/channels/351476683016241162/408764187960147982/731639441474453537`);
      break;
    case "c1":
      message.channel.send("Fuck you pichu");
      break;
    default:
      message.channel.send("Unknown challenge argument.");
    }
  }
};