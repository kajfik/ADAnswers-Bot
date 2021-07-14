/* eslint-disable max-len */
"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "occlusion",
    number: 6,
    description: "shows a guide of how to fix out-of-focus tabs on chrome not giving full progress",
    check: true,
    sent: [`This guide is for performance issues when you minimize any game in chrome, and EACH option could fix the problem (it's mostly about making stuff working while minimized). High chance that just Steps 1-4 are enough (then don't try more). ALL these options can increase your cpu usage.

    1.    Open Chrome :
    2.    Type in the chrome browser Address: chrome://flags/ (on Brave, brave://flags/) (and press enter) (now should be a list of options… at the end of the “guide” is a picture which shows how it looks like (after making the steps)
    3.    Search for the option called Calculate window occlusion on Windows (one way for this is press ctrl+f  and type occlusion in it). You could MAYBE also find an other option called Enable occlusion of web contents
    4.    DISABLE These option(s)
    5.    Search for Throttle Javascript timers in background. 
    6.    Also disable this Option
    
    It should look something like in this picture: http://prntscr.com/vlszde`]
  })
};