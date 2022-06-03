"use strict";

const messages = require("../utils/databases/actualMessages");
const { Time } = require("./FunctionClasses/Time");
const { Misc } = require("./FunctionClasses/Misc");

class Messages {
  constructor(type) {
    this.type = type;
    this.messages = messages[type];
    this.currentIndex = 0;
    this.current = this.messages[0];
  }

  random() {
    return Misc.randomInArray(this.messages);
  }

  getByIndex(index) {
    return this.messages[index];
  }

  last() {
    return this.messages[this.messages.length - 1];
  }

  first() {
    return this.messages[0];
  }

  next(modifyIndex = false) {
    if (modifyIndex) this.currentIndex++;
    if (this.currentIndex > this.messages.length - 1) {
      this.currentIndex = 0;
    }
    let next = this.getByIndex(this.currentIndex);
    if (next.length > 128) next = this.next(true);
    if (next === "time") next = `Currently ${Time.getTime()}`;
    this.current = next;
    return next;
  }
}

module.exports = { Messages };