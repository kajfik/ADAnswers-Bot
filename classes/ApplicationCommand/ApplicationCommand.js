/* eslint-disable no-console */
/* eslint-disable no-negated-condition */
"use strict";

const { Command } = require("../Command");
const { Message } = require("../FunctionClasses/Message");
const { Checks } = require("../FunctionClasses/Checks");
const { ids } = require("../../utils/config.json");
const { Log } = require("../FunctionClasses/Log");
const hr = ids.helperRole;

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

  static isEligibleForHelperRole(interaction) {
    const r = interaction.member._roles;
    const eligibleRoles = ids.rolesGreaterThanOrEqualToInfinityDimension;
    for (const role in eligibleRoles) {
      if (r.includes(eligibleRoles[role])) return true;
    }
    return false;
  }

  hasHelperRole(interaction) {
    if (interaction.channel.type === "DM" || interaction.guildId !== ids.AD.serverID) return false;
    // Hellbach wanted special treatment for some reason. That's what this additional ID is for.
    return interaction.member._roles.includes(hr) || interaction.member._roles.includes("893900249964359761");
  }

  /**
   * Executes the command. Handles commands with and without args.
   * @param {Object} interaction - Contains the information useful for executing the command.
   * @param {String} id - ID of the channel the message was sent in.
   */
  execute(interaction, id) {
    if (!this.getCheck(id, interaction) && this.acceptableArgs !== undefined) {
      interaction.reply({ content: this.getFailMessage([this.getArgs(interaction)]), ephemeral: true });
      return;
    } 
    if (!this.getCheck(id, interaction) && this.acceptableArgs === undefined) {
      interaction.reply({ content: this.getArglessFailMessage(), ephemeral: true });
      return;
    }
    if (this.acceptableArgs === undefined) {
      if (this.getCheck(id, interaction)) this.send(interaction, this.sent[0]);
      else interaction.reply({ content: this.getFailMessage(), ephemeral: true });
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
    Log.info(moreInfo);
    interaction.client.channels.cache.get("722912387287744572").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    interaction.client.users.cache.get("213071245896450068").send(`ADAnswersBot has ran into an error, ${error}. ${moreInfo}`);
    interaction.reply({ content: `There was an error while executing command ${interaction.commandName}.`, ephemeral: false });
    interaction.followUp(`ADAnswersBot has ran into an error, ${error}.`);
    Log.error(error);
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
    return Checks.getCheck(this.check, id, interaction);
  }

  /**
   * Sends the message.
   * @param {Object} interaction - Contains the information useful for executing the command.
   * @param {String} sent - The message being sent to the user.
   */
  send(interaction, sent) {
    interaction.reply({ content: sent, ephemeral: !this.hasHelperRole(interaction) });
    // eslint-disable-next-line max-len
    if (!this.hasHelperRole(interaction) && interaction.channel.type !== "DM" && interaction.serverId === ids.AD.serverID) interaction.followUp({ content: "If you wish to be able to help other players using the bot, you will need the `Helper` role. To get it, go to bot commands and type `/helper`.", ephemeral: true });
  }

  /**
   * @inheritdoc
   */
  doMissingArgCatch(interaction, args) {
    if (args[0] === undefined) {
      const sent = new Message("missingArg", { name: this.name, acceptableArgs }).getMessage();
      this.send(interaction, sent);
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
    else if (!(args[0] === undefined)) this.send(interaction, new Message("error", { args, name: this.name, acceptableArgs: this.acceptableArgs }).getMessage());
    else this.send(interaction, new Message("shouldNeverAppear").getMessage());
  }
}

module.exports = { ApplicationCommand };