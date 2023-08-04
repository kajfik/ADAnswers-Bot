import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";

export const importexport: Command = {
  name: "importexport",
  description: "explains how to transfer save from web to android and vice versa",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `
android -> web/steam:
Click "Export to web", open ${link("paste.ee", "https://paste.ee")}, submit new paste, open the paste link on pc, copy the save string (not the URL), press "Import" in the web version. 

~~web/steam -> android:~~
~~Press "Export", open ${link("paste.ee", "https://paste.ee")}, submit new paste, open the paste link on your device, copy the save, press "Import" in the app.~~ 
(As of the release of the Reality update on web/steam, you cannot go from web/steam -> android. Sorry for the inconvenience!) 

(alternatively you can use google docs instead of ${link("paste.ee", "https://paste.ee")})

When you use the "Export to web" option and send the save to your pc using some messaging service like messenger/whatsapp the save may be cut in half because of a character limit of those services.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};