/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    number: 1,
    name: "earlyinfinity",
    description: "Describes how to progress pre-2x better Galaxies",
    check: "earlyInfinityCheck",
    sent: [`C8 (see \`/challengecodes\` to see which C8 is) repeatedly (do antitable achievement in these C8 runs) until you can afford the Galaxies are twice as effective upgrade, at which point you can do C11 once then continue with normal infinities. Return to the other challenges in any order you like once you get 100 IP and at least all but the last 5 upgrades`]
  })
};
