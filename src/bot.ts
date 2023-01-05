import { Client, GatewayIntentBits, Partials } from "discord.js";
import { DataTypes, Sequelize } from "sequelize";
import interactionCreate from "./listeners/interactionCreate";
import messageCreate from "./listeners/messageCreate";
import ready from "./listeners/ready";
import { token } from "./config.json";

console.log("Starting bot...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.User,
    Partials.Reaction,
    Partials.GuildMember
  ]
});

client.login(token);

// Yes these are the direct links to the databases on my computer, cry about it, etc, lol, kekw
const commandUsageDatabase = new Sequelize({
  dialect: "sqlite",
  storage: "C:\\Users\\User\\Documents\\GitHub\\ADAnswers-Bot\\database.sqlite",
  logging: false
});

const commandUsageTags = commandUsageDatabase.define("tags", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  timesUsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

const timeUsageDatabase = new Sequelize({
  dialect: "sqlite",
  storage: "C:\\Users\\User\\Documents\\GitHub\\ADAnswers-Bot\\timeTags.sqlite",
  logging: false
});

const timeUsageTags = timeUsageDatabase.define("timeTags", {
  hour: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  timesUsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

const personUsageDatabase = new Sequelize("userTags", "", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "C:\\Users\\User\\Documents\\GitHub\\ADAnswers-Bot\\userTags.sqlite",
  logging: false
});

const personUsageTags = personUsageDatabase.define("userTags", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  timesUsed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
});

export const databases = {
  commandUsage: commandUsageDatabase,
  personUsage: personUsageDatabase,
  timeUsage: timeUsageDatabase
};
export const tags = {
  commandUsage: commandUsageTags,
  personUsage: personUsageTags,
  timeUsage: timeUsageTags
};

ready(client, [commandUsageDatabase, personUsageDatabase, timeUsageDatabase], [commandUsageTags, personUsageTags, timeUsageTags]);
interactionCreate(client);
messageCreate(client);