/* eslint-disable strict */

const { Messages } = require("../classes/Messages");

const footerMessages = new Messages("footerMessages");
const activityMessages = new Messages("activityMessages");

module.exports = {
  footerMessages,
  activityMessages,
  combined: {
    random() {
      return `${activityMessages.random()} || ${footerMessages.random()}`;
    },
    getByIndex(index1, index2) {
      return `${activityMessages.getByIndex(index1)} || ${footerMessages.getByIndex(index2)}`;
    },
    last() {
      return `${activityMessages.last()} || ${footerMessages.last()}`;
    },
    next() {
      let next = `${activityMessages.next(true)} || ${footerMessages.next(true)}`;
      if (next.length > 128) next = this.next();
      this.current = next;
      return next;
    },
    first() {
      return `${activityMessages.first()} || ${footerMessages.first()}`;
    },
    current: `${activityMessages.first()} || ${footerMessages.first()}`,
  }
};