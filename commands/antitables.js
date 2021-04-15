/* eslint-disable no-negated-condition */
// No negated condition has to be off because of line 25. I'm not sure why it doesn't 
// let you do that, but it's whatever. 
/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 4,
  name: "antitables",
  description: "Args: `prebreak`, `postbreak`, `posteternity`. Sends a guide to Antitables.",
  execute(message, args) {
    switch (args[0]) {
    case "prebreak":
      message.channel.send(`Enter C8 and do 5 dimboosts to unlock Sacrifice and try to get as much Sacrifice multiplier as you can without completing the challenge. Disable all autobuyers and sacrifice again to reset your dimensions. Then, toggle Until 10 next to tickspeed and buy 1 of each dim. Then toggle Buy 1 back, and buy 10 2nd dims. Continue up from 3rd to 8th dim, buying just enough dimensions to get the Dimension Multiplier (the number below the dimension name) higher than the last. If you complete the challenge too quickly to get the multipliers in ascending order, you can do it in a normal infinity.`);
      break;
    case "postbreak":
      message.channel.send(`Get as many galaxies as you can and a few dimboosts. Disable the dim 1-7 autobuyers. Dimboost, then toggle Until 10 next to tickspeed and buy 1 of each dim. Then toggle Buy 1 back, and buy 10 2nd dims. Continue up from 3rd to 8th dim, buying just enough dimensions to get the Dimension Multiplier (the number below the dimension name) higher than the last. 
If your 1st dimension multiplier raises too quickly, you may be unable to complete the achievement until you reach 1.8e308 IP. If this is the case, don't worry, you don't need it to progress.`);
      break;
    case "posteternity":
      message.channel.send(`Respec out of all of your Time Studies. Get as many galaxies as you can and a few dimboosts. Disable the crunch, eternity, dimboost, galaxy, and dim 1-7 autobuyers. Dimboost, and your 1st dim's Dimension Multiplier (the number below the dimension name) should be the lowest, followed by the 2nd dim. If it’s not, buy 2nd dims until it is, otherwise, continue up from 3rd to 7thth dim, buying just enough dimensions to get the Dimension Multiplier higher than the last. If you have reached Dilation, you can try this strategy within that.`);
      break;
    default:
      if (args[0] === undefined) message.channel.send(`Command \`++antitables\` requires an arg. ("prebreak", "postbreak", or "posteternity").`);
      else if (!(args[0] === undefined)) message.channel.send(`Unknown argument ${args[0]} for command \`++antitables\`.`);
      else message.channel.send(`This message should never appear. If it does, let earth know with the message that caused it.`);
        
    }
  }
};