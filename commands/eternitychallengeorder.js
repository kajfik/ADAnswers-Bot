/* eslint-disable max-len */
"use strict";

const order = "1x1, 2x1, 1x2, 3x1, 4x1, 5x1, 1x3, 3x2, 2x2, 6x1, 1x4, 3x3, 7x1, 4x2, 4x3, 6x2, 1x5, 5x2, 2x3, 3x4, 7x2, 5x3, 8x1, 3x5, 6x3, 2x4, 5x4, 7x3, 2x5, 5x5, 4x4, 6x4, 7x4, 8x2, 6x5, 4x5, 8x3, 9x1, 9x2, 8x4, 9x3, 9x4, 8x5, 9x5, 10x1, 7x5, 10x2, 10x3, 10x4, 10x5, 11x1, 11x2, 11x3, 11x4, 11x5, 12x1, 12x2, 12x3, 12x4, 12x5";

const functions = require("../functions");

module.exports = {
  number: 4,
  name: "eternitychallengeorder",
  description: "Args: highest eternity challenge you've down in the order (optional).Returns the EC order",
  execute(message, args, id) {
    if (functions.ecsCheck(id, message)) {
      if (args.length === 0) message.channel.send(order);
      else if (!order.includes(args[0])) message.channel.send(`Unkown argument ${args[0]} for command \`++eternitychallengeorder\`.`);
      // eslint-disable-next-line no-negated-condition
      else if (args !== []) {
        const boldedOrder = order.replace(`${args[0]}`, `__***${args[0]}***__`);
        message.channel.send(boldedOrder);
      } else message.channel.send(`This message should be impossible. If you get it, send a screenshot to earth with the message that caused it.`);
    } else {
      message.channel.send("This command only works in bot commands, common channels, or EC channels!");
    }
  }
};