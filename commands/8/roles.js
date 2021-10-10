"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "roles",
    description: "explains that you can get an Android or Web player role",
    
    check: true,
    // eslint-disable-next-line max-len
    sent: [`In <#831194138493452288> (or at this link: <https://discord.com/channels/351476683016241162/831194138493452288/876910376216821842>), you can pick up an Android or Web player role. This role makes it easier for helpers to figure out which platform you play on as some information may differ between the two versions. This only takes a few seconds and saves you many "android or web?"s.`]
  }),
};