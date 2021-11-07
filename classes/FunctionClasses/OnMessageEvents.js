"use strict";

const Global = require("../../utils/constants");
const { ids } = require("../../utils/config.json");
const { Log } = require("../../classes/FunctionClasses/Log");

class OnMessageEvents {
  constructor(message, args) {
    this.message = message;
    this.args = args;
  }

  stickerDelete() {
    const message = this.message;
    message.delete()
      .then(() => {
        // Mod logs in antimatter dimensions
        const person = `${message.author.username}#${message.author.discriminator}`;
        Global.client.channels.cache.get(ids.AD.modLogs).send(`${person} sent a sticker in <#${message.channelId}>.`);
        Log.info(`[${Date()}] ${person} sent a sticker in <#${message.channelId}>.`);
      }).catch(error => {
        Log.error(`[${Date()}] ${error}`);
      });
  }

  mentioned() {
    const message = this.message;
    message.author.send("hey, you mentioned me! I'm here to help you! For more information about commands, check out `/help`! you can use me in DMs as well!");
  }

  helpers() {
    const message = this.message;
    const roleInfo = message.guild.roles.resolve(ids.helperRole);
    const namesAndIDs = roleInfo.members.map(member => `${member.user.username}#${member.user.discriminator} (${member.user.id}) [${member.roles.highest.name}]`);

    Log.info(namesAndIDs.join("\n"));
    message.reply(`Currently, ${roleInfo.members.size} person(s) have the Helper role.`);
    message.author.send(namesAndIDs.join("\n"));
  }

  async intercom() {
    let id;
    const message = this.message;
    const args = this.args;
    if (args[0].length === "213071245896450068".length) id = args[0];
    else id = Global.lastErrorUserID;
    const user = await Global.client.users.fetch(id);
    Global.lastErrorUserID = id;
    const person = `${user.username}#${user.discriminator}`;
    const sent = id === args[0] ? message.content.slice(`++intercom`.length + id.length + 2) : message.content.slice(`++intercom`.length);
    user.send(`${sent}\n**/-------------------------------------------------------------/**\n the above message was sent by earth#1337, the owner of the bot. this is a one way intercom.`).catch(error => {
      Log.error(`[${Date()}] ${error}`);
      message.reply(`Cannot send messages to ${person}.`);
    });
    Log.info(`Intercom message successfully sent to ${person}. Message: \n
    ${sent}`);
    message.reply(`Successfully sent message to ${person}.`);
  }
}

module.exports = { OnMessageEvents };