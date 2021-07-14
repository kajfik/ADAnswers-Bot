"use strict";

const { Command } = require("../classes/Command");

module.exports = {
  command: new Command({
    name: "abb",
    number: 5,
    description: "sends an abbreviation guide",
    check: true,
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
