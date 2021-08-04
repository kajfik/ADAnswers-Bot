/* eslint-disable max-len */
"use strict";

const functions = require("../functions");
const { Command } = require("./Command");

class XKCDCommand extends Command {
  // Uses args, id, message and client.
  execute(p = {}) {
    try {
      const argToNumber = functions.misc.toNumber(p.args[0]);
      const argMessage = this.getArgMessage(argToNumber);
      const check = this.getCheck(p.id, p.message);
      const argIsNaN = isNaN(argToNumber);
      
      if (p.message.content.length > 1995) {
        p.message.channel.send(`You cannot try to trigger a command over this length!`);
        return;
      }

      if (check && !argIsNaN) p.message.channel.send(argMessage);
      else if (check && argIsNaN) p.message.channel.send(functions.getMessage("error", { args: p.args, name: this.name, acceptableArgs: this.acceptableArgs }));
      else if (p.args[0] === undefined) this.doMissingArgCatch(p.message, p.args);
      else p.message.channel.send(functions.getMessage("shouldNeverAppear"));
    } catch (err) {
      const moreInfo = `From: ${p.message.author.username}#${p.message.author.discriminator}
      Content: ${p.message.content}
      Attempted command: ${p.command}
      Channel type: ${p.message.channel.type}
      Time: ${Date()}
      URL: ${p.message.channel.type === "dm" ? "N/A" : `${p.message.url}`}`;
      // eslint-disable-next-line no-console
      console.log(moreInfo);
      p.client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${err}. ${moreInfo}`);
      p.client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${err}. ${moreInfo}`);
    }
  }
}

module.exports = {
  XKCDCommand
};