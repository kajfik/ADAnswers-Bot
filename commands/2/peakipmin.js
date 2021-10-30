"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "peakipmin",
    description: "Tells why peak IP/min disappears at e100 IP",
    check: "lateBreakCheck",
    // eslint-disable-next-line max-len
    sent: [`Yes, peak IP/min disappears after you reach 1e100 IP. This will be lowered down to 5e11 IP in the next update, as after that point you want to disable your Crunch autobuyer and keep doing non-regular runs - the runs should get longer as you want to reach the next Dimboost/Galaxy which will increase your IP gain substantially, much more than if you kept doing regular IP/min runs like before that point.`]
  })
};