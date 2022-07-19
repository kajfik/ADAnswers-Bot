import { Client, CommandInteraction, Interaction, InteractionType } from "discord.js";
import { incrementBigFourTags, incrementTag } from "../functions/database";
import { Commands } from "../commands";
import { InteractionEvents } from "../classes/events/InteractionEvents";
import { ids } from "../config.json";
import { isHelper } from "../functions/Misc";
import { tags } from "../bot";

export default (client: Client): void => {
  client.on("interactionCreate", async(interaction: Interaction) => {
    try {
      if (interaction.type === InteractionType.ApplicationCommand) {
        await handleSlashCommand(client, interaction);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

const handleSlashCommand = async(client: Client, interaction: CommandInteraction): Promise<void> => {
  if (!client.application?.owner) await client.application?.fetch();

  if (interaction.channelId === ids.AD.general && interaction.commandName !== "deadchat" && !isHelper(interaction)) {
    InteractionEvents.commandInGeneral(interaction);
    return;
  }

  if (await InteractionEvents.hasCommand(interaction, client)) await incrementTag("totalRequests", tags.commandUsage, false);

  const command = Commands.find(c => c.name === interaction.commandName);

  // Help and meta are actually called as normal commands now, so we no longer need to have special
  // cases for them.

  if (!command) {
    interaction.followUp({ content: `Command ${interaction.commandName} not found` });
    return;
  }

  try {
    await command.run(interaction, client);
    await incrementBigFourTags(interaction.commandName, `${interaction.user.username}#${interaction.user.discriminator}`);
  } catch (error) {
    console.log(error);
    interaction.reply({ content: `Error running command ${interaction.commandName}` });
  }
};