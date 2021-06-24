"use strict";

const { classes } = require("../command");

module.exports = {
  command: new classes.com({
    name: "abb",
    number: 5,
    description: "sends an abbreviation guide",
    check: true,
    acceptableArgs: undefined,
    sent: [`
    AM - Antimatter
    IP - ||Infinity Points||
    EP - ||Eternity Points||
    CX - Challenge X
    ICX - ||Infinity Challenge X||
    ECXxY - ||Eternity Challenge X completion Y||
    IPow - ||Infinity Power||
    IDX - ||Infinity Dimension X||
    TDX - ||Time Dimension X||
    TS - ||Time Study||
    TT - ||Time Theorem||
    DT - ||Dilated Time||
    TP - ||Tachyon Particles||
    BInf - ||Banked Infinities||`]
  })
};
