/* eslint-disable max-len */
"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({

    name: "ipepcolor",
    description: "Explains the coloring of the IP/EP numbers on their respective reset buttons",
    check: true,
    sent: [`This is a visual improvement introduced in the web Reality update and adapted into the Android version. \nOnce you have at least 5e11 total IP/EP the color shows if you gain less (red), around the same (white), or more (green) IP/EP than you currently have.`]
  })
};