/* eslint-disable no-negated-condition */
/* eslint-disable complexity */
/* eslint-disable max-len */
"use strict";

function toNumber(string) {
  let a = parseInt(string, 10);
  a = Math.abs(Math.floor(a));
  return a;
}

function checkIfNotSecondSplit(string) {
  if (string === "idle" || string === "passive" || string === "active") return true;
  return false;
}

module.exports = {
  number: 4,
  name: "studytree",
  description: `Args: your total Time Theorems. Beginning at 54 TT (and until 120 TT), the command will take a second argument: \`active\`, \`passive\`, or \`idle\`. This command requires an arg. Generates a Time Study tree based on your total Time Theorems.`,
  execute(message, args) {
    const a = Math.abs(Math.floor(args[0]));
    let b = "";
    if ((a >= 54 && a <= 119) && args[1] === undefined) {
      message.channel.send("For Total Time Theorem numbers between 54 and 120, you must specify whether you want `active`, `passive`, or `idle`. That entirely depends on your playstyle!");
      return;
    }
    if (args[1] !== undefined) b = args[1].toLowerCase();


    if (a <= 13) message.channel.send("`11,21,33,31,41|0`");
    else if (a <= 39) message.channel.send("`11,22,32,42,51,61,71,81,91,101,21,33|0`");
    else if (a <= 44) message.channel.send("`11,22,32,42,51,61,72,82,92,102,21,33,31|0`");
    else if (a <= 51) message.channel.send("`11,22,32,42,51,61,71,81,91,101,111,21,33,31|0`");
    else if (a <= 53) message.channel.send("`11,22,32,42,51,61,72,82,92,102,111|0`");
    else if (a <= 69 && b === "passive") message.channel.send("`11,22,32,42,51,61,71,81,91,101,111,122,132,142,21,31|0`");
    else if (a <= 69 && b === "active") message.channel.send("`11,22,32,42,51,61,71,81,91,101,111,121,131,141,21,31|0`");
    else if (a <= 69 && b === "idle") message.channel.send("`11,22,32,42,51,61,71,81,91,101,111,123,133,143,21,31|0`");
    else if (a <= 70 && b === "passive") message.channel.send("`11,22,32,42,51,61,72,82,92,102,111,122,132,142,21,33,31,41|0`");
    else if (a <= 70 && b === "active") message.channel.send("`11,22,32,42,51,61,72,82,92,102,111,121,131,141,21,33,31,41|0`");
    else if (a <= 70 && b === "idle") message.channel.send("`11,22,32,42,51,61,72,82,92,102,111,123,133,143,21,33,31,41|0`");
    else if (a <= 84 && b === "passive") message.channel.send("`11,22,32,42,51,61,71,81,91,101,111,122,132,142,151,161,21,33,31|0`");
    else if (a <= 84 && b === "active") message.channel.send("`11,22,32,42,51,61,71,81,91,101,111,121,131,141,151,161,21,33,31|0`");
    else if (a <= 84 && b === "idle") message.channel.send("`11,22,32,42,51,61,71,81,91,101,111,123,133,143,151,161,21,33,31|0`");
    else if (a <= 99 && b === "passive") message.channel.send("`11,22,32,42,51,61,72,82,92,102,111,122,132,142,151,161,162,21,33,31|0`");
    else if (a <= 99 && b === "active") message.channel.send("`11,22,32,42,51,61,72,82,92,102,111,121,131,141,151,161,162,21,33,31|0`");
    else if (a <= 99 && b === "idle") message.channel.send("`11,22,32,42,51,61,72,82,92,102,111,123,133,143,151,161,162,21,33,31|0`");
    else if (a <= 119 && b === "passive") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,122,132,142,151,161,171,162,21,31,41,33,62|0`");
    else if (a <= 119 && b === "active") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,162,21,31,41,33,62|0`");
    else if (a <= 119 && b === "idle") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,123,133,143,151,161,171,162,21,31,41,33,62|0`");
    else if (a >= 319 && a <= 900 && b === "") message.channel.send("At 900 Total TT, this flips over into EC10 territory. `11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62|0`");
    else if (a <= 901 && b === "") message.channel.send("Do note: EC10 is done between this list and the previous. `11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,212,211|0`");
    else if (a <= 1292 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,212,193,214,211,213|0`");
    else if (a <= 2142 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,193,214,228,234|0`");
    else if (a <= 2272 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,212,223,232|0`");
    else if (a <= 2692 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,212,223,232,193,214,211,213|0`");
    else if (a <= 3542 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,211,212,223,232,192,193,214|0`");
    else if (a <= 3712 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,211,222,212,224,232,193,214|0`");
    else if (a <= 3925 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,212,223,232,192,201,72,82,92,102,211,193,214,213|0`");
    else if (a <= 4945 && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,211,222,212,224,232,192,201,71,81,91,102,193,214,213,228|0`");
    else if ((a >= 6765 || a <= 6765) && b === "") message.channel.send("`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171,181,162,21,31,41,33,62,191,211,222,212,224,232,192,201,72,82,92,102,193,214,228,234,213,226|0`");
    else if (args[0] !== Number && args[1] === "") message.channel.send(`Unknown argument ${args[0]} in command \`++studytree\``);
    else if ((args[1] !== String || checkIfNotSecondSplit(args[1])) && args[0] <= 120) message.channel.send(`Unknown argument ${args[1]} in command \`++studytree\``);
    else if (args[0] >= 120 && args[1] !== "") message.channel.send("Do not use a second argument when you are past 120 total TT");
    else if (a !== Number) message.channel.send("No words allowed in the first arg!");
    else if (b !== String) message.channel.send("No numbers allowed in the second arg!");
    else message.channel.send("This message should be impossible. If you get it, screenshot it with the message that triggered it and send it to earth.");
  }
};