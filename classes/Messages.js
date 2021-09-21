"use strict";

const messages = require("../utils/actualMessages");
const { Time } = require("./FunctionClasses/Time");

class Messages {
  constructor(type) {
    this.type = type;
    this.messages = messages[type];
    this.currentIndex = 0;
    this.current = this.messages[0];
  }

  random() {
    return this.messages[Math.floor(Math.random() * this.messages.length)];
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