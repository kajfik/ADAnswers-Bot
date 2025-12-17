import { Client, GatewayIntentBits, Partials } from "discord.js";
import { DataTypes, Model, Sequelize } from "sequelize";
import path from "node:path";
import interactionCreate from "./listeners/interactionCreate";
import messageCreate from "./listeners/messageCreate";
import clientReady from "./listeners/ready";

console.log("Starting bot...");

// 1) Crash-proofing: always attach these early
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    // GatewayIntentBits.GuildMembers, // ✅ remove unless you truly need it
    // GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.User,
    Partials.Reaction,
    // Partials.GuildMember // usually not needed unless you know you need it
  ],
});

client.on("error", (err) => {
  console.error("Discord client error:", err);
});
client.on("warn", (info) => {
  console.warn("Discord client warning:", info);
});

// 2) Use a Linux-safe SQLite path.
// Railway: if you have a Volume mounted, set SQLITE_DIR to that mount path.
// Otherwise it will store in the app's working directory (may not persist across deploys).
const SQLITE_DIR =
  process.env.SQLITE_DIR ||
  process.env.RAILWAY_VOLUME_MOUNT_PATH ||
  process.cwd();

const databaseCreator = (name: string) =>
  new Sequelize({
    dialect: "sqlite",
    storage: path.join(SQLITE_DIR, `${name}.sqlite`),
    logging: false,
    pool: {
      max: 1,
      min: 0,
      idle: 5000,
      acquire: 20000,
    },
    retry: {
      match: [/SQLITE_BUSY/, /SequelizeTimeoutError/],
      max: 5,
    },
  });

const commandUsageDatabase = databaseCreator("commandTags");
export class Command extends Model {
  declare name: string;
  declare timesUsed: number;
}
Command.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    timesUsed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize: commandUsageDatabase, modelName: "CommandUsage" }
);

const timeUsageDatabase = databaseCreator("timeTags");
export class Time extends Model {
  declare name: string;
  declare timesUsed: number;
}
Time.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    timesUsed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize: timeUsageDatabase, modelName: "TimeUsage" }
);

const personUsageDatabase = databaseCreator("userTags");
export class Person extends Model {
  declare name: string;
  declare timesUsed: number;
}
Person.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    timesUsed: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize: personUsageDatabase, modelName: "PersonUsage" }
);

// For jeopardy
const playerDatabase = databaseCreator("players");
export class Player extends Model {
  declare name: string;
  declare points: number;
}
Player.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    points: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize: playerDatabase, modelName: "PlayerUsage" }
);

export const databases = {
  commandUsage: commandUsageDatabase,
  personUsage: personUsageDatabase,
  timeUsage: timeUsageDatabase,
  players: playerDatabase,
};

export const tags = {
  commandUsage: Command,
  personUsage: Person,
  timeUsage: Time,
  player: Player,
};

clientReady(
  client,
  [commandUsageDatabase, personUsageDatabase, timeUsageDatabase, playerDatabase],
  [Command, Person, Time, Player]
);
interactionCreate(client);
messageCreate(client);

// 3) Do login last, and log failures instead of hard-crashing
client
  .login(process.env.DISCORD_TOKEN)
  .catch((err) => console.error("Failed to login:", err));