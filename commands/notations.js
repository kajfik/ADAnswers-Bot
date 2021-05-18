"use strict";

module.exports = {
  number: 5,
  name: "notations",
  description: `Sends a link to the Notations GitHub repo.`,
  execute(message) {
    message.channel.send("Check out all notations in action at https://antimatter-dimensions.github.io/notations/");
  }
};
