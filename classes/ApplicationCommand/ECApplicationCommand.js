"use strict";

const { TimeStudyApplicationCommand } = require("./TimeStudyApplicationCommand");
const { MessageActionRow, MessageButton } = require("discord.js");
const { Log } = require("../FunctionClasses/Log");

// eslint-disable-next-line max-len
const order = ["1x1", "2x1", "1x2", "3x1", "4x1", "5x1", "1x3", "3x2", "2x2", "6x1", "1x4", "3x3", "7x1", "4x2", "4x3", "6x2", "1x5", "5x2", "2x3", "3x4", "7x2", "5x3", "8x1", "3x5", "6x3", "2x4", "5x4", "7x3", "2x5", "5x5", "4x4", "6x4", "7x4", "8x2", "6x5", "4x5", "8x3", "9x1", "9x2", "8x4", "9x3", "9x4", "8x5", "9x5", "10x1", "7x5", "10x2", "10x3", "10x4", "10x5", "11x1", "11x2", "11x3", "11x4", "11x5", "12x1", "12x2", "12x3", "12x4", "12x5"];

class ECApplicationCommand extends TimeStudyApplicationCommand {
  execute(interaction) {
    const buttonRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setStyle("PRIMARY")
          .setLabel("Previous EC")
          .setCustomId(`button_previous`),
        new MessageButton()
          .setStyle("PRIMARY")
          .setLabel("Next EC")
          .setCustomId(`button_next`),
        new MessageButton()
          .setStyle("PRIMARY")
          .setLabel("Send tree for EC")
          .setCustomId(`button_dm`),
      );

    const filter = i => i.customId.startsWith("button");
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });
    const args = [this.getArgs(interaction).join("x")];
    const argMessage = this.getArgMessage(args);
    const argMessageWithDM = this.getArgMessage(args, true);
    let index = order.indexOf(args[0]);

    interaction.reply({ content: argMessage, ephemeral: true, components: [buttonRow] })
      .then(() => {
        collector.on("collect", async i => {
          if (i.customId === `button_previous`) {
            const prev = [order[index - 1]];
            index--;
            await i.update({ content: this.getArgMessage(prev), components: [buttonRow] });
          } else if (i.customId === `button_next`) {
            const next = [order[index + 1]];
            index++;
            await i.update({ content: this.getArgMessage(next), components: [buttonRow] });
          } else if (i.customId === `button_dm`) {
            interaction.followUp({ content: argMessageWithDM, ephemeral: true });
          }
        });
      }).catch(error => {
        Log.error(error);
        interaction.followUp({ content: "Something went wrong. Please try again." });
      });
  }
}

module.exports = { ECApplicationCommand };