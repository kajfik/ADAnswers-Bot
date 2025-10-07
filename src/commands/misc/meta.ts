import { ActionRowBuilder, ApplicationCommandType, ButtonBuilder, ButtonStyle, Colors, ChatInputCommandInteraction, EmbedBuilder, EmbedField, InteractionReplyOptions, MessageComponentInteraction, User, MessageFlags } from "discord.js";
import { authorTitle, isHelper, link } from "../../functions/Misc";
import { dhmsFromMS, getTimezoneFromDate } from "../../functions/time";
import { getTagInfo, parsePlayersList, parseTimeList, parseUsersList } from "../../functions/database";
import { Command } from "../../command";
import { Commands } from "../../commands";
import { TagInfo } from "../../utils/types";
import config from "../../config.json";

const NOW = Date();
const metaFields = (interaction: ChatInputCommandInteraction, tagInfo: TagInfo): { [key: number]: Array<EmbedField> } => ({
  1: [
    {
      name: "Bot version",
      value: `${config.version}`,
      inline: true
    },
    {
      name: "Last restart",
      value: `<t:${Date.parse(NOW) / 1000}> (uptime: ${dhmsFromMS(interaction.client.uptime as number, false).clock})`,
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
      value: `${parseUsersList(tagInfo.top5users, interaction)}`,
      inline: true,
    },
    {
      name: "Top 5 hours",
      value: `${parseTimeList(tagInfo.top5hours)}`,
      inline: true
    },
    {
      name: "Top 5 players (`/jeopardy`)",
      value: `${parsePlayersList(tagInfo.top5players, interaction)}`,
      inline: true,
    },
    {
      name: "All data",
      // eslint-disable-next-line max-len
      value: `If you want to see all data for the bot, go to ${link("SQLite Viewer", "https://inloop.github.io/sqlite-viewer/")} and put in [this file](https://github.com/earthernsence/ADAnswers-Bot/blob/main/database.sqlite) for command usage data or [this file](https://github.com/earthernsence/ADAnswers-Bot/blob/main/timeTags.sqlite) for data on when commands are used (${getTimezoneFromDate(new Date())}) from the bot's repository.`,
      inline: true,
    },
    {
      name: "Why is this data inaccurate?",
      value: `On June 22, 2023, I was forced to change how the database worked on my end due to Discord's new username system. Thus, this information is correct as of that date.
      See ${link("this post", "https://discord.com/channels/351476683016241162/351476683016241166/1121644631675899934")} for more information.`,
      inline: true
    }
  ]
});

// Sorry
// eslint-disable-next-line max-params
const embed = (currentPage: number, interaction: ChatInputCommandInteraction, disabled: boolean, expirationTimestamp: number, tagInfo: TagInfo) => new EmbedBuilder()
  .setTitle(`Meta (p${currentPage}/2)`)
  .setDescription(`Internal bot information.\nExpire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`)
  .addFields(metaFields(interaction, tagInfo)[currentPage])
  .setFooter({ text: `This superfluous bot was created by @earth1337_\nBot version: ${config.version}`, iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` })
  .setColor(Colors.Blurple)
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
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
    let currentPage = 1;
    const personRequested = authorTitle(interaction);
    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
    const tagInfo = await getTagInfo();

    const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`meta_button_prev_${expirationTimestamp}`)
          .setEmoji("◀️")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled),
        new ButtonBuilder()
          .setCustomId(`meta_button_next_${expirationTimestamp}`)
          .setEmoji("▶️")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled),
      );
    const buttons2 = (disabled: boolean, person: string) => new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setLabel("GitHub repository")
          .setURL("https://github.com/earthernsence/ADAnswers-Bot"),
        new ButtonBuilder()
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
          .setLabel(disabled ? `Time expired` : `Requested by ${person}.`)
          .setCustomId("secondary-info-button"),
      );


    // eslint-disable-next-line max-len
    const content: InteractionReplyOptions = {
      embeds: [embed(currentPage, interaction, false, expirationTimestamp, tagInfo).setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })],
      ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }),
      components: [buttons(false), buttons2(false, personRequested)]
    };

    // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
    const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
    const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });

    await interaction.reply(content).then(() => {
      collector?.on("collect", async i => {
        if (i.isButton()) {
          const up = i.customId.startsWith("meta_button_next");
          const page = getNextPage(currentPage, up);
          currentPage = page;
          await i.update({
            embeds: [embed(currentPage, interaction, false, expirationTimestamp, tagInfo).setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })],
            components: [buttons(false), buttons2(false, personRequested)]
          });
        }
      });
      collector?.on("end", async() => {
        await interaction.editReply({
          embeds: [embed(currentPage, interaction, true, expirationTimestamp, tagInfo).setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })],
          components: [buttons(true), buttons2(true, personRequested)]
        });
      });
    }).catch(e => console.log(e));
  }
};