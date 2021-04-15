/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 2,
  name: "galaxyscaling",
  description: "Explains the change in scaling at 100 (and 800) Antimatter Galaxies",
  execute(message) {
    message.channel.send(`Above 100 AGs, the cost between Galaxies will go up by 2 per galaxy (i.e. 62 for 101, then 64 for 102, etc). This is called Distant scaling, hence the name change to "Distant Antimatter Galaxies". (800 AG spoilers) ||Above 800 AGs, the *total* cost increases by another 0.2%, on top of Distant scaling. This is called Remote scaling, hence the name change to "Remote Antimatter Galaxies".||`);
  }
};