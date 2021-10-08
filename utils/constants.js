"use strict";

const { Log } = require("../classes/FunctionClasses/Log");
const fs = require("fs");

module.exports = {
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
  }
};