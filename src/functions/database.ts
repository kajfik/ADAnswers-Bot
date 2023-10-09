import { Model, ModelStatic, Op } from "sequelize";
import { StringIndexedStringObjectType, TagInfo } from "../utils/types";
import { CommandInteraction } from "discord.js";
import { quantify } from "./Misc";
import { tags } from "../bot";

export async function incrementTag(name: string, tagsRequested: typeof tags.personUsage) {
  const tag = await tagsRequested.findOrCreate({ where: { name } });
  if (tag) {
    tag[0].increment("timesUsed");
  }
}

export async function getPersonTag(id: string) {
  const personUsageTags = tags.personUsage;
  const t = await personUsageTags.findOne({ where: { name: id } });
  return t;
}

export async function getJeopardyPlayerTag(id: string) {
  const jeopardyTags = tags.player;
  const t = await jeopardyTags.findOne({ where: { name: id } });
  return t;
}

export async function getTagInfo(): Promise<TagInfo> {
  const timeData = await manageTopCommands(tags.timeUsage);
  const usageData = await manageTopCommands(tags.commandUsage);
  const personData = await manageTopCommands(tags.personUsage);
  const playerData = await manageTopCommands(tags.player, "points");
  const requests = await fetchRequests(tags.commandUsage);
  return {
    top5commands: usageData,
    top5hours: timeData,
    top5users: personData,
    top5players: playerData,
    requests: requests[0],
    successes: requests[1],
  };
}

async function fetchRequests(database: ModelStatic<Model>) {
  const tagList = await database.findAll({ where: { name: { [Op.in]: ["totalRequests", "totalSuccesses"] } } });
  // Requests will always be the first tag it finds, so we'll just refer to it by its index in the array.
  return [tagList[0].getDataValue("timesUsed"), tagList[1].getDataValue("timesUsed")];
}

export function parseUsersList(users: string, interaction: CommandInteraction) {
  // We need to turn user IDs into either their username or their username#discriminator combo.
  const userIDs = users.split("\n").map((user: string) => user.split(":"));
  for (const user of userIDs) {
    const id = user[0];
    const member = interaction.guild?.members.resolve(id);
    const hasDiscriminator: boolean = member?.user.discriminator !== "0";

    if (hasDiscriminator) user[0] = `${member?.user.username}#${member?.user.discriminator}`;
    else user[0] = `${member?.user.username}`;
  }
  return userIDs.map(user => user.join(":")).join("\n");
}

export function parsePlayersList(users: string, interaction: CommandInteraction) {
  // It's literally parseUsersList but we need to add "points" to the end of every line
  const parsedUsers = parseUsersList(users, interaction);
  const players = parsedUsers.split("\n").map((user: string) => user.split(":"));

  for (const player of players) {
    // Need the extra space
    player[1] = ` ${quantify("point", Number(player[1]))}`;
  }

  return players.map(user => user.join(":")).join("\n");
}

export function parseTimeList(times: string) {
  // Instead of it simply showing an hour value, we're gonna turn it into an actual range of times
  const timesArray = times.split("\n").map((time: string) => time.split(":"));
  for (const time of timesArray) {
    const hour = `${time[0].length === 2 ? time[0] : `0${time[0]}`}`;
    time[0] = `${hour}:00-${hour}:59`;
  }

  return timesArray.map(time => time.join(":")).join("\n");
}

// This is still really ugly, and I'm not sure how else to approach it.
export async function manageTopCommands(database: ModelStatic<Model>, additionalTag = "timesUsed") {
  const tagsMatchedWithTimesUsed: StringIndexedStringObjectType = {};
  const tagList = await database.findAll({ where: { name: { [Op.notIn]: ["totalRequests", "totalSuccesses"] } } });
  tagList.map(t => Object.assign(tagsMatchedWithTimesUsed, { [t.get("name") as string]: t.get(additionalTag) }));
  const sorted = Object.values(tagsMatchedWithTimesUsed).sort((a: string, b: string) => parseInt(b, 10) - parseInt(a, 10));
  const top5Commands: Array<Array<string>> = [];

  for (let i = 0; i < 5; i++) {
    const b = Object.entries(tagsMatchedWithTimesUsed).find(a => a[1] === sorted[0]) ?? ["Something went wrong"];
    top5Commands.push(b ?? ["Something went wrong"]);
    delete tagsMatchedWithTimesUsed[b[0]];
    sorted.shift();
  }

  return top5Commands.map(a => `${a[0]}: ${a[1]}`).join("\n");
}

export async function incrementBigFourTags(commandName: string, id: string): Promise<void> {
  await incrementTag("totalSuccesses", tags.commandUsage);
  await incrementTag(commandName, tags.commandUsage);
  await incrementTag(String(new Date().getHours()), tags.timeUsage);
  await incrementTag(id, tags.personUsage);
}