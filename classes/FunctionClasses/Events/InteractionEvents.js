"use strict";

const { Events } = require("./Events");
const { Help } = require("../Help");
const { Meta } = require("../../Meta");
const { Log } = require("../Log");
const Global = require("../../../utils/constants");
const config = require("../../../utils/config.json");

class InteractionEvents extends Events {
  get hasCommand() {
    const interaction = this.message;
    return Global.client.commands.has(interaction.commandName) || interaction.commandName === "help" || interaction.commandName === "meta";
  }

  get person() {
    return `${this.message.user.username}#${this.message.user.discriminator}`;
  }

  commandInGeneral() {
    const interaction = this.message;
    interaction.reply({ content: `hey buddy! can't use commands in general. nice try though. proud of u`, ephemeral: true });
  }

  error(error) {
    const interaction = this.message;
    const moreInfo = `From: ${this.person}
                              Attempted command: ${interaction.commandName}
                              Channel type: ${interaction.channel.type}
                              Time: ${Date()}
                              User ID: ${interaction.user.id}`;
    Log.info(moreInfo);
    Global.client.channels.cache.get(config.ids.testServerErrorLoggingChannel).send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    Global.client.users.cache.get(config.ids.earth).send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    Log.error(`[${Date()}] ${error}`);
    Global.lastErrorUserID = interaction.user.id;
  }

  async requestsTag() {
    await Global.incrementTag("totalRequests", "Tags");
  }

  async help() {
    const interaction = this.message;
    const args = interaction.options.getInteger("page") ? interaction.options.getInteger("page") : 1;
    if (args > Global.fieldsArray.length && args !== 69) {
      interaction.reply({ content: `I'm sorry, I don't know what page you're looking for.`, ephemeral: false });
      return;
    }
    new Help({
      page: args,
      message: interaction,
      id: interaction.channelId,
    }).send();
    await Global.incrementBigFourTags("help", this.person);
    Log.divider();
  }

  async meta() {
    const interaction = this.message;
    new Meta({
      page: 1,
      message: interaction,
      id: interaction.channelId,
    }).send();
    await Global.incrementBigFourTags("meta", this.person);
    Log.divider();
  }

  async execute() {
    const interaction = this.message;
    Global.client.commands.get(interaction.commandName).execute(interaction, interaction.channelId);
    await Global.incrementBigFourTags(interaction.commandName, this.person);
    Log.divider();
  }

  async run() {
    if (!this.message.isCommand()) return;
    if (!Global.client.application?.owner) await Global.client.application?.fetch();
    if (this.message.channelId === config.ids.AD.general && this.message.commandName !== "deadchat") {
      this.commandInGeneral();
      return;
    }

    if (this.hasCommand) await this.requestsTag();

    if (this.message.commandName === "help") {
      await this.help();
      return;
    }

    if (this.message.commandName === "meta") {
      await this.meta();
      return;
    }

    if (!this.hasCommand) return;

    try {
      await this.execute();
    } catch (error) {
      this.error(error);
    }
  }
}

module.exports = {
  InteractionEvents
};