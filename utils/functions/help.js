/* eslint-disable no-console */
"use strict";

const { MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
const { footerMessages } = require("../messages");
const { botCommandsCheck } = require("./checks");
const { toNumber, isUndefined } = require("./misc");
const { all } = require("../commands");

/**
 * Sums all commands for the help command
 * @param {Array} fields array
 * @returns {Number} the number of commands, based on the fieldsArray array that's passed in
 */
function sumAllCommands(fields) {
  let sum = 0;
  for (const array of fields) {
    sum += array.length;
  }
  return sum;
}

/**
 * The help description used in the help command
 * @param {Number} sum of all commands
 * @returns {String} the help description string
 */
function getHelpDescription() {
  // eslint-disable-next-line max-len
  return `A comprehensive list of all commands (and their arguments, when applicable).\nThere are currently ${all.length} commands.\n It is encouraged (by me, at least), to use the bot in DMs! This helps reduce spam from the bot and will still function as normal!`;
}

/**
 * The footer used in the help command
 * @param {String} version of the bot
 * @returns {String} the footer string for help
 */
function getFooter(ver) {
  return `This superfluous bot was created by @earth#1337. Bug him for more commands, or use "/meta suggest".\nUse /help [number] to go to more pages of commands.\nBot version: ${ver}\n${footerMessages.random()}`;
}
/**
 * Constructs an embed object for each help page
 * @param {Number} number help number specified by user
 * @param {Array} fieldsArray array of the fields specified in bot.js
 * @returns {Object} object containing all information about the embed
 */
function constructEmbedObject(number, fieldsArray) {
  if (number < fieldsArray.length || number === 69) {
    const hex = number === 69 ? "696969" : Math.round(number / fieldsArray.length * 255).toString(16).repeat(3);
    return {
      color: `#${hex}`,
      title: `Help (p${number}/${fieldsArray.length - 1})`,
      description: getHelpDescription(),
      fields: number === 69
        ? fieldsArray[fieldsArray.length - 1]
        : fieldsArray[number - 1],
      timestamp: new Date(),
      footer: {
        text: getFooter(config.version)
      }
    };
  }
  return {
    color: `#11aa22`,
    title: `Something is terribly wrong`,
    description: `Something has gone terribly wrong. This help page does not exist.`
  };
}

/**
 * Gets a MessageActionRow.
 * @param {Boolean} disabled - if true, the row will be disabled
 * @returns {MessageActionRow}
 */
const getRow = disabled => new MessageActionRow()
  .addComponents(
    new MessageButton()
      .setCustomId("primary-previous-page")
      .setEmoji("◀️")
    // .setLabel("Previous page")
      .setDisabled(disabled)
      .setStyle("PRIMARY"),
    new MessageButton()
      .setCustomId("primary-next-page")
      .setEmoji("▶️")
    // .setLabel("Next page")
      .setDisabled(disabled)
      .setStyle("PRIMARY"),
  );

/** 
 * Changes the page of an embed.
 * @param {Number} page - the current page of the embed.
 * @param {Boolean} up - if true, the page will be incremented.
 *@returns {Number} the new page of the embed.
 */ 
function pageChange(page, up) {
  let p = page;
  if (up) {
    if (p >= 69) {
      p = 1;
    } else if (p < 1 || p === 7) {
      p = 69;
    } else {
      if (p + 1 === 70) {
        p = 1;
      }
      p++;
    }
  } else if (!up) {
    if (p >= 69) {
      p = 7;
    } else if (p < 1) {
      p = 69;
    } else if (p - 1 === 0) {
      p = 69;
    } else p--;
  }
  return p;
}

/**
 * The actual help command that does stuff
 * @param {Object} message object that contains all information about the message
 * @param {Array} fieldsArray array of all fields specified in bot.js
 * @param {Object} stuff object with stuff such as ID, args, command
 * @returns sends the message, so it doesn't return anything
*/ 
function help(message, fieldsArray, stuff) {
  if (stuff.command === "help" && botCommandsCheck(stuff.id, message)) {
    let page = toNumber(stuff.args[0]);
    const filter = i => i.customId.startsWith("primary");

    // Works for 60 seconds.
    const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 });
    const row = getRow(false);

    if (Number.isNaN(page) || isUndefined(page) || page === null) {
      page = 1;
      message.reply({ embeds: [constructEmbedObject(1, fieldsArray)], components: [row], ephemeral: true }).then(() => {

        collector.on("collect", async i => {
          if (i.user.id !== message.user.id) return;
          try {
            if (i.customId === "primary-next-page") {
              page = pageChange(page, true);
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            } else if (i.customId === "primary-previous-page") {
              page = pageChange(page, false);
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            } else if (i.customId === "primary-first-page") {
              page = 1;
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            } else if (i.customId === "primary-last-page") {
              page = 69;
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            }
          } catch (error) {
            message.reply({ content: `Bot ran into an error idk how to fix itm error happens when two instances of help are active at once so basicall y just uhhhhhhh wait and it'll work later idk how to fix its wacky`, ephemeral: false });
            const moreInfo = `From: ${message.author.username}#${message.author.discriminator}
                             Content: ${message.content}
                             Attempted command: help
                             Channel type: ${message.channel.type}
                             Time: ${Date()}
                             URL: ${message.channel.type === "dm" ? "N/A" : `${message.url}`}`;
            console.log(moreInfo);
            stuff.client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
            stuff.client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
            message.channel.send(`ADAnswersBot has ran into an error, ${error}.`);
            console.log(error);
          }
        });
      });
      return;
    }
    try {
      message.reply({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row], ephemeral: true }).then(() => {

        collector.on("collect", async i => {
          if (i.user.id !== message.user.id) return;
          try {
            if (i.customId === "primary-next-page") {
              page = pageChange(page, true);
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            } else if (i.customId === "primary-previous-page") {
              page = pageChange(page, false);
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            } else if (i.customId === "primary-first-page") {
              page = 1;
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            } else if (i.customId === "primary-last-page") {
              page = 69;
              await i.update({ embeds: [constructEmbedObject(page, fieldsArray)], components: [row] });
            }
          } catch (error) {
            message.reply(`Bot ran into an error idk how to fix itm`);
            const moreInfo = `From: ${message.author.username}#${message.author.discriminator}
                             Content: ${message.content}
                             Attempted command: help
                             Channel type: ${message.channel.type}
                             Time: ${Date()}
                             URL: ${message.channel.type === "dm" ? "N/A" : `${message.url}`}`;
            console.log(moreInfo);
            stuff.client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
            stuff.client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
            message.channel.send(`ADAnswersBot has ran into an error, ${error}.`);
            console.log(error);
          }
        });
      });
    } catch (err) {
      message.channel.send("Unknown input");
      // eslint-disable-next-line no-console
      console.log(err);
    }
  } else if (stuff.command === "help" && !botCommandsCheck(stuff.id, message)) {
    message.reply({ content: "Please use <#351479640755404820> for `/help`.", ephemeral: false });
  }
}

module.exports = {
  help,
  pageChange,
  getRow,
  constructEmbedObject,
  sumAllCommands,
  getFooter,
  getHelpDescription,
};