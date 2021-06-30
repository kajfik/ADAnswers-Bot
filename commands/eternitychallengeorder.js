/* eslint-disable no-console */
/* eslint-disable max-len */
"use strict";

const order = "1x1, 2x1, 1x2, 3x1, 4x1, 5x1, 1x3, 3x2, 2x2, 6x1, 1x4, 3x3, 7x1, 4x2, 4x3, 6x2, 1x5, 5x2, 2x3, 3x4, 7x2, 5x3, 8x1, 3x5, 6x3, 2x4, 5x4, 7x3, 2x5, 5x5, 4x4, 6x4, 7x4, 8x2, 6x5, 4x5, 8x3, 9x1, 9x2, 8x4, 9x3, 9x4, 8x5, 9x5, 10x1, 7x5, 10x2, 10x3, 10x4, 10x5, 11x1, 11x2, 11x3, 11x4, 11x5, 12x1, 12x2, 12x3, 12x4, 12x5";
const orderInArray = ["1x1", "2x1", "1x2", "3x1", "4x1", "5x1", "1x3", "3x2", "2x2", "6x1", "1x4", "3x3", "7x1", "4x2", "4x3", "6x2", "1x5", "5x2", "2x3", "3x4", "7x2", "5x3", "8x1", "3x5", "6x3", "2x4", "5x4", "7x3", "2x5", "5x5", "4x4", "6x4", "7x4", "8x2", "6x5", "4x5", "8x3", "9x1", "9x2", "8x4", "9x3", "9x4", "8x5", "9x5", "10x1", "7x5", "10x2", "10x3", "10x4", "10x5", "11x1", "11x2", "11x3", "11x4", "11x5", "12x1", "12x2", "12x3", "12x4", "12x5"];

const { classes } = require("../command");

function otherCompletions(id, completion) {
  if (id < 1 || id > 12) {
    return `Invalid challenge id: ${id}`;
  }
    
  if (completion < 1 || completion > 5) {
    return `Invalid challenge completion: ${completion}`;
  }

  const completionText = `${id}x${completion}`;
  const indexOfCompletion = orderInArray.indexOf(completionText);

  if (indexOfCompletion === -1) {
    return `Challenge ${completionText} completion not found.`;
  }

  if (indexOfCompletion === 0) {
    return `No other challenge completions required.`;
  }

  const completions = Array(12);

  for (let i = 0; i < indexOfCompletion; i++) {
    const previous = orderInArray[i].split("x").map(Number);
    const previousId = previous[0] - 1;
    const previousCompletion = previous[1];

    completions[previousId] = previousCompletion;
  }

  return completions.filter(Number).map((value, index) => `${index + 1}x${value}`).join(", ");
}

module.exports = {
  command: new classes.com({
    number: 3,
    name: "eternitychallengeorder",
    description: "Has a shorthand: `++eco`. Args: highest eternity challenge you've down in the order (optional). Returns the EC order. Will show the previous EC as well when provided a specified challenge.",
    check: "ecsCheck",
    acceptableArgs: orderInArray,
    sent: [`${order}`],
    getArgMessage(arg) {
      const sentArr = [];
      const ec = arg.split("x");
      const ecothers = otherCompletions(ec[0], ec[1]);
      for (let i = orderInArray.indexOf(arg) - 1; i < orderInArray.length; i++) {
        sentArr.push(orderInArray[i]);
      }
      sentArr[sentArr.indexOf(arg)] = `__***${arg}***__`;
      return `Order: ${sentArr.join(", ")}
      Other completions you need: \`${ecothers}\`
      For more information on beating this challenge, use the command \`++ec ${ec[0]}x${ec[1]}\``;
    }
  })
};
