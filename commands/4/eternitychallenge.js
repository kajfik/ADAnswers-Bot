/* eslint-disable max-len */
"use strict";

const ECs = require("../../utils/ecs");

// This is for if/when I can make the buttons not cause the stupid "unknown interaction" error.
// Like yeah right, unknown interaction my ass, it's just discord.js being an idiot.
// const { ECApplicationCommand } = require("../classes/ApplicationCommand/ECApplicationCommand");
const { TimeStudyApplicationCommand } = require("../../classes/ApplicationCommand/TimeStudyApplicationCommand");

module.exports = {
  command: new TimeStudyApplicationCommand({

    name: "eternitychallenge",
    description: "Has a shorthand: `/ec`. Requires one argument: `/eternitychallenge [ECNumber]x[CompletionNumber]`. You may notice that some trees increase the number of TT you need, even though it's the same tree as the previous. This follows the Eternity Challenge guide followed by Ninjatsu, and TT can be used as something of a progress marker. For that reason, some trees have more TT than others for the same tree. Returns Total TT for a tree and then the tree.",
    check: "ecsCheck",
    acceptableArgs: ECs.order.concat(ECs.orderWithMultSigns),
    sent: undefined,
    getArgMessage(args, tree) {
      if (!this.acceptableArgs.includes(args[0])) return `That is not an Eternity Challenge!`;
      let splitArgs;
      if (args[0].includes("x")) splitArgs = args[0].split("x");
      if (args[0].includes("×")) splitArgs = args[0].split("×");
      const challengeID = Math.floor(Math.abs(splitArgs[0]));
      const completion = Math.floor(Math.abs(splitArgs[1]));
      const ec = ECs.EternityChallenges[(challengeID - 1) * 5 + (completion - 1)];

      if (tree) return `${ec.tree}`;
      return `The tree for EC${challengeID}x${completion} is: ${ec.tree}
      TT for Completion: \`${ec.tt}\`
      IP Requirement for Completion: \`${ec.ip}\` ${ec.note === null ? `` : `\n    Note: \`${ec.note}\``}
      Other completions: \`${ECs.otherCompletions(challengeID, completion)}\``;
    },
    argInfo: {
      ec: { key: "ec", type: "number" },
      completion: { key: "completion", type: "number" },
    },
    epehemral: true
  })
};

