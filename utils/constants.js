"use strict";

const Sequelize = require("sequelize");
const { Log } = require("../classes/FunctionClasses/Log");
const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  NOW: Date.now(),
  client: new Discord.Client({ 
    intents: [
      Discord.Intents.FLAGS.GUILDS, 
      Discord.Intents.FLAGS.GUILD_MESSAGES, 
      Discord.Intents.FLAGS.DIRECT_MESSAGES, 
      Discord.Intents.FLAGS.GUILD_INTEGRATIONS, 
      Discord.Intents.FLAGS.GUILD_MEMBERS
    ], 
    partials: [
      "MESSAGE", 
      "CHANNEL", 
      "USER", 
      "REACTION", 
      "GUILD_MEMBER"
    ] 
  }),
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
  sequelize: new Sequelize({
    dialect: "sqlite",
    storage: "../database.sqlite",
    logging: false,
  }),
  TimeTags: undefined,
  timeSequelize: new Sequelize({
    dialect: "sqlite",
    storage: "../timeTags.sqlite",
    logging: false,
  }),
  async authAndSyncDatabases() {
    try {
      await this.sequelize.authenticate();
      await this.timeSequelize.authenticate();
      Log.success("Database connection has been established successfully.");
    } catch (error) {
      Log.error(`Unable to connect to the database: ${error}`);
    }

    this.Tags.sync();
    this.TimeTags.sync();
  },
  commandNames: [],
  allCommands: [],
};