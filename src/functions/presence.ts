import { Messages } from "../classes/Messages";

const footer: Messages = new Messages("footerMessages");
const activity: Messages = new Messages("activityMessages");

export const PresenceMessage = {
  getByIndex(index1: number, index2: number): string {
    return `${activity.getByIndex(index1)} || ${footer.getByIndex(index2)}`;
  },
  last(): string {
    return `${activity.last()} || ${footer.last()}`;
  },
  next():string {
    let next = `${activity.next(true)} || ${footer.next(true)}`;
    if (next.length > 128) next = this.next();
    this.current = next;
    return next;
  },
  first(): string {
    return `${activity.first()} || ${footer.first()}`;
  },
  current: `${activity.first()} || ${footer.first()}`,
};