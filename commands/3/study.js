"use strict";

const { StudyApplicationCommand } = require("../../classes/ApplicationCommand/StudyApplicationCommand");
const { studies, TimeStudy } = require("../../utils/databases/studies");

module.exports = {
  command: new StudyApplicationCommand({
    name: "study",
    description: "Args: all study IDs (ex. 11 is the first study, 21 is first on the left split, etc). Returns information about the study",
    check: true,
    acceptableArgs: Object.keys(studies),
    getArgMessage(arg) {
      return TimeStudy(studies[arg]);
    },
    argInfo: {
      key: "study",
      type: "integer",
    }
  })
};