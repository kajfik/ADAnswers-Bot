import { StringIndexedStringObjectType, TagInfo } from "../utils/types";
import { tags } from "../bot";

export async function incrementTag(name: string, tagsRequested: typeof tags.personUsage, isTime: boolean) {
  let tag;
  if (isTime) tag = await tagsRequested.findOne({ where: { hour: name } });
  else tag = await tagsRequested.findOne({ where: { name } });
  if (tag) {
    tag.increment("timesUsed");
  }
}

export async function getPersonTag(username: string, discriminator: string) {
  const personUsageTags = tags.personUsage;
  const t = await personUsageTags.findOne({ where: { name: `${username}#${discriminator}` } });
  return t;
}

export async function getTagInfo(): Promise<TagInfo> {
  const timeData = await manageTopCommands(tags.timeUsage, "hour", true);
  const usageData = await manageTopCommands(tags.commandUsage, "name", true);
  const personData = await manageTopCommands(tags.personUsage, "name", false);
  return {
    top5commands: usageData.top5CommandsText,
    top5hours: timeData.top5CommandsText,
    top5users: personData.top5CommandsText,
    requests: usageData.requests,
    successes: usageData.successes,
  };
}

// Fuck types, this is copied directly from the other code
export async function manageTopCommands(database: typeof tags.commandUsage, attribute: string, shift: boolean) {
  const tagsMatchedWithTimesUsed: StringIndexedStringObjectType = {};
  const tagList = await database.findAll({ attributes: ["timesUsed", attribute] });
  tagList.map(t => Object.assign(tagsMatchedWithTimesUsed, { [t.get(attribute) as string]: t.get("timesUsed") }));
  const sorted = Object.values(tagsMatchedWithTimesUsed).sort((a: string, b: string) => parseInt(b, 10) - parseInt(a, 10));
  const requests = sorted[0];
  const successes = sorted[1];
  if (shift) sorted.shift();
  if (shift) sorted.shift();
  const top5Commands: Array<Array<string>> = [];

  for (let i = 0; i < 5; i++) {
    const b = Object.entries(tagsMatchedWithTimesUsed).find(a => a[1] === sorted[0]) ?? ["Something went wrong"];
    top5Commands.push(b ?? ["Something went wrong"]);
    delete tagsMatchedWithTimesUsed[b[0]];
    sorted.shift();
  }

  const top5CommandsText: string = top5Commands.map(a => `${a[0]}: ${a[1]}`).join("\n");

  return {
    requests,
    successes,
    top5CommandsText,
  };
}

export async function incrementBigFourTags(commandName: string, person: string): Promise<void> {
  await incrementTag("totalSuccesses", tags.commandUsage, false);
  await incrementTag(commandName, tags.commandUsage, false);
  await incrementTag(String(new Date().getHours()), tags.timeUsage, true);
  await incrementTag(person, tags.personUsage, false);
}