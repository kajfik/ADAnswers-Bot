"use strict";

const { combined } = require("../../utils/messages");
const Global = require("../../utils/constants");
class Internal {
  static startIntervals() {
    setInterval(Internal.setBotStatus, 15000);
  }

  static setBotStatus() {
    const next = combined.next();
    Global.client.user.setActivity(next, { type: "LISTENING" });
  }
}

module.exports = { Internal };