/* eslint-disable max-len */
"use strict";

const functions = require("../functions");

module.exports = {
  number: 1,
  name: "challenge",
  description: "Args: all challenges, including `ecs`. Returns a guide for each argument.",
  execute(message, args, id) {
    switch (args[0]) {
    case "c2":
    case "c3":
    case "c4":
    case "c5":
    case "c6":
    case "c7":
      message.channel.send(`It is recommended to have at least the first 12 infinity upgrades and 100 spare IP.
If you want to get those 100 IP, you probably want to get upgrade 13 and 14 as well to speed things up. (Note: Those upgrades won't work inside challenges.)`);
      break;
    case "c8":
      message.channel.send(`No strat or tips for this challenge. Just start it, get five dimboosts (four shifts and one boost on web) and hit sacrifice at ~10x.
Make sure to do the antitable achievement in these runs, because this achievement is pretty easy for now. If you need a guide for it, feel free to call the bot with "++antitables prebreak".`);
      break;
    case "c9":
      message.channel.send(`I recommend having all Infinity upgrades (except the last 4 which don't work in challenges) and at least 100 unspent IP before attempting C9. Some players prefer attempting this challenge at higher IP values (10k+) where the challenge becomes trivial.\n
You can use this written guide: <https://pastebin.com/MBBTimjD> or this video guide: <https://youtu.be/6o-QKHLcimU> or you can use this strat: 
> Autobuyers off and manually buy the highest dimension available. Keep 6th dim, 8th dim, dimboost, and galaxy autobuyers on. Keep tickspeed cost under the cost of dimensions. Remember to always buy 8th dimension if it's available.`);
      break;
    case "c10":
      message.channel.send(`It is recommended to have at least the first 12 infinity upgrades and 100 spare IP.
If you want to get those 100 IP, you probably want to get upgrade 13 and 14 as well to speed things up. (Note: Those upgrades won't work inside challenges.)`);
      break:
    case "c11":
      message.channel.send(`Once you have the "Galaxies are twice as effective" upgrade this challenge becomes a normal infinity run. Just do it once you have that upgrade.`);
      break;
    case "c12":
      message.channel.send(`It is recommended to have at least the first 12 infinity upgrades and 100 spare IP.
If you want to get those 100 IP, you probably want to get upgrade 13 and 14 as well to speed things up. (Note: Those upgrades won't work inside challenges.)`);
      break;
        
    case "ic1":
      message.channel.send(`As the reward of IC1 is not that good, it's recommended to do it once you have the galaxy upgrade for 5e11 IP.
No special strat for this challenge.`);
      break;
    case "ic2":
      message.channel.send(`Do not attempt IC2 before you reached ID4 at ~e45 IP. If you cannot get e10500 AM in a normal infinity, why would you try to reach it inside a challenge?
No special strat for this challenge.`);
      break;
    case "ic3":
      message.channel.send(`Attempt IC3 after getting the ID1 for e56 IP. This might take an hour to do.
No special strat for this challenge.`);
      break;
    case "ic4":
      message.channel.send(`IC4 video guide (for mobile): <https://youtu.be/kytefPmkqL4>
IC4 written guide (for web): <https://pastebin.com/aZktZs8m>`);
      break;
    case "ic5":
      message.channel.send(`IC5 video guide (for mobile): <https://www.youtube.com/watch?v=eNqPZ9kGurE>
IC5 written guide (for web): <https://pastebin.com/sj2nFFjH>`);
      break;
    case "ic6":
      message.channel.send(`Attempt IC6 at ~e102 IP.
No special strat for this challenge.`);
      break;
    case "ic7":
      message.channel.send(`Attempt IC7 at ~e114 IP.
No special strat for this challenge.`);
      break;
    case "ic8":
      message.channel.send(`Attempt IC8 at ~e129 IP.
No special strat for this challenge.`);
      break;
      
    case "ecs":
      if (functions.ecsCheck(id, message)) message.channel.send(`Check out this helpful guide from Ninjatsu. https://canary.discord.com/channels/351476683016241162/408764187960147982/731639441474453537`);
      else message.channel.send("This command only works in its respective channels or bot commands.");
      break;
        
    case "c1":
      message.channel.send("Fuck you pichu");
      break;
    default:
      message.channel.send("Unknown challenge argument. If you're trying to put in a different challenge than `c9`, `ic4`, `ic5`, `ecs`, or `c1`, and this message shows up, it's because the challenge should be straightforward enough that you will not need a guide.");
    }
  }
};
