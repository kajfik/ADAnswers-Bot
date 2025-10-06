import { ActionRowBuilder, ApplicationCommandOptionType, ApplicationCommandType, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, ComponentType, InteractionReplyOptions, MessageComponentInteraction, User } from "discord.js";
import { EternityChallengeEmbeds, EternityChallengeImages, shownFields } from "../../functions/ecs";
import { authorTitle, isHelper } from "../../functions/Misc";
import { findEC, order } from "../../utils/databases/eternitychallenges";
import { Command } from "../../command";

const getNextPage = (currentPage: string, up: boolean) => {
  let newPage = up ? order[order.indexOf(currentPage) + 1] : order[order.indexOf(currentPage) - 1];

  if (newPage === undefined) {
    if (up) newPage = order[0];
    else newPage = order[order.length - 1];
  }

  return newPage;
};

export const ec: Command = {
  name: "ec",
  description: "usage: /ec [challenge] [completion]. follow onscreen prompts",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "ec",
      description: "What Eternity Challenge are you doing?",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 12,
    },
    {
      name: "completion",
      description: "What completion do you want to see?",
      type: ApplicationCommandOptionType.Integer,
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 5,
    },
    {
      name: "hide",
      description: "ONLY AFFECTS ANYTHING IF YOU'RE A HELPER! Defaults to false.",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
    {
      name: "info",
      description: "(Optional) What information about the challenge do you want to see?",
      type: ApplicationCommandOptionType.String,
      required: false,
      choices: [
        { name: "unlock", value: "unlock" },
        { name: "challenge", value: "challenge" },
        { name: "goal", value: "goal" },
        { name: "strategy", value: "strategy" },
        { name: "tree", value: "tree" },
        { name: "reward", value: "reward" },
      ]
    },
    {
      name: "target",
      description: "(Optional) Which user would you like to show the information to?",
      required: false,
      type: ApplicationCommandOptionType.User,
    }
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const eternityChallengeRequested: number = interaction.options.getInteger("ec") as number;
    const completion: number = interaction.options.getInteger("completion") as number;
    let hide: boolean = interaction.options.getBoolean("hide") as boolean;
    const info: string = interaction.options.getString("info") as string;
    const target: User | null = interaction.options.getUser("target", false);

    if (!isHelper(interaction)) hide = true;

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
    const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);

    let chall = findEC(eternityChallengeRequested, completion);

    if (info === "tree") {
      await interaction.reply({ content: `${target ? `*Suggested for <@${target.id}>:*\n` : ""}${chall.tree}`, ephemeral: hide });
      return;
    }

    let picture = EternityChallengeImages[chall.challenge];
    const embed = (disabled: boolean) => EternityChallengeEmbeds[`${chall.challenge}x${chall.completion}`]
      .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
      .setDescription(`Expire${disabled ? "d" : "s"} <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`)
      .setFields(shownFields(chall, info ?? ""))
      .setTimestamp();

    let currentEC = `${chall.challenge}x${chall.completion}`;

    const buttons = (disabled: boolean) => new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
        // In order to prevent people using the same command at the same time influencing others,
        // we add a special value to each of the button ids so that there's no conflicts
          .setCustomId(`ec_button_prev_${expirationTimestamp}`)
          .setEmoji("◀️")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled),
        new ButtonBuilder()
          .setCustomId(`ec_button_next_${expirationTimestamp}`)
          .setEmoji("▶️")
          .setStyle(ButtonStyle.Primary)
          .setDisabled(disabled),
      );

    const content: InteractionReplyOptions = {
      content: target ? `*Suggested for <@${target.id}>*:\n` : undefined,
      embeds: [embed(false)],
      files: [picture],
      ephemeral: hide,
      components: [buttons(false)]
    };

    // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
    const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
    const collector = interaction.channel?.createMessageComponentCollector({ componentType: ComponentType.Button, filter, time: 60000 });

    await interaction.reply(content).then(() => {
      collector?.on("collect", async i => {
        if (i.isButton()) {
          const up = i.customId.startsWith("ec_button_next");
          const page = getNextPage(currentEC, up);

          if (i.member?.user.id !== user.id) return;

          // Change various varying variables
          currentEC = page;
          chall = findEC(Number(currentEC.split("x")[0]), Number(currentEC.split("x")[1]));
          picture = EternityChallengeImages[chall.challenge];

          // Update initial message
          await i.update({
            files: [picture],
            embeds: [embed(false)],
            components: [buttons(false)],
          });
        }
      });

      collector?.on("end", async() => {
        await interaction.editReply({
          embeds: [embed(true)],
          components: [buttons(true)],
          files: [picture]
        });
      });
    }).catch(e => console.log(e));
  }
};