/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 6,
  name: "news",
  description: "Args: `list mobile` and `list web`. Explains what the news ticker is and where it came from",
  execute(message, args) {
    if (args[0] === "list" && args[1] === "mobile") {
      message.channel.send("<https://paste.ee/p/LGLeE>");
    } else if (args[0] === "list" && args[1] === "web") {
      message.channel.send("<https://github.com/IvarK/IvarK.github.io/blob/master/javascripts/core/newsticker.js>");
    } else if (args.length === 0) {
      message.channel.send(`The news ticker is an art form. Back in the day Antimatter Dimensions used to have a channel called news ticker suggestions, where people would suggest news messages as they saw fit. However, due to the horrible quality of these suggestions, the channel was shut down. However, the legacy of the channel still lives on in game, and you can read all of the messages as they come across the top. They were all community submitted or snuck in by the developers. For a list of them for mobile, use \`++news list mobile\`. For a list of them for web, use \`++news list web\`.`);
    } else if (args === undefined) {
      message.channel.send(`If you get this message, send a screenshot to earth with what caused it.`);
    } else {
      message.channel.send(`${args.length >= 1 ? `Unknown argument(s) ${args}.` : `how`}`);
    }
  }
};
