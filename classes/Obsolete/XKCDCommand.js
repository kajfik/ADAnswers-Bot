/* eslint-disable max-len */
"use strict";

// I'm keeping this because I don't really want to get rid of it, to be completely honest. It isn't used anywhere,
// but I want to keep it for posterity, I guess.

const functions = require("../../utils/functions");
const { Command } = require("../Command");

/** 
 * @class XKCDCommand
 * @extends {Command}
 * Class representing a XKCD Command. Extends base {@link Command} class.
 * No constructor, as it has no extra data in the config provided in the command files where this class is used.
 */
class XKCDCommand extends Command {
  // Uses args, id, message and client.
  /**
   * @param {Object} p Contains all information necessary to execute the command, such as args, id, message, and client.
   */
  execute(p = {}) {
    try {
      if (p.message.content.length > 1000) {
        p.message.channel.send(`You cannot try to trigger a command over this length!`);
        return;
      }
      const argToNumber = functions.misc.toNumber(p.args[0]);
      const argMessage = this.getArgMessage(argToNumber, p.args);
      const check = this.getCheck(p.id, p.message);
      const argIsNaN = isNaN(argToNumber);

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