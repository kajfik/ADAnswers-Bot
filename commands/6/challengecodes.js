"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "challengecodes",
    description: "Sends a picture with all of the challenges notated with their \"code\"",
    
    check: "earlyInfinityCheck",
    sent: [`Even though this image was originally made for the web version, it is still identical for mobile.
    https://media.discordapp.net/attachments/387798906333036546/541018211215343616/C-Codes.png.`]
  }),
};

// I eat ass