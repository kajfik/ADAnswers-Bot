/* eslint-disable max-len */
"use strict";

module.exports = {
  number: 5,
  name: "androidorweb",
  description: "sends the pinned message from the mobile channel describing the differences. Mobile and web have some notable differences -- mostly quality of life (QoL) changes. Due to this, many people prefer to play on mobile. Web will be essentially identical with the release of the Reality update as many of these changes were taken from there.",
  execute(message) {
    message.channel.send(`
    - The 1st galaxy is 12.5% instead of 12%
 - Each achievement grants additional 1.03x multiplier to Normal dimensions
 - Autobuyers are available for purchase before Infinity, but you can upgrade them only after you complete respective challenges
 - The Big Crunch autobuyer has halved initial interval, other autobuyers have drastically lowered initial intervals
 - The 500 IP Infinity upgrade now costs 300 IP
 - There is a new Infinity upgrade for 1e3 IP that gives you 50% of your best IP/min without M while you're offline
 - The 20-eternities milestone is moved to 8 eternities
 - New eternity milestone that gives you 25% of your best EP/min while offline
 - Another 2 new/changed milestones that give you eternities and infinitied stat while offline
 - Ad bonus (x2 to normal dimensions, x2 IP increasing, x2 EP increasing, and x2 DT gain)
 - The Tickspeed calculation is dynamic
 - The game update rate is fixed 25ms (when compared to 33-200ms on web)
 - Option to increase max offline ticks
 - There's no Fix Infinity button
 - Changed "When will it be enough?" requirement (from 1e20000 to 1e18000)
 - Changed the unlock conditions of IC2 (from 1e5000 to 1e10500) and IC6 (from 1e20000 to 1e22500)
 - Changed the goal of IC1 (from 1e850 to 1e750)
 - Lowered the requirements of:
    - "Like feasting" (from 1e100 to 1e90)
    - "Is this safe?" (from 30 minutes to 1 hour)
    - "Unique snowflakes" (from 630 to 569)
 - The "Is this safe?" achievement also lets you keep 1 RG on Infinity
 - Lowered base costs of cost scaling upgrades and improved their display (Tickspeed cost scaling from 3e6 to 1e6, Dimension cost scaling from 1e8 to 1e7)
 - Added colors to the Crunch/Eternity buttons when you have more than e50 of IP/EP, the color shows if you gain less (red), around same (white), or more (green) IP/EP than you currently have
-  C7 was reworked to not have RNG
`);
  }
};