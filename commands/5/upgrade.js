"use strict";

const { upgrades } = require("../../utils/databases/upgrades");
const { UpgradeApplicationCommand } = require("../../classes/ApplicationCommand/UpgradeApplicationCommand");

module.exports = {
  command: new UpgradeApplicationCommand({
    name: "upgrade",
    description: "Args: `infinity`, `break`, `eternity`, `dilation`. Explains what the upgrades are",
    check: true,
    acceptableArgs: Object.keys(upgrades),
    argInfo: {
      key: "upgrade",
      type: "string",
    },
  })
};