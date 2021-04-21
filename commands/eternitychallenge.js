/* eslint-disable max-len */
"use strict";

const order = ["1x1", "2x1", "1x2", "3x1", "4x1", "5x1", "1x3", "3x2", "2x2", "6x1", "1x4", "3x3", "7x1", "4x2", "4x3", "6x2", "1x5", "5x2", "2x3", "3x4", "7x2", "5x3", "8x1", "3x5", "6x3", "2x4", "5x4", "7x3", "2x5", "5x5", "4x4", "6x4", "7x4", "8x2", "6x5", "4x5", "8x3", "9x1", "9x2", "8x4", "9x3", "9x4", "8x5", "9x5", "10x1", "7x5", "10x2", "10x3", "10x4", "10x5", "11x1", "11x2", "11x3", "11x4", "11x5", "12x1", "12x2", "12x3", "12x4", "12x5"];

function otherCompletions(id, completion) {
  if (id < 1 || id > 12) {
    return `Invalid challenge id: ${id}`;
  }
    
  if (completion < 1 || completion > 5) {
    return `Invalid challenge completion: ${completion}`;
  }

  const completionText = `${id}x${completion}`;
  const indexOfCompletion = order.indexOf(completionText);

  if (indexOfCompletion === -1) {
    return `Challenge ${completionText} completion not found.`;
  }

  if (indexOfCompletion === 0) {
    return `No other challenge completions required.`;
  }

  const completions = Array(12);

  for (let i = 0; i < indexOfCompletion; i++) {
    const previousId = parseInt(order[i][0], 10) - 1;
    const previousCompletion = parseInt(order[i][2], 10);

    completions[previousId] = previousCompletion;
  }

  return completions.filter(Number).map((value, index) => `${index + 1}x${value}`).join(", ");
}

const revampedECs = [
  // EC1
  {
    challenge: 1,
    completion: 1,
    tt: 130,
    ip: `\`1e1800\``,
    note: null,
    tree: "`11,22,32,42,51,61,72,82,92,102,111,121,131,141,151,161,171|1`"
  },
  {
    challenge: 1,
    completion: 2,
    tt: 140,
    ip: `\`1e2000\``,
    note: "`Get 60,000 Eternities before trying.`",
    tree: "`11,21,22,32,42,51,61,72,82,92,102,111,121,131,141,151,161,162,171|1`",
  },
  {
    challenge: 1,
    completion: 3,
    tt: 147,
    ip: `\`1e2200\``,
    note: null,
    tree: "`11,21,22,32,33,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|1`",
  },
  {
    challenge: 1,
    completion: 4,
    tt: 163,
    ip: `\`1e2400\``,
    note: null,
    tree: "`11,21,22,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|1`"
  },
  {
    challenge: 1,
    completion: 5,
    tt: 176,
    ip: `\`1e2600\``,
    note: null,
    tree: "`11,21,22,32,33,41,42,51,61,62,72,82,92,102,111,121,131,141,151,161,162,171|1`"
  },
  // EC2
  {
    challenge: 2,
    completion: 1,
    tt: 135,
    ip: `\`1e975\``,
    note: null,
    tree: "`11,22,32,42,51,61,73,83,93,103,111,121,131,141,151,161,171|2`",
  },
  {
    challenge: 2,
    completion: 2,
    tt: 157,
    ip: "`1e1150`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
  },
  {
    challenge: 2,
    completion: 3,
    tt: 182,
    ip: "`1e1325`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
  },
  {
    challenge: 2,
    completion: 4,
    tt: 208,
    ip: "`1e1500`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
  },
  {
    challenge: 2,
    completion: 5,
    tt: 240,
    ip: "`1e1675`",
    note: null,
    tree: "`11,21,22,31,32,33,41,42,51,61,73,83,93,103,111,121,131,141,151,161,162,171|2`",
  },
  // EC3
  {
    challenge: 3,
    completion: 1,
    tt: 140,
    ip: "`1e600`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: `11,22,32,42,51,61,71,81,91,101,111,122,132,142,151,161,162,171|3`
  },
  {
    challenge: 3,
    completion: 2,
    tt: 155,
    ip: "`1e600`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,71,81,91,101,111,122,132,142,151,161,162,171|3`"
  },
  {
    challenge: 3,
    completion: 3,
    tt: 165,
    ip: "`1e600`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,122,132,142,151,161,162,171|3`"
  },
  {
    challenge: 3,
    completion: 4,
    tt: 182,
    ip: "`1e600`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,122,132,142,151,161,162,171|3`"
  },
  {
    challenge: 3,
    completion: 5,
    tt: 208,
    ip: "`1e600`",
    note: "`To unlock the challenge, use TD, and then switch to the tree.`",
    tree: "`11,21,22,31,32,33,41,42,51,61,72,82,92,102,111,122,132,142,151,161,162,171|3`"
  },
  // EC4
  {
    challenge: 4,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 4,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 4,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 4,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 4,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC5
  {
    challenge: 5,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 5,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 5,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 5,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 5,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC6
  {
    challenge: 6,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 6,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 6,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 6,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 6,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC7
  {
    challenge: 7,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 7,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 7,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 7,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 7,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC8
  {
    challenge: 8,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 8,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 8,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 8,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 8,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC9
  {
    challenge: 9,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 9,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 9,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 9,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 9,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC10
  {
    challenge: 10,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 10,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 10,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 10,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 10,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC11
  {
    challenge: 11,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 11,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 11,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 11,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 11,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  // EC12
  {
    challenge: 12,
    completion: 1,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 12,
    completion: 2,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 12,
    completion: 3,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 12,
    completion: 4,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
  {
    challenge: 12,
    completion: 5,
    tt: 1,
    ip: 1,
    note: "`string`",
    tree: "`string`"
  },
];

module.exports = {
  number: 4,
  name: "eternitychallenge",
  description: "Requires two arguments: `++eternitychallenge [ECNumber] [CompletionNumber]`. You may notice that some trees increase the number of TT you need, even though it's the same tree as the previous. This follows the Eternity Challenge guide followed by Ninjatsu, and TT can be used as something of a progress marker. For that reason, some trees have more TT than others for the same tree. Returns Total TT for a tree and then the tree.",
  execute(message, args) {
    let a = [];
    let c = 0;
    let d = 0;
    if (args[0].includes("x")) {
      a = args[0].split("x");
      c = Math.abs(Math.floor(a[0]));
      d = Math.abs(Math.floor(a[1]));
    } else {
      c = Math.abs(Math.floor(args[0]));
      d = Math.abs(Math.floor(args[1]));
    }

    if (Number.isNaN(c) || Number.isNaN(d)) message.channel.send("Something went wrong while parsing your input.");

    if (c > 12) {
      message.channel.send(`EC${c} is not an EC, silly!`);
      return;
    }
    if (d > 5) {
      message.channel.send(`You cannot complete an EC ${d} times, silly! If you are looking for a tree to use if you want to test something in an EC, use the x5 tree.`);
      return;
    }
    if (c === 0 || d === 0) {
      message.channel.send(`You cannot do EC${c} ${d} times, silly!`);
      return;
    }
    
    const ec = revampedECs[(c - 1) * 5 + (d - 1)];
    
    if (c <= 12 && d <= 5) message.channel.send(`The tree for EC${c}x${d} is: ${ec.tree}
    TT for Completion: \`${ec.tt}\`
    IP Requirement for Completion: \`${ec.ip}\` ${ec.note === null ? `` : `\n    Note: \`${ec.note}\``}
    Other completions: \`${otherCompletions(c, d)}\``);
  }
};