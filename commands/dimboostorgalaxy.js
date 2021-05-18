"use strict";

module.exports = {
  number: 1,
  name: "dimboostorgalaxy",
  description: "tells if you should do a dimboost or galaxy",
  execute(message) {
    message.channel.send("Galaxy if you can afford it, Dimboost if you are trying to reach being able to afford it.");
  }
};
