"use strict";

const { ConvertApplicationCommand } = require("../../classes/ApplicationCommand/ConvertApplicationCommand");

module.exports = {
  command: new ConvertApplicationCommand({
    name: "convert",
    argInfo: {
      currentUnit: { key: "currentUnit", type: "string" },
      newUnit: { key: "newUnit", type: "string" },
      value: { key: "value", type: "number" }
    }
  }),
};