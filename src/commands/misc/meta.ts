import { BaseCommandInteraction, EmbedFieldData, InteractionReplyOptions, MessageActionRow, MessageButton, MessageComponentInteraction, MessageEmbed } from "discord.js";
import { dhmsFromMS, getTimezoneFromDate } from "../../functions/time";
import { isHelper, link } from "../../functions/Misc";
import { Command } from "../../command";
import { Commands } from "../../commands";
import { TagInfo } from "../../utils/types";
import config from "../../config.json";
import { getTagInfo } from "../../functions/database";
const NOW = Date();
const metaFields = (interaction: BaseCommandInteraction, tagInfo: TagInfo): { [key: number]: Array<EmbedFieldData> } => ({
  1: [
    {
      name: "Bot version",
      value: `${config.version}`,
      inline: true
    },
    {
      name: "Last restart",
      value: `<t:${Date.parse(NOW) / 1000}> (uptime: ${dhmsFromMS(interaction.client.uptime as number).clock})`,
      inline: true,
    },
    {
      name: "Status",
      value: `Running normally...\nPing: ${interaction.client.ws.ping}ms`,
      inline: true
    },
    {
      name: "Suggest",
      value: `Submit an issue on ${link("GitHub", "https://github.com/earthernsence/ADAnswers-Bot/issues")} to suggest more commands, or to report a bug with the bot!`,
      inline: true
    },
    {
      name: "Invite",
      value: `If, for whatever reason, you wish to invite me to your server, go to ${link("this link", "https://discord.com/oauth2/authorize?client_id=830197123378053172&permissions=2147560512&scope=applications.commands%20bot")}.`,
      inline: true
    },
    {
      name: "Contributing",
      // eslint-disable-next-line max-len
      value: `If you are interested in contributing to the bot, check out both information files at ${link("this readme", "https://github.com/earthernsence/ADAnswers-Bot#readme")} and ${link("this readme", "https://github.com/earthernsence/ADAnswers-Bot/tree/main/commands#readme")}. Both are slightly outdated.`,
      inline: true
    }
  ],
  2: [
    {
      name: "Total amount of commands",
      value: `${Commands.length}`,
      inline: true
    },
    {
      name: "Total requests/successes",
      value: `Requests: ${tagInfo.requests}\nSuccesses: ${tagInfo.successes}`,
      inline: true
    },
    {
      name: "Top 5 commands",
      value: `${tagInfo.top5commands}`,
      inline: true
    },
    {
      name: "Top 5 users",
      value: `${tagInfo.top5users}`,
      inline: true,
    },
    {
      name: "Top 5 hours",
      value: `${tagInfo.top5hours}`,
      inline: true
    },
    {
      name: "All data",
      // eslint-disable-next-line max-len
      value: `If you want to see all data for the bot, go to ${link("SQLite Viewer", "https://inloop.github.io/sqlite-viewer/")} and put in [this file](https://github.com/earthernsence/ADAnswers-Bot/blob/main/database.sqlite) for command usage data or [this file](https://github.com/earthernsence/ADAnswers-Bot/blob/main/timeTags.sqlite) for data on when commands are used (${getTimezoneFromDate(new Date())}) from the bot's repository.`,
      inline: true,
    }
  ]
});

// Sorry
// eslint-disable-next-line max-params
const embed = (currentPage: number, interaction: BaseCommandInteraction, disabled: boolean, expirationTimestamp: number, tagInfo: TagInfo) => new MessageEmbed()
  .setTitle(`Meta (p${currentPage}/2)`)
  .setDescription(`Internal bot information.\nExpire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`)
  .addFields(metaFields(interaction, tagInfo)[currentPage])
  .setFooter({ text: `This superfluous bot was created by @earth#1337\nBot version: ${config.version}`, iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` })
  .setColor("BLURPLE")
  .setTimestamp();

const getNextPage = (currentPage: number, up: boolean) => {
  const possiblePages: number[] = [1, 2];
  let index: number = possiblePages.indexOf(currentPage);

  if (up) index++;
  else index--;

  index = (index + possiblePages.length) % possiblePages.length;

  return possiblePages[index];
};

export const meta: Command = {
  name: "meta",
  description: "information about the bot",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
    let currentPage = 1;
    const personRequested = `${interaction.user.username}#${interaction.user.discriminator}`;
    const tagInfo = await getTagInfo();

    const buttons = (disabled: boolean) => new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("button_prev")
          .setEmoji("◀️")
          .setStyle("PRIMARY")
          .setDisabled(disabled),
        new MessageButton()
          .setCustomId("button_next")
          .setEmoji("▶️")
          .setStyle("PRIMARY")
          .setDisabled(disabled),
      );
    const buttons2 = (disabled: boolean, person: string) => new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setLabel("GitHub repository")
          .setURL("https://github.com/earthernsence/ADAnswers-Bot"),
        new MessageButton()
          .setStyle("SECONDARY")
          .setDisabled(true)
          .setLabel(disabled ? `Time expired` : `Requested by ${person}.`)
          .setCustomId("secondary-info-button")
      );


    // eslint-disable-next-line max-len
    const content: InteractionReplyOptions = {
      embeds: [embed(currentPage, interaction, false, expirationTimestamp, tagInfo)],
      ephemeral: !isHelper(interaction),
      components: [buttons(false), buttons2(false, personRequested)]
    };

    const filter = (i: MessageComponentInteraction) => i.customId.startsWith("button");
    const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });

    await interaction.reply(content).then(() => {
      collector?.on("collect", async i => {
        if (i.isButton()) {
          const up = i.customId.startsWith("button_next");
          const page = getNextPage(currentPage, up);
          currentPage = page;
          await i.update({
            embeds: [embed(currentPage, interaction, false, expirationTimestamp, tagInfo)],
            components: [buttons(false), buttons2(false, personRequested)]
          });
        }
      });
      collector?.on("end", async() => {
        await interaction.reply({
          embeds: [embed(currentPage, interaction, true, expirationTimestamp, tagInfo)],
          components: [buttons(true), buttons2(true, personRequested)]
        });
      });
    }).catch(e => console.log(e));
  }
};