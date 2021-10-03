/* eslint-disable no-console */
"use strict";

const Chalk = require("chalk");

class Log {
  static log(message) {
    console.log(message);
  }

  static error(message) {
    console.error(Chalk.redBright(message));
  }

  static info(message) {
    console.log(Chalk.cyan(message));
  }

  static success(message) {
    console.log(Chalk.greenBright(message));
  }

  static basic(message) {
    console.log(Chalk.blue(message));
  }

  static warning(message) {
    console.log(Chalk.yellow(message));
  }

  static loading(message) {
    console.log(Chalk.grey(message));
  }

  static important(message) {
    console.log(Chalk.magenta(message));
  }

  static divider() {
    console.log(Chalk.blueBright("/--------------------------------------------------------------------/"));
  }
}

module.exports = { Log };