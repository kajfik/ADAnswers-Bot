/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "androidorweb",
    number: 5,
    description: "sends the pinned message from the mobile channel describing the differences. Mobile and web have some notable differences -- mostly quality of life (QoL) changes. Due to this, many people prefer to play on mobile. Web will be essentially identical with the release of the Reality update as many of these changes were taken from there.",
    check: true,
    sent: [`https://gist.github.com/earthernsence/85ba3bfd470ed6fe76944f377f91fda4`]
  })
};