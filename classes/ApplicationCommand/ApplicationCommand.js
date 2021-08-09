/* eslint-disable no-console */
/* eslint-disable no-negated-condition */
"use strict";

const { Command } = require("../Command");

const functions = require("../../utils/functions/functions");

/** 
 * @class ApplicationCommand
 * @extends {Command}
 * @classdesc Class that does slash command execution. Extends {@link Command} class.
 */
class ApplicationCommand extends Command {
  /**
   * Creates the command and assigns all the information to this
   * @param {Object} config Contains all the information about the command being passed in. Contains name, number, description, check, acceptable args, sent message, type of command (for shorthands), and the method to get messages with args
   */
  constructor(config) {
    super(config);
    if (this.acceptableArgs !== undefined) {
      this.argKey = config.argInfo.key;
      this.argType = config.argInfo.type;
      if (this.name !== "ep") this.messageObject = config.messageObject;
    }
  }

  /**
   * Executes the command. Handles commands with and without args.
   * @param {Object} interaction - Contains the information useful for executing the command.
   * @param {String} id - ID of the channel the message was sent in.
   */
  execute(interaction, id) {
    if (this.acceptableArgs === undefined) {
      if (this.getCheck(id, interaction)) interaction.reply({ content: this.sent[0], ephemeral: false });
      else interaction.reply({ content: this.getFailMessage(), ephemeral: false });
    } else if (this.acceptableArgs !== undefined) {
      this.regularCommand(interaction, [this.getArgs(interaction)], id);
    }
  }

  /**
   * Throws an error.
   * @param {Object} interaction - Contains the information useful for throwing an error, like username, discriminator, etc.
   * @param {String} error - The error message to be thrown.
   */
  error(interaction, error) {
    const moreInfo = `From: ${interaction.users.username}#${interaction.user.discriminator}
                             Attempted command: ${interaction.commandName}
                             Channel type: ${interaction.channel.type}
                             Time: ${Date()}
                             URL: ${interaction.channel.type === "DM" ? "N/A" : `${message.url}`}
                             Args: ${this.argKey ? this.getArgs(interaction) : `N/A`}`;
    console.log(moreInfo);
    interaction.client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    interaction.client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    interaction.reply({ content: `There was an error while executing command ${interaction.commandName}.`, ephemeral: false });
    interaction.followUp(`ADAnswersBot has ran into an error, ${error}.`);
    console.log(error);
  }

  /**
   * Gets the args for a command based on interaction.options
   * @param {Object} interaction - Contains the information useful for executing the command.
   * @returns {String|Number} The args for the command.
   */
  getArgs(interaction) {
    if (this.argType === "string") return interaction.options.getString(this.argKey);
    if (this.argType === "number") return interaction.options.getNumber(this.argKey);

    return `Unknown argType/argKey. Type: ${this.argType}, key: ${this.argKey}`;
  }

  /**
   * Gets the check based on id and interaction. Also this.check
   * @param {String} id - ID of the channel the message was sent in.
   * @param {Object} interaction - Contains the information useful for finding the channel type.
   * @returns {Boolean} The check for the command.
   */
  getCheck(id, interaction) {
    if (typeof functions.checkObject[this.check] === "function") return functions.checkObject[this.check](id, interaction);
    if (typeof functions.checkObject[this.check] === "boolean") return functions.checkObject[this.check];
    throw new Error("Invalid check type");
  }

  /**
   * Sends the message.
   * @param {Object} interaction - Contains the information useful for executing the command.
   * @param {String} sent - The message being sent to the user.
   */
  send(interaction, sent) {
    interaction.reply({ content: sent, ephemeral: false });
  }

  /**
   * @inheritdoc
   */
  doMissingArgCatch(interaction, args) {
    if (args[0] === undefined) {
      this.send(interaction, functions.getMessage("missingArg", { name: this.name, acceptableArgs: this.acceptableArgs }));
    }
  }

  /**
   * Handles command execution and has error messages
   * @param {Object} interaction - Contains the information useful for executing the command.
   * @param {Array} args - The args for the command.
   * @param {String} id - ID of the channel the message was sent in.
   */
  regularCommand(interaction, args, id) {
    if (args[0] === undefined) {
      this.doMissingArgCatch(interaction, args);
      return;
    }
    const sent = this.getArgMessage(args[0].toLowerCase());
    if (this.getCheck(id, interaction) && this.acceptableArgs.includes(args[0].toLowerCase())) this.send(interaction, sent);
    else if (!(args[0] === undefined)) this.send(interaction, functions.getMessage("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }));
    else this.send(interaction, functions.getMessage("shouldNeverAppear"));
  }
}

module.exports = { ApplicationCommand };