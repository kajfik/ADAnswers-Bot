import { Client, GatewayIntentBits, Partials } from "discord.js";
import { DataTypes, Model, Sequelize } from "sequelize";
import interactionCreate from "./listeners/interactionCreate";
import messageCreate from "./listeners/messageCreate";
import clientReady from "./listeners/ready";

console.log("Starting bot...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.User,
    Partials.Reaction,
    Partials.GuildMember
  ]
});

client.login(process.env.DISCORD_TOKEN);

const databaseCreator = (link: string) => new Sequelize({
  dialect: "sqlite",
  storage: `C:\\Users\\User\\Documents\\GitHub\\ADAnswers-Bot\\${link}.sqlite`,
  logging: false
});

const commandUsageDatabase = databaseCreator("commandTags");

export class Command extends Model {
  declare name: string;
  declare timesUsed: number;
}

Command.init({
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
},
{
  sequelize: commandUsageDatabase,
  modelName: "CommandUsage"
});

const timeUsageDatabase = databaseCreator("timeTags");

export class Time extends Model {
  declare name: string;
  declare timesUsed: number;
}

Time.init({
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
},
{
  sequelize: timeUsageDatabase,
  modelName: "TimeUsage"
});

const personUsageDatabase = databaseCreator("userTags");

export class Person extends Model {
  declare name: string;
  declare timesUsed: number;
}

Person.init({
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
},
{
  sequelize: personUsageDatabase,
  modelName: "PersonUsage"
});

// For jeopardy

const playerDatabase = databaseCreator("players");
export class Player extends Model {
  declare name: string;
  declare points: number;
}

Player.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
},
{
  sequelize: playerDatabase,
  modelName: "PlayerUsage"
});

export const databases = {
  commandUsage: commandUsageDatabase,
  personUsage: personUsageDatabase,
  timeUsage: timeUsageDatabase,
  players: playerDatabase
};
export const tags = {
  commandUsage: Command,
  personUsage: Person,
  timeUsage: Time,
  player: Player
};

clientReady(client, [commandUsageDatabase, personUsageDatabase, timeUsageDatabase, playerDatabase], [Command, Person, Time, Player]);
interactionCreate(client);
messageCreate(client);