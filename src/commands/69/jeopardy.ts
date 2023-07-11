import { ActionRowBuilder, ApplicationCommandType, AttachmentBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, MessageComponentInteraction, ModalBuilder, ModalSubmitInteraction, TextInputBuilder, TextInputStyle, User } from "discord.js";
import { Colour } from "../../utils/colours";
import { Command } from "../../command";
import { authorTitle, quantify } from "../../functions/Misc";
import { randomClue } from "../../utils/databases/clues";
import { tags } from "../../bot";

interface Clue {
  date: string,
  round: number,
  category: string,
  clue: string,
  answer: string,
  value: number
}

export const jeopardy: Command = {
  name: "jeopardy",
  description: "fetch a quick question from Jeopardy",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const clueInfo: Clue = randomClue();
    const category = clueInfo.category;
    const clue = clueInfo.clue;
    const answer = clueInfo.answer.toLowerCase();
    const date = clueInfo.date;
    const parsedRound = clueInfo.round === 1 ? "Jeopardy! Round" : "Double Jeopardy! Round";

    const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
    const picture = new AttachmentBuilder("src/images/misc/help.png");
    const expirationTimestamp = Math.floor((Date.now() + 60000) / 1000);
    const embed = new EmbedBuilder()
      .setThumbnail("attachment://help.png")
      .setTitle(`${parsedRound} from ${date}`)
      .setColor(Colour.v)
      .setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
      .addFields({ name: "Category", value: category })
      .addFields({ name: "Clue", value: clue })
      .addFields({ name: "Value", value: `Worth ${quantify("point", clueInfo.value)}` });

    const answerButton = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId(`jeopardy_answer_button_${expirationTimestamp}`)
          .setLabel("Input your answer...")
          .setStyle(ButtonStyle.Success)
      );

    const modal = new ModalBuilder()
      .setCustomId(`jeopardy_answer_modal_${expirationTimestamp}`)
      .setTitle("Your answer...");

    const answerInput = new TextInputBuilder()
      .setCustomId(`jeopardy_answer_input_${expirationTimestamp}`)
      .setLabel(`What is...`)
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder<TextInputBuilder>().addComponents(answerInput));

    // These filters need fairly verbose conditions, in order to not have the interactions overlap when running multiple collectors.
    const filter = (i: MessageComponentInteraction) => i.customId.endsWith(String(expirationTimestamp));
    const modalFilter = (i: ModalSubmitInteraction) => i.customId.endsWith(String(expirationTimestamp)) && i.isModalSubmit();
    const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });

    console.log(answer);

    await interaction.reply({ embeds: [embed], files: [picture], components: [answerButton], ephemeral: true }).then(() => {
      collector?.once("collect", async i => {
        if (i.isButton()) {
          i.showModal(modal);
          const submission = await i.awaitModalSubmit({ time: 60000, filter: modalFilter });
          const response = submission.fields.getTextInputValue(`jeopardy_answer_input_${expirationTimestamp}`).toLowerCase();
          if (response.trim() === answer.trim()) {
            const name = interaction.user.id;
            const tag = await tags.player.findOrCreate({ where: { name } });
            if (tag) tag[0].increment("points", { by: clueInfo.value });
            console.log(tag[0]);
            await submission.reply({ content: "Correct!", ephemeral: true });
          } else {
            await submission.reply({ content: `Darn, so close! Correct answer: what is \`${answer}\` (\`${response}\` was your answer)`, ephemeral: true });
          }
        }
      });
    });
  }
};

