/* eslint-disable no-console */
"use strict";

const { MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../utils/config.json");
const { footerMessages } = require("../../utils/messages");
const { Log } = require("./Log");
const Global = require("../../utils/constants");

Array.prototype.last = function() {
  return this[this.length - 1];
};

class Help {
  constructor(info) {
    this.page = info.page;
    this.fieldsArray = Global.fieldsArray;
    this.message = info.message;
    this.id = info.id;
    this.client = Global.client;
    this.rows = [
      new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("primary-previous-page")
            .setEmoji("◀️")
            .setStyle("PRIMARY"),
          new MessageButton()
            .setCustomId("primary-next-page")
            .setEmoji("▶️")
            .setStyle("PRIMARY"),
        ),
      new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle("LINK")
            .setLabel("See all commands")
            .setURL("https://earthernsence.github.io/ADAnswers-Bot/docs/"),
        )
    ];
  }

  getHelpDescription() {
    return `A comprehensive list of all commands (and their arguments, when applicable).\n It is encouraged (by me, at least), to use the bot in DMs! This helps reduce spam from the bot and will still function as normal!`;
  }

  getFooter() {
    return `This superfluous bot was created by @earth#1337. Use "/meta"!\nUse /help [number] to go to more pages of commands.\nBot version: ${config.version}\n${footerMessages.next(false)}`;
  }

  embedObject() {
    if (this.page < this.fieldsArray.length || this.page === 69) {
      const hex = this.page === 69 ? "696969" : Math.round(this.page / this.fieldsArray.length * 255).toString(16).repeat(3);
      return {
        color: `#${hex}`,
        title: `Help (p${this.page}/${this.fieldsArray.length - 1})`,
        description: this.getHelpDescription(),
        fields: this.page === 69
          ? this.fieldsArray.last()
          : this.fieldsArray[this.page - 1],
        timestamp: new Date(),
        footer: {
          text: this.getFooter()
        }
      };
    }
    return {
      color: `#11aa22`,
      title: `Something is terribly wrong`,
      description: `Something has gone terribly wrong. This help page does not exist.`
    };
  }

  pageChange(page, up) {
    let p = page;
    if (up) {
      if (p >= 69) {
        p = 1;
      } else if (p < 1 || p === 8) {
        p = 69;
      } else {
        if (p + 1 === 70) {
          p = 1;
        }
        p++;
      }
    } else if (!up) {
      if (p >= 69) {
        p = 8;
      } else if (p < 1) {
        p = 69;
      } else if (p - 1 === 0) {
        p = 69;
      } else p--;
    }
    return p;
  }

  actualMessage() {
    return { embeds: [this.embedObject(this.page, this.fieldsArray)], components: this.rows, ephemeral: true };
  }

  send() {
    const filter = i => i.customId.startsWith("primary");
    // Works for 60 seconds.
    const collector = this.message.channel.createMessageComponentCollector({ filter, time: 60000 });
    this.message.reply(this.actualMessage()).then(() => {

      collector.on("collect", async i => {
        if (i.user.id !== this.message.user.id) return;
        try {
          if (i.customId === "primary-next-page") {
            this.page = this.pageChange(this.page, true);
            await i.update(this.actualMessage());
          } else if (i.customId === "primary-previous-page") {
            this.page = this.pageChange(this.page, false);
            await i.update(this.actualMessage());
          } else if (i.customId === "primary-first-page") {
            this.page = 1;
            await i.update(this.actualMessage());
          } else if (i.customId === "primary-last-page") {
            this.page = 69;
            await i.update(this.actualMessage());
          }
        } catch (error) {
          console.log(this.message);
          this.message.reply(`Bot ran into an error idk how to fix itm`);
          const moreInfo = `From: ${this.message.user.username}#${this.message.user.discriminator}
                             Content: ${this.message.content}
                             Attempted command: help
                             Channel type: ${this.message.channel.type}
                             Time: ${Date()}
                             URL: ${this.message.channel.type === "DM" ? "N/A" : `${this.message.url}`}`;
          Log.info(moreInfo);
          this.client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
          this.client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
          message.channel.send(`ADAnswersBot has ran into an error, ${error}.`);
          Log.error(error);
        }
      });
    });
  }
}

module.exports = { Help };