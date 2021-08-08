/* eslint-disable no-console */
/* eslint-disable no-negated-condition */
/* eslint-disable complexity */
/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../classes/ApplicationCommand/TimeStudyApplicationCommand");
const functions = require("../utils/functions/functions");

module.exports = {
  command: new TimeStudyApplicationCommand({
    number: 3,
    name: "studytree",
    description: `Has a shorthand: \`++ts\`. Generates a Time Study tree based on your total Time Theorems.
  Args: your total Time Theorems. Beginning at 54 TT, the command will take a second argument: \`active\`, \`passive\`, or \`idle\`. The argument is optional, and the default value is \`active\`.`,
    check: "studyTreeCheck",
    // Any number is only there to appear in the missing arg thing correctlyt
    acceptableArgs: [["Any number"], ["active", "passive", "idle"]],
    sent: undefined,
    getArgMessage(args) {
      let theorem = 0;
      let path = "active";
      // First arg
      if (!isNaN(functions.misc.toNumber(args[0]))) theorem = args[0];
      else return "Theorem amount provided is not a number";
      // Second arg
      if (args[1] === undefined) args[1] = path;
      if (this.acceptableArgs[1].includes(args[1].toLowerCase())) path = args[1].toLowerCase();
      else return "Path provided is not a path.";

      path = functions.studytree.toPath(path);
      // Putting it together
      return functions.getMessage("ts", { theorem, path });
    },
    argInfo: {
      tt: { key: "theorems", type: "number" },
      path: { key: "path", type: "string" },
    }
  }),
};
