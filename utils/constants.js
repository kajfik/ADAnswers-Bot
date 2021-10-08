/* eslint-disable no-console */
"use strict";

const { Log } = require("../classes/FunctionClasses/Log");
const fs = require("fs");
const Sequelize = require("sequelize");
const { Time } = require("../classes/FunctionClasses/Time");
const commands = require("../utils/commands");
const config = require("../utils/config.json");

module.exports = {
  lastErrorUserID: "",
  NOW: Date.now(),
  client: null,
  commandFiles: fs.readdirSync("C:/Users/User/Documents/GitHub/ADAnswers-Bot/commands").filter(file => file.endsWith(".js")),
  fields: {
    fieldsVar: [],
    fieldsVar2: [],
    fieldsVar3: [],
    fieldsVar4: [],
    fieldsVar5: [],
    fieldsVar6: [],
    fieldsVar7: [],
    fieldsVar8: [],
    fieldsVar69: [],
  },
  get fieldsArray() {
    return [
      this.fields.fieldsVar,
      this.fields.fieldsVar2,
      this.fields.fieldsVar3,
      this.fields.fieldsVar4,
      this.fields.fieldsVar5,
      this.fields.fieldsVar6,
      this.fields.fieldsVar7,
      this.fields.fieldsVar8,
      this.fields.fieldsVar69,
    ];
  },
  Tags: undefined,
  sequelize: undefined,
  TimeTags: undefined,
  timeSequelize: undefined,
  UserTags: undefined,
  userSequelize: undefined,
  async authAndSyncDatabases() {
    try {
      await this.sequelize.authenticate();
      await this.timeSequelize.authenticate();
      await this.userSequelize.authenticate();
      Log.success("Database connection has been established successfully.");
    } catch (error) {
      Log.error(`Unable to connect to the database: ${error}`);
    }

    this.Tags.sync();
    this.TimeTags.sync();
    this.UserTags.sync();
    Log.success("Database synced successfully.");
  },
  commandNames: [],
  allCommands: [],
  async incrementTag(name, databaseName) {
    let tag;
    if (databaseName === "Tags") tag = await this.Tags.findOne({ where: { name } });
    else if (databaseName === "TimeTags") tag = await this.TimeTags.findOne({ where: { hour: name } });
    else if (databaseName === "UserTags") tag = await this.UserTags.findOne({ where: { name } });
    if (tag) {
      tag.increment("timesUsed");
      Log.basic(`[${Date()}] Tag ${name} incremented successfully. New value: ${tag.timesUsed}`);
    }
  },
  async createTags(startingValue) {
    if (startingValue > this.commandNames.length) return;
    try {
      for (let i = startingValue; i < this.commandNames.length; i++) {
        const tag = await this.Tags.create({
          name: this.commandNames[i],
          timesUsed: 0
        });
        Log.success(`Created tag ${tag.name}`);
      }
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        this.createTags(startingValue + 1);
      } else Log.error(`Something went wrong while adding tag, ${e}`);
    }
  },
  async incrementPersonTag(name) {
    const tag = await this.UserTags.findOne({ where: { name } });
    if (tag) await this.incrementTag(name, "UserTags");
    else {
      this.UserTags.create({
        name,
        timesUsed: 1
      });
      Log.success(`Created tag ${name}`);
    }
  },
  setup() {
    let iteration = 0;
    let jiteration = 0;
    for (const file of this.commandFiles) {
      const command = require(`../commands/${file}`);
      iteration++;
      Log.loading(`Loading command ${iteration}/${this.commandFiles.length}`);
      this.client.commands.set(command.command.name, command.command);
    }
    Log.success(`\n\n\nSetting commands complete. Beginning sorting...\n\n\n`);
    this.client.commands.forEach(element => {
      // Some commands have type: "shorthand" to make it not appear in the help embeds. This just works lol 
      // If you're adding a shorthand, please make sure to put that in.
      const e = element;
      this.commandNames.push(e.name);
      this.allCommands.push({ name: e.name, value: e.description, type: e.type, check: e.check, acceptableArgs: e.acceptableArgs, page: e.number });
      if (e.type === undefined) {
        jiteration++;
        Log.loading(`Sorting command ${jiteration}/${this.client.commands.size - 8}`);
        // eslint-disable-next-line max-len
        if (e.number > 0 && e.number < this.fieldsArray.length) this.fieldsArray[e.number - 1].push({ name: e.name, value: e.description });
        // eslint-disable-next-line max-len
        else if (e.number === 69) this.fieldsArray[this.fieldsArray.length - 1].push({ name: e.name, value: e.description });
        else Log.error(e);
      }
    });
  },
  async ready(docs) {
    const NOW = Date.now();
    this.setup();
    Log.success(`Setting and sorting commands took ${Date.now() - NOW}ms.`);

    await this.createTags(0);

    await this.authAndSyncDatabases();

    Log.important(`\n\nGood morning. The current date and time is ${Date()}.\n\n`);

    if (docs) docs();
  },
  docs() {
    console.log(this.allCommands);
    const allFields = [];
    for (const field of this.fieldsArray) {
      allFields.push(...field);
    }
    console.log(allFields);
  },
  setTags() {
    this.Tags = this.sequelize.define("tags", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      timesUsed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
    this.TimeTags = this.timeSequelize.define("timeTags", {
      hour: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      },
      timesUsed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
    this.UserTags = this.userSequelize.define("userTags", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      timesUsed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },
  async incrementBigFourTags(commandName, person) {
    await this.incrementTag("totalSuccesses", "Tags"); 
    await this.incrementTag(commandName, "Tags");
    await this.incrementTag(Time.newDate().getHours(), "TimeTags");
    await this.incrementPersonTag(person);
  },
  async deploy() {
    await this.client.application?.commands.set(commands.all);
    await this.client.guilds.cache.get(config.ids.testServer)?.commands.set(commands.all);
  },
  stickerDelete(message) {
    if (message.stickers.size > 0) message.delete()
      .then(() => {
        // Mod logs in antimatter dimensions
        const person = `${message.author.username}#${message.author.discriminator}`;
        this.client.channels.cache.get(config.ids.AD.modLogs).send(`${person} sent a sticker in <#${message.channelId}>.`);
        Log.info(`[${Date()}] ${person} sent a sticker in <#${message.channelId}>.`);
      }).catch(error => {
        Log.error(`[${Date()}] ${error}`);
      });
  }
};