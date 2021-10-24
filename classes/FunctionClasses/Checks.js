"use strict";

const config = require("../../utils/config");

class Checks {
  static all() {
    return {
      "earlyGameCheck": this.earlyGameCheck,
      "breakCheck": this.breakCheck,
      "earlyEternityCheck": this.earlyEternityCheck,
      "ecsCheck": this.ecsCheck,
      "endgameCheck": this.endgameCheck,
      "botCommandsCheck": this.botCommandsCheck,
      "commonCheck": this.commonCheck,
      "bankedInfsCheck": this.bankedInfsCheck,
      "dilationGrindCheck": this.dilationGrindCheck,
      "earlyInfinityCheck": this.earlyInfinityCheck,
      "eternityGrindingCheck": this.eternityGrindingCheck,
      "setCrunchAutoCheck": this.setCrunchAutoCheck,
      "studyTreeCheck": this.studytreeCheck,
      "e4000Check": this.e4000Check,
      "ecsPlusCheck": this.ecsPlusCheck,
      "weirdICsCheck": this.weirdICsCheck,
      "lateBreakCheck": this.lateBreakCheck,
      "challengeCheck": this.challengeCheck,
      true: true
    };
  }

  static getCheck(check, id, message) {
    if (typeof check === "boolean") return check;
    return this.all()[check](id, message);
  }

  static earlyGameCheck(id, message) {
    return config.ids.earlyGame.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static breakCheck(id, message) {
    return config.ids.break.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static earlyEternityCheck(id, message) {
    return config.ids.earlyEternity.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static ecsCheck(id, message) {
    return config.ids.ecs.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static endgameCheck(id, message) {
    return config.ids.endgame.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static botCommandsCheck(id, message) {
    // 603002159864348703 is #bots in Earth's things
    // 722268615973273725 is #general in bot test server
    return config.ids.botCommands.includes(id) || id === "603002159864348703" || id === "722268615973273725" || message.channel.type === "DM" || id === "873209506430066808";
  }

  static commonCheck(id) {
    return config.ids.common.includes(id);
  }

  static bankedInfsCheck(id, message) {
    return Checks.commonCheck(id) || config.ids.ecs[1] === id || config.ids.endgame.includes(id) || Checks.botCommandsCheck(id, message);
  }

  static dilationGrindCheck(id, message) {
    return config.ids.endgame.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message) || config.ids.ecs[1] === id;
  }

  static earlyInfinityCheck(id, message) {
    return config.ids.earlyGame[1] === id || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static eternityGrindingCheck(id, message) {
    return Checks.earlyEternityCheck(id, message) || config.ids.ecs.includes(id) || config.ids.endgame.includes(id);
  }

  static setCrunchAutoCheck(id, message) {
    return Checks.botCommandsCheck(id, message) || config.ids.break[0] === id;
  }

  static studytreeCheck(id, message) {
    return Checks.ecsCheck(id, message) || Checks.earlyEternityCheck(id, message) || Checks.endgameCheck(id, message);
  }

  static e4000Check(id, message) {
    return config.ids.endgame[1] === id || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static ecsPlusCheck(id, message) {
    return config.ids.ecs.includes(id) || config.ids.endgame.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static weirdICsCheck(id, message) {
    return config.ids.earlyEternity.includes(id) || config.ids.break.includes(id) || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static lateBreakCheck(id, message) {
    return config.ids.break[1] === id || Checks.commonCheck(id) || Checks.botCommandsCheck(id, message);
  }

  static challengeCheck(id, message) {
    return Checks.earlyInfinityCheck(id, message) || Checks.breakCheck(id, message) || Checks.earlyEternityCheck(id, message) || Checks.ecsCheck(id, message);
  }
}

module.exports = { Checks };