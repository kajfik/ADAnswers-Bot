/* eslint-disable max-len */
"use strict";

const { TimeStudyApplicationCommand } = require("../../classes/ApplicationCommand/TimeStudyApplicationCommand");

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
    \t\t\t**Remote Galaxy cost scaling:** Above 800 Antimatter Galaxies, the *total* cost increases by another 0.2% per Galaxy, on top of Distant scaling.
    \t\t\t**Tip:** On mobile, after changing the Bottom buttons option to "ALL" you can use the G bottom button to purchase an Antimatter Galaxy. On web, this same thing can be accomplished by pressing "G".`
  },
  "achievements": {
    "info": `\t\t\tEach achievement has conditions that must be met before they are earned. Some are very simple, and some are significantly trickier.`,
    "multiplier": `\t\t\tOn mobile, you will receive a 1.03x multiplier to all Antimatter Dimensions for each completed achievement. You will also gain an additional 1.25x multiplier for each fully completed row (for both platforms). In addition, many achievements have their own rewards`
  },
  "sacrifice": {
    "info": `\t\t\tYou unlock Dimensional Sacrifice after your 5th Dimension Boost.
    \t\t\tSacrificing will immediately reduce the owned quantity of Antimatter Dimensions 1 through 7 to zero. This does not reduce the multiplier or the current cost. In return, it will multiply the 8th Dimension multiplier by the shown value. It will take time to get back to the production you previously had, but you will end up with a net increase.`,
    "when": `See /howtoplay faq whentosacrifice`,
    "confirmation": `The sacrifice confirmation can be disabled in Options. On web, click the checkbox next to the Sacrifice button.`,
  },
  "infinity": {
    "info": `\t\t\tOnce you have too much Antimatter for the world to handle (2^1024, or 1.79769e308) you'll reach Infinity and be able to perform a "Big Crunch".`,
    "infinitypoints": `\t\t\tEach Infinity completed will give an Infinity point. These can be spent on upgrades in the new Infinity Upgrades tab. You must purchase these upgrades from top to bottom.`,
    "when": `\t\t\t**When should I try to reach Infinity?** It's recommend to get 2 Galaxies before attempting to reach it. On the way there, you should do Dimension Boost as many times as you can.`,
    "hotkey": "\t\t\t**Tip:** On mobile, after changing the Bottom buttons option to \"ALL\" you can use the C bottom button to perform a Big Crunch. On web, this same thing can be accomplished by pressing \"C\"."
  },
  "challenges": {
    "normal": `\t\t\tChallenges are unlocked after first Infinity. They change in-game mechanics in different ways to create more difficult Infinity circumstances.
    \t\t\tOn mobile, each completed challenge will award an autobuyer or an ability to upgrade an autobuyer. On web, each challenge unlocks an autobuyer. You can run all the challenges (except the first one) multiple times by clicking the "Completed" button or enabling the "Automatically retry challenges" option. Only the first challenge completion grants a reward. Challenges can be exited at any time via the "Exit Challenge" button in the challenge tab.
    \t\t\tThe bottommost (mobile) or the rightmost column (web) 4 Infinity upgrades don't work in challenges.
    \t\t\t**Tip:** Challenge confirmation dialog can be turned off in the Options.`,
    "infinity": `\t\t\tInfinity Challenges are like regular challenges, but they have higher end goals and are generally harder than regular challenges (but have a different kind of reward).
    \t\t\tThey unlock at set amounts of antimatter - the ones unlocking later are (generally) more difficult.`,
    "eternity": `Head to this link: https://discord.com/channels/351476683016241162/408764187960147982/597787951925035021`,
  },
  "autobuyers": {
    "info": `\t\t\t**Autobuyers** allow the automatic purchase of Antimatter Dimensions, Dimension Boosts, Galaxies, Tickspeed, Big Crunches, and Dimensional Sacrifice (later). On mobile, you can purchase Dimension and Tickspeed Autobuyers with Antimatter; the rest of the Autobuyers are given as a reward for completing a challenge. On web, all of those autobuyers are unlocked by beating a challenge.`,
    "interval": `\t\t\t**Autobuyer Interval:** The cooloff period before the autobuyer makes another puchase.`,
    "bulkbuy": `See /bulkbuy.`,
    "buyquantity": `\t\t\t**Dimension Autobuyer Buy Quantity:** Autobuyers for Antimatter Dimensions can be set to buy a single, or until 10, on each cooldown. Bulk buy does not work when the autobuyer is set to singles.
    \t\t\t**Tickspeed Autobuyer Buy Quantity:** The Tickspeed autobuyer can be set to buy a single or the max available on each cooldown.`,
    "autodimboost": `\t\t\t**Automatic Dimboost Customization:** The Dimboost autobuyer works only when the amount of Dimboosts is less than the "Limit Dimboosts to" or when the amount of galaxies is greater or equal to the "Galaxies required to always Dimboost". For example if you set the "Galaxies required to always Dimboost" to 1, it will always buy Dimboosts when you have 1 or more galaxies. Later in the game you will unlock the ability to purchase Dimboosts in bulk. The autobuyer will then wait until it can purchase the Dimboosts in bulk at once.`,
    "limitgalaxiesto": `\t\t\t**Limit Galaxies to:** The highest amount of galaxies the Galaxy autobuyer will buy. This limit can be disabled.`,
    "iponcrunch": `\t\t\t**IP on crunch:** Once you break Infinity, you can set how many IP you would like to wait for before crunching. It accepts e notation (12.34e5 is 1234000).`,
    "sacrifice": `\t\t\t**Sacrifice Autobuyer:** This autobuyer has a maxed timer from the start. You can set how much multiplier it waits for before sacrificing. It accepts e notation.` 
  },
  "breakinfinity": {
    "info": "\t\t\tOriginally Antimatter Dimensions was restricted by \"Infinity\". Since a significant update, you can now \"Break Infinity\" once your Big Crunch autobuyer has been maxed. This opens up a selection of new upgrades as well as the ability to gain more than 1 Infinity point per run."
  },
  "replicanti": {
    "info": `\t\t\tReplicanti are another resource that unlocks at 1e140 IP and gives a multiplier to all Infinity Dimensions. Rather than producing something else, Replicanti actually produces *itself* up to a maximum of 1.80e308. Replicanti are produced at their own pace, unaffected by Tickspeed upgrades. Each individual Replicanti has a certain chance (initially 1%) of producing another Replicanti every Replicanti interval (initially every second), and both of these can be upgraded by spending IP.
    \t\t\tWhen Replicanti reach 1.80e308 you can exchange them for a Replicanti Galaxy. This Galaxy acts in the same way as an Antimatter Galaxy - it increases the effectiveness of your Tickspeed upgrades, but it will not make your next Antimatter Galaxy more expensive. The amount of Replicanti Galaxies you can have is capped (upgradable).`,
    "tips": `\t\t\t**Tip:** On mobile, you can hold the "Reset replicanti amount" button to buy Replicanti Galaxies faster. On web, press the "Reset replicanti amount" button and hold enter to buy Replicanti Galaxies faster.
    \t\t\t**Tip:** On mobile, after changing the Bottom buttons option to "ALL" you can use the R bottom button to purchase a Replicanti Galaxy. On web, this same thing can be accomplished by pressing "R".`,
    "upgrades": `\t\t\t**Chance upgrade cost:** Base 1e150 IP, cost increment 1e15x per upgrade
    \t\t\t**Interval upgrade cost:** Base 1e140 IP, cost increment 1e10x per upgrade
    \t\t\t**Galaxy upgrade cost:** Base 1e170 IP, cost increment 1e25x and an additional 1e5x per upgrade, scaling similarly to Distant Antimatter Galaxies. Above 100 Replicanti Galaxies, this 1e5x per upgrade changes to 1e55x. Above 1000, the scaling switches from quadratic to cubic, with the 1e55x multiplier itself increasing by 1e5x per upgrade.`
  },
  "eternity": {
    "info": `\t\t\tUpon reaching 1.79e308 Infinity Points, you can Eternity. Eternities will reset everything before this point except challenge times, achievements, and total antimatter. You also unlock a new tab.
    \t\t\tYou will receive more Eternity Points the more Infinity Points you have when you Eternity.
    \t\t\t**Tip:** Eternity confirmation dialog can be turned off in the Options.
    \t\t\t**Tip:** After changing the Bottom buttons option to "ALL" you can use the E bottom button to Eternity. On web, this same thing can be accomplished by pressing "E".`,
    "milestones": `\t\t\tTo make Eternities faster and more convenient, you will unlock various buffs as you get more Eternities. These buffs will generally let you start with certain upgrades you would otherwise lose after Eternity, give you new autobuyers for better automation, or give you a way to passively gain resources offline at a reduced rate.
    \t\t\tMilestones which give you upgrades will automatically purchase and upgrade them to their maximum when starting the Eternity, effectively letting you have them permanently.
    \t\t\tAll of the new autobuyers will have toggles next to their respective manual buttons (for example, Infinity Dimension autobuyer can be found on the Infinity Dimension tab). The exceptions are the improvements to the Dimboost, Galaxy, and Crunch autobuyers, as well as the new Eternity autobuyer, which will be on the autobuyers page.
    \t\t\tFor mobile, the passive generation Milestones only work offline by design and may need certain autobuyer settings to work properly, as noted on the milestone tab itself.`
  },
  "timestudies": {
    "info": `\t\t\t**Time Studies** are a powerful post-eternity upgrades, which cost Time Theorems. Time Studies are laid out in a tree-like fashion, where you must buy prerequisites before continuing.
    \t\t\t**Time Theorems** are a limited resource which costs more for each one you buy ((1e20000^(times bought + 1)) for antimatter, (1e100^times bought) for IP, (2^times bought) for EP). They can be bought with antimatter, Infinity points, and Eternity points.`,
    "respec": `See /respec.`,
    "tips": `\t\t\t**Tip:** On mobile, you can show Time Study numbers in the Options. On web, this same thing can be accomplished by holding shift.
    \t\t\t**Tip:** On mobile, you can hold a Time Study button to purchase all Time Studies up to that point. This doesn't work when you can choose only one out of more paths. For example if you want to buy all Studies up to 133, you need to buy all Studies up to 101, 102 or 103 first. On web, this same thing can be accomplished by shift clicking on a study.`
  },
  "dilation": {
    "info": `\t\t\t**Time Dilation** is unlocked when you purchase the 5,000 TT Time Study after beating both EC11 and EC12 five times, and after acquiring a total of 13,000 TT. Dilating time will start a modified Eternity, called Time Dilation, in which all of your Antimatter/Infinity/Time Dimension and Tickspeed multipliers will be raised to the power of ^0.75, significantly reducing them.
    \t\t\tIf you can reach 1.80e308 IP and then complete the Eternity while Dilated, you will be rewarded with Tachyon Particles. You can dilate as many times as you want, but Tachyon Particles cannot be "farmed" like other resources. Instead, you can only gain more Tachyon Particles by passing your previous highest antimatter within Time Dilation, and you will only gain more based on your *new* highest antimatter from this new run.
    \t\t\t**Tip:** Dilation confirmation dialog can be turned off in the Options.`,
    "particles": `\t\t\t**Tachyon Particles** generate another currency called Dilated Time. This generation is 1:1. Dilated Time is translated into Tachyon (Dilated, on web) Galaxies by reaching thresholds similarly to free tickspeed upgrades from Time Dimensions. These Tachyon Galaxies are like Replicanti Galaxies in that they increase the effectiveness of your Tickspeed upgrades as if they were Antimatter Galaxies but they don't increase the cost of your next Antimatter Galaxy.`,
    "upgrades": `\t\t\tUnlocking Time Dilation also unlocks **Dilation Upgrades** you can purchase using Dilated Time. The first three Dilation Upgrades can be repeatedly purchased as many times as you can afford them.`
  }
};

module.exports = {
  command: new TimeStudyApplicationCommand({
    name: "howtoplay",
    description: "sends the bowtoplay from the mobile version of the game",
    
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