"use strict";

const { ApplicationCommand } = require("../../classes/ApplicationCommand/ApplicationCommand");

module.exports = {
  command: new ApplicationCommand({
    name: "abb",
    
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
    BInf - ||Banked Infinities||
    EU - ||Eternity Upgrade||`]
  })
};
