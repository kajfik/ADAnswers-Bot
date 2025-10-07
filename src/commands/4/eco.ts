import { ApplicationCommandOptionType, ApplicationCommandType, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { order, orderAsString } from "../../utils/databases/eternitychallenges";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";
import { otherCompletions } from "../../functions/ecs";

export const eco: Command = {
  name: "eco",
  description: "Args: highest eternity challenge you've down in the order (optional). Returns the EC order.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "challenge",
      description: "What Eternity Challenge are you doing?",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 12,
    },
    {
      name: "completion",
      description: "What completion do you want to see?",
      required: false,
      type: ApplicationCommandOptionType.Integer,
      // eslint-disable-next-line camelcase
      min_value: 1,
      // eslint-disable-next-line camelcase
      max_value: 5,
    }
  ],
  run: async(interaction: ChatInputCommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    const challenge: number = interaction.options.getInteger("challenge") as number;
    const completion: number = interaction.options.getInteger("completion") as number;

    if (!challenge && !completion) {
      await interaction.reply({ content: `${orderAsString}`, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
      return;
    }

    if ((challenge && !completion) || (!challenge && completion)) {
      await interaction.reply({ content: "If you are going to specify one, you must specify the other.", ephemeral: true });
      return;
    }

    const sentArray: string[] = [];
    const others: string = otherCompletions(challenge, completion);
    const index: number = order.indexOf(`${challenge}x${completion}`);

    for (let i = index - 1; i < order.length; i++) {
      if (!order[i]) continue;
      sentArray.push(order[i]);
    }

    sentArray[sentArray.indexOf(`${challenge}x${completion}`)] = `__***${challenge}x${completion}***__`;

    await interaction.reply({ content: `Order: ${sentArray.filter(value => value).join(", ")}
    Other completions you need: \`${others}\`
    For more information on beating this challenge, use the command \`/ec ${challenge} ${completion}\``, ...(isHelper(interaction) ? {} : { flags: MessageFlags.Ephemeral }), });
  }
};