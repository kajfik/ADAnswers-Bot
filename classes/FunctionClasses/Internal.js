"use strict";

const { combined } = require("../../utils/messages");

class Internal {
  static startIntervals(client) {
    setInterval(Internal.setBotStatus, 15000, client);
  }

  static setBotStatus(client) {
    const next = combined.next();
    client.user.setActivity(next, { type: "LISTENING" });
  }
}

module.exports = { Internal };