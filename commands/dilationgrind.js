/* eslint-disable max-len */
"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "dilationgrind",
    number: 4,
    description: "sends a message pertaining to reaching dilation",
    check: "dilationGrind",
    acceptableArgs: undefined,
    sent: [`Getting the last ~100 TT to unlock dilation often requires an idle run, which might take a few hours. Use TD + ID path and 222, 224, 226, 228, 232, 234 (all even studies) for the bottom section. It helps to have 1M eternities (1e6 - on web you want 1,012,680 because the hardcap for TS193 requires slightly more eternities) and 5B (5e9) banked infinities. Export your save before you Eternity to collect TT from EP. If you are a few TT too short, you can simply import the save and continue the idle grind, without losing the high IP multiplier on TS143.`]
  }),
};
