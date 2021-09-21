"use strict";

const { combined } = require("../../utils/messages");

class Internal {
  static startIntervals(client) {
    setInterval(Internal.setBotStatus, 15000, client);
  }

  static setBotStatus(client) {
    const next = combined.next();
    // eslint-disable-next-line no-console
    // console.log(`Changed status to: Listening to${next}`);
    client.user.setActivity(next, { type: "LISTENING" });
  }
}

module.exports = { Internal };