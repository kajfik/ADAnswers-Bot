/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 69,
    name: "omsi",
    description: "omsi!",
    check: "botCommandsCheck",
    sent: [`omsi is a really cool person! she's done a ton of work for AD and is all around a real neat person.`]
  })
};