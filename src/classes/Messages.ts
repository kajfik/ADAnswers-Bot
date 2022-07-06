import { messages } from "../utils/databases/presneceMessages";

export class Messages {
  type: string;
  messages: Array<string>;
  currentIndex: number;
  current: string;
  constructor(type: string) {
    this.type = type;
    this.messages = messages[type];
    this.currentIndex = 0;
    this.current = this.messages[0];
  }

  getByIndex(index: number) {
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
    this.current = next;
    return next;
  }
}