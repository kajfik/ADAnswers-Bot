// Import { ActionRowBuilder,
//   ApplicationCommandType,
//   AttachmentBuilder,
//   ButtonBuilder,
//   ButtonStyle,
//   ChatInputCommandInteraction,
//   EmbedBuilder,
//   MessageComponentInteraction,
//   ModalBuilder,
//   ModalSubmitInteraction,
//   TextInputBuilder,
//   TextInputStyle,
//   User } from "discord.js";
// import { authorTitle, quantify } from "../../functions/Misc";
// import { Colour } from "../../utils/colours";
// import { Command } from "../../command";
// import { randomClue } from "../../utils/databases/clues";
// import { tags } from "../../bot";

import { ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { Command } from "../../command";

// Interface Clue {
//   date: string,
//   round: number,
//   category: string,
//   clue: string,
//   answer: string,
//   value: number
// }

export const jeopardy: Command = {
  name: "jeopardy",
  description: "fetch a quick question from Jeopardy",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    await interaction.reply({ content: "Sorry, this command is currently unavailable due to some API issues.", flags: MessageFlags.Ephemeral });

    //     Const clueInfo: Clue = randomClue();
    //     const category = clueInfo.category;
    //     const clue = clueInfo.clue;
    //     const answer = clueInfo.answer.toLowerCase();
    //     const date = clueInfo.date;
    //     const parsedRound = clueInfo.round === 1 ? "Jeopardy! Round" : "Double Jeopardy! Round";

    //     const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
    //     const picture = new AttachmentBuilder("src/images/misc/help.png");
    //     const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
    //     const embed = new EmbedBuilder()
    //       .setThumbnail("attachment://help.png")
    //       .setTitle(`${parsedRound} from ${date}`)
    //       .setDescription(`Expires <t:${expirationTimestamp}:R> at <t:${expirationTimestamp}:T>`)
    //       .setColor(Colour.v)
    //       .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
    //       .addFields({ name: "Category", value: category })
    //       .addFields({ name: "Clue", value: clue })
    //       .addFields({ name: "Value", value: `Worth ${quantify("point", clueInfo.value)}` });

    //     const answerButton = new ActionRowBuilder<ButtonBuilder>()
    //       .addComponents(
    //         new ButtonBuilder()
    //           .setCustomId(`jeopardy_answer_button_${expirationTimestamp}`)
    //           .setLabel("Input your answer...")
    //           .setStyle(ButtonStyle.Success)
    //       );

    //     const modal = new ModalBuilder()
    //       .setCustomId(`jeopardy_answer_modal_${expirationTimestamp}`)
    //       .setTitle("Your answer...");

    //     const answerInput = new TextInputBuilder()
    //       .setCustomId(`jeopardy_answer_input_${expirationTimestamp}`)
    //       .setLabel(`What is...`)
    //       .setStyle(TextInputStyle.Short)
    //       .setRequired(true);

    //     modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(answerInput));

    //     // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
    //     const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
    //     const modalFilter = (i: ModalSubmitInteraction) => i.customId.endsWith(String(expirationTimestamp)) && i.isModalSubmit();
    //     const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });

    //     console.log(answer);

    //     await interaction.reply({ embeds: [embed], files: [picture], components: [answerButton], flags: MessageFlags.Ephemeral }).then(() => {
    //       collector?.once("collect", async i => {
    //         if (i.user.id !== interaction.user.id) return;
    //         if (i.isButton()) {
    //           i.showModal(modal);
    //           const submission = await i.awaitModalSubmit({ time: 60000, filter: modalFilter }).catch(err => {
    //             console.log(err);
    //             interaction.followUp({ content: `Ooh, sorry. Out of time. Answer: what is \`${answer}\``, flags: MessageFlags.Ephemeral });
    //           });
    //           if (submission === undefined) return;
    //           await submission.deferReply({ flags: MessageFlags.Ephemeral });
    //           const response = submission.fields.getTextInputValue(`jeopardy_answer_input_${expirationTimestamp}`).toLowerCase();
    //           const name = interaction.user.id;
    //           const tag = await tags.player.findOrCreate({ where: { name } });

    //           if (response.trim() === answer.trim()) {
    //             if (tag) await tag[0].increment("points", { by: clueInfo.value });
    //             await submission.editReply({ content: `Correct! You gained ${clueInfo.value} points and now have a total of ${tag[0].dataValues.points + clueInfo.value} points.` });
    //           } else {
    //             if (tag) await tag[0].decrement("points", { by: clueInfo.value });
    //             await submission.editReply({
    //               content: `Darn, so close! Correct answer: what is \`${answer}\` (\`${response}\` was your answer). You lost ${clueInfo.value} points and now have a total of ${tag[0].dataValues.points - clueInfo.value} points.
    // If, for some reason, your answer was correct but marked incorrect, there's not a lot I can do about that. J-Archive, where I get the data, often has formatting issues or other artefacts I have no control over. My apologies!` });
    //           }
    //         }
    //       });
    //     });
  }
};

