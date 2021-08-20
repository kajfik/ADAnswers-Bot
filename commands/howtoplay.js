/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../classes/ApplicationCommand/TimeStudyApplicationCommand");

const howtoplayMesssageObject = {
  "faq": {
    "maxall": "The \"Max all\" button (or, on Web, the M key on your keyboard) allows you to purchase max Tickspeed and Antimatter Dimensions while you hold it, but it will purchase only 10 or more of one Dimension at once. On moble, you can hide it in the Options.",
    "screenflickering": "Only for mobile: During later gameplay those with seizure disorders may be negatively affected. To prevent the screen flickering you can go to Options and enable the Battery Saver. This will slow the UI update to once every second while the game update rate will stay the same (25ms). Enabling the Battery Saver disables the Newsticker. If you wish to enable the Newsticker you need to disable Battery Saver and then choose \"News\" in Options - UI - Top bar.",
    "dimboostorgalaxy": "From `/dimboostorgalaxy`: Galaxy if you can afford it, Dimboost if you are trying to reach being able to afford it.",
    "galaxies": "Every Tickspeed purchase makes your Antimatter Dimensions 1.1245x faster. If you purchase a Galaxy, every Tickspeed purchase will make your Antimatter Dimensions 1.1445x faster. This might not seem like much, but after 100 Tickspeed purchases you gain antimatter 1333736x faster with 1 galaxy than with no galaxies.",
    "whentosacrifice": "Ideally when the multiplier is over 2.00x and you have just purchased 10 8th Dimensions.",
    "progressbar": "It indicates the percentage to Infinity antimatter. The percentage is logarithmic, so while 100% means 1.79e308 antimatter, 50% is only 1.34e154 antimatter.",
    "howmuchisinfinity": `See \`/infinity\`.`,
    "offlineticks": `See \`/offlineticks\`.`
  },
  "dimensions": {
    "antimatterdimensions": `\t\t\t**Dimensions** are your production units in the game. The 1st Dimension produces your Antimatter. Each consecutive dimension produces the previous one, allowing you to have steady growth. There are eight Dimensions total.
    \t\t\t**Dimension Multiplier:** Below the dimension there is a multiplier (example: 1st Dimension x1.0). The base production of each dimension is multiplied by this number. This multiplier increases by 2x (base) for every 10 of that dimension purchased. Each time this occurs, the price of the dimension will increase.
    \t\t\t**Accumulated Dimension Quantity:** The next column is your current amount of that dimension you own. This is a combination of how many you have purchased with antimatter, as well as produced from the higher dimension.
    \t\t\t**Dimension Growth Percent:** This number is shown only when enabled in the Options. It represents the amount of growth that dimension experiences per second. +100% means the amount of dimension is doubling each second. This allows you to judge overall growth.
    \t\t\t**Purchased Dimension Quantity:** Each dimension purchase button has a green bar that indicates how much of that dimension have you purchased since the last multiplier increase and a slightly lighter bar that indicates how much can you purchase.
    \t\t\t**Tip:** You can hold the dimension buttons to buy them faster. Or you can hold the "Max all" button which also buys Tickspeed.
    \t\t\t**Dimension base costs:** 10, 100, 1e4, 1e6, 1e9, 1e13, 1e18, 1e24
    \t\t\t**Dimension base cost multipliers:** 1e3, 1e4, 1e5, 1e6, 1e8, 1e10, 1e12, 1e15
    \t\t\t**Dimension cost scaling:** Every time you purchase 10 of a dimension, its cost is multiplied by its cost multiplier. Additionally every time you purchase 10 of a dimension while its cost is greater than Infinity, its cost multiplier is multiplied by the post-infinity Dimension cost multiplier increase (starts at 10, can be lowered).`,
    
    "infinitydimensions": `\t\t\t**Unlocking Infinity Dimensions:** Infinity Dimensions are unlocked by reaching a certain amount of antimatter.
    \t\t\t**Infinity Dimension Cost:** Infinity Dimensions are only purchasable in sets of 10 and cost Infinity points.
    \t\t\t**Infinity Dimension Production:** Similar to the Antimatter Dimensions, each Infinity Dimension produces the dimension above it. 3rd Dimension produces 2nd, 2nd produces 1st. Instead of antimatter, 1st Infinity Dimension produces Infinity Power, which translates to an overall multiplier on all Antimatter Dimensions.
    \t\t\t**Infinity Power** gives a boost to all Antimatter Dimensions equal to (power^7).`,

    "timedimensions": `\t\t\tAfter your first Eternity, you unlock Time Dimensions. You buy them with Eternity Points and they provide Time Shards, which generate Tickspeed upgrades. These Tickspeed upgrades function like normal Tickspeed upgrades but don't increase their cost. These Tickspeed upgrades are kept on Infinity, but reset every Eternity.
    \t\t\tSimilarly to the other dimensions, 2nd Time Dimensions produce 1st Time Dimensions and so on. Similarly to Infinity Dimensions, your production will be reset to the amount you purchased after every Eternity, but you will keep any upgrades to your multipliers you purchased.
    \t\t\tEach purchase increases the multiplier of that specific Time Dimension by ×4. The cost multiplier between upgrades has a base value, but is increased by ×1.5 at 1.80e308 EP and ×2.2 (of the base value) at 1e1300 EP. These increases apply retroactively, causing the cost to jump when they reach those thresholds, and only apply to the first four dimensions. Beyond 1e6000 EP each dimension purchase counts as four purchases for the purpose of cost increases, causing the price to rise much more steeply.
    \t\t\tEach threshold to gain another Tickspeed upgrade is 33% more Time Shards than the previous, or 25% with the relevant time study. After 400,000 upgrades, the multiplier between each successive free Tickspeed upgrade will gradually increase at a rate of ~×1.35 per 50,000 upgrades (×1.000006 per upgrade).
    \t\t\t**Time Dimension base costs (EP):** 1, 5, 100, 1e3, 1e2350, 1e2650, 1e3000, 1e3350
    \t\t\t**Time Dimension base cost increases:** 3, 9, 27, 81, 2e4, 7e4, 2e5, 7e5`
  },
  "tickspeed": {
    "whatistickspeed": `\t\t\t**Tick:** Production in the game happens on each "tick", which initially occurs once per second. By buying Tickspeed upgrades, you can make your Antimatter Dimensions produce faster, as if multiple ticks occur in each second.
    \t\t\t**Tickspeed:** This states how many game ticks are occurring every second. Fractional ticks are accounted for, boosting production as if part of a game tick has passed.`,
    "cost": `\t\t\t**Cost:** The cost of antimatter for multiplying ticks/sec by the displayed multiplier (without any Galaxies, this is 1.1245x per purchase).
    \t\t\t**Buy Max:** This will buy the maximum amount of Tickspeed upgrades available with your current amount of antimatter.
    \t\t\t**Tickspeed base cost:** 1000
    \t\t\t**Tickspeed base cost multiplier:** 10
    \t\t\t**Tickspeed cost scaling:** Every time you purchase Tickspeed, its cost is multiplied by its cost multiplier. Additionally every time you purchase Tickspeed while its cost is greater than Infinity, its cost multiplier is multiplied by the post-infinity Tickspeed cost multiplier increase (starts at 10, can be lowered).
    \t\t\tNote that the actual Tickspeed time is fake and the game always runs at 40 ticks per second, the Tickspeed acts only as a multiplier on Antimatter Dimensions.`
  },
  "softresets": {
    "dimboosts": `\t\t\t**Dimension Boost:** This resets all of your Dimensions and your Antimatter, but unlocks another Dimension for you to purchase and boosts your Dimension multipliers. The 1st Dimension Boost requires 20 4th Dimensions, the 2nd requires 20 5th Dimensions, etc. After unlocking all 8 Dimensions, every additional Boost will cost 15 more 8th Dimensions than the previous Boost and will no longer unlock a Dimension, but will continue to increase your Dimension multipliers.
    \t\t\tYou gain a 2x multiplier to the 1st Dimension for every Dimension Boost you have. Each higher Dimension will have the multiplier applied one less time as the previous, down to a minimum of 0. For example, with 3 Boosts, the 1st Dimension will gain 8x, the 2nd Dimension 4x, the 3rd Dimension 2x, and all other Dimensions are unaffected.
    \t\t\t**Tip:** On mobile, after changing the Bottom buttons option to "ALL" you can use the D bottom button to perform a Dimension Boost. On web, this same thing can be accomplished by pressing "D".`,

    "galaxies": `\t\t\tPurchasing an Antimatter Galaxy will reset your game back to the point where only 4 Antimatter Dimensions are available, but will increase the effect of your Tickspeed upgrades by +0.02 for your first two Galaxies. As you get more Galaxies, the multiplier will continue becoming stronger and stronger.
    \t\t\tThough it will have very little impact for the first few Tickspeed purchases, the increase is multiplicative and won’t take long to be visible.
    \t\t\t**Cost:** Your first Antimatter Galaxy requires 80 8th Antimatter Dimensions, and each additional Galaxy will cost another 60 more.
    \t\t\t**Distant Galaxy cost scaling:** Above 100 Antimatter Galaxies the cost increase between Galaxies will increase by 2 per Galaxy, making the next Galaxy cost 62 more, then 64 more, etc.
    \t\t\t**Remote Galaxy cost scaling:** Above 800 Antimatter Galaxies, the <i>total</i> cost increases by another 0.2% per Galaxy, on top of Distant scaling.
    \t\t\t**Tip:** On mobile, after changing the Bottom buttons option to "ALL" you can use the G bottom button to purchase an Antimatter Galaxy. On web, this same thing can be accomplished by pressing "G".`
  }
};

module.exports = {
  command: new TimeStudyApplicationCommand({
    name: "howtoplay",
    description: "sends the bowtoplay from the mobile version of the game",
    number: 1,
    check: true,
    acceptableArgs: [Object.keys(howtoplayMesssageObject), [Object.keys(howtoplayMesssageObject.faq)]],
    getArgMessage(args) {
      if (howtoplayMesssageObject[args[0]]) {
        return howtoplayMesssageObject[args[0]][args[1]];
      }
      return `Unknown howtoplay page.`;
    },
    messageObject: howtoplayMesssageObject,
    argInfo: {
      type: { key: "type", type: "string" },
      page: { key: "page", type: "string" },
    },
    ephemeral: false
  }),
};