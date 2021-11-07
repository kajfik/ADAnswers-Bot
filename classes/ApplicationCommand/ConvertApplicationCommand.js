"use strict";

const { fairConversions } = require("../FunctionClasses/Conversions");
const { Misc } = require("../FunctionClasses/Misc");
const { ApplicationCommand }  = require("../ApplicationCommand/ApplicationCommand");

class ConvertApplicationCommand extends ApplicationCommand {
  execute(interaction) {
    const args = this.getArgs(interaction);
    this.conversion = `${args[0]}To${Misc.capitalise(args[1])}`;
    const realValue = Math.abs(args[2]);
    if (fairConversions.has(this.conversion)) {
      this.conversionFunction = fairConversions.get(this.conversion);
    } else {
      interaction.reply(`${this.conversion} is not a valid conversion.`);
      return;
    }
    interaction.reply(`${realValue} ${Misc.capitalise(args[0])} is ${this.conversionFunction(realValue)} ${Misc.capitalise(args[1])}`);
  }

  getArgs(interaction) {
    const args = [];
    args.push(interaction.options.getString("currentUnit"));
    args.push(interaction.options.getString("newUnit"));
    args.push(interaction.options.getNumber("value"));
    return args;
  }
}

module.exports = { ConvertApplicationCommand };