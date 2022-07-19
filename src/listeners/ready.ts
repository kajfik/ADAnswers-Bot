import { ActivityType, Client } from "discord.js";
import { Model, ModelStatic, Sequelize } from "sequelize";
import { Commands } from "../commands";
import { PresenceMessage } from "../functions/presence";
import { ids } from "../config.json";

export default (client: Client, databases: Sequelize[], tagsArray: ModelStatic<Model>[]): void => {
  client.on("ready", async() => {
    if (!client.user || !client.application) {
      console.log("Missing user or application. Restart the bot.");
      return;
    }

    for (const database of databases) {
      await database.authenticate();
    }

    for (const tag of tagsArray) {
      tag.sync();
      console.log(`Synced ${tag.name}`);
    }

    await client.application.commands.set(Commands);
    console.log("Commands globally deployed.");
    await client.guilds.cache.get(ids.testServer)?.commands.set(Commands);
    console.log("Commands deployed to test server.");

    function setBotStatus(): void {
      const next = PresenceMessage.next();
      client.user?.setActivity(next, { type: ActivityType.Listening });
    }

    setInterval(setBotStatus, 15000);

    console.log(`${client.user.username} is online`);
  });
};