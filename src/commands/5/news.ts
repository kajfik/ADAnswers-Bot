import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";

export const news: Command = {
  name: "news",
  description: "Args: `listmobile`, `listweb`, `info`. Explains what the news ticker is and where it came from",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "What information about news do you want to see?",
      required: true,
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: "listmobile", value: "listmobile" },
        { name: "listweb", value: "listweb" },
        { name: "info", value: "info" }
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    let content: string;
    const info = interaction.options.getString("info");

    switch (info) {
      case "listmobile":
        content = `${link("List of mobile news messages in the game Antimatter Dimensions (from Wikipedia)", "https://gist.github.com/earthernsence/2661619a3e4ca8089709f9fe19395f77")}`;
        break;
      case "listweb":
        content = `${link("List of web news messages in the game Antimatter Dimensions (from Wikipedia)", "https://github.com/IvarK/IvarK.github.io/blob/master/javascripts/core/newsticker.js")}`;
        break;
      case "info":
        // eslint-disable-next-line max-len
        content = `The news ticker is an art form. Back in the day Antimatter Dimensions used to have a channel called news ticker suggestions, where people would suggest news messages as they saw fit. However, due to the horrible quality of these suggestions, the channel was shut down. However, the legacy of the channel still lives on in game, and you can read all of the messages as they come across the top. They were all community submitted or snuck in by the developers. For a list of them for mobile, use \`/news listmobile\`. For a list of them for web, use \`/news listweb\`.`;
        break;
      default:
        content = "Unknown news arg";
        break;
    }

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};