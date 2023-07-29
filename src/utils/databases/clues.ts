import { formatDate, randomInArray } from "../../functions/Misc";
import fetch from "node-fetch";

interface Clue {
  date: string,
  round: number,
  category: string,
  clue: string,
  answer: string,
  value: number
}

interface Game {
  [key: string]: Array<Clue>
}

const usedDates: Array<string> = [];

const runData = (data: Game, round: number, date: string) => {
  const clues: Clue[] = [];

  for (const category in data) {
    let currentClue = 1;
    for (const clue of data[category]) {
      if (clue.answer === "mystery") {
        currentClue++;
        continue;
      }
      clues.push({
        date,
        round,
        category,
        clue: clue.clue,
        answer: clue.answer,
        value: currentClue * 2 * round
      });
      currentClue++;
    }
  }

  return clues;
};

export async function collectClues(): Promise<Clue[]> {
  let iterations = usedDates.length;

  const randomValue = (max: number) => Math.ceil(Math.random() * max);
  const getRecentDate = (date?: Date) => {
    // We may have to force a different date if the current day doesn't have a game
    const currDate: Date = date ?? new Date();
    let currMonth: number = currDate.getMonth() + 1;
    let currDay: number = currDate.getDate();
    const currYear: number = currDate.getFullYear();

    if (currDay - iterations <= 0) {
      currMonth--;
      // Since it'll subtract them later, we don't want to skip over a bunch of games
      currDay = 31 + iterations;
    }

    return usedDates.includes(formatDate(currMonth, currDay, currYear)) ? formatDate(currMonth, currDay - iterations, currYear) : formatDate(currMonth, currDay, currYear);
  };

  let date = getRecentDate();
  let round = randomValue(2);
  let response = await fetch(`https://jarchive-json.glitch.me/glitch/${date}/${round}`);
  let responseData = await response.json();

  while (await responseData.message !== undefined) {
    date = getRecentDate();
    iterations++;
    round = randomValue(2);
    response = await fetch(`https://jarchive-json.glitch.me/glitch/${date}/${round}`);
    responseData = await response.json();
    usedDates.push(date);
  }

  if (usedDates.includes(date)) {
    return collectClues();
  }

  const clues: Clue[] = [];

  clues.push(...runData(responseData, round, date));

  // We need to fetch the other round too
  response = await fetch(`https://jarchive-json.glitch.me/glitch/${date}/${round === 1 ? "2" : "1"}`);
  responseData = await response.json();
  clues.push(...runData(responseData, round, date));

  console.log(`Added board for ${date}`);
  usedDates.push(date);

  return clues;
}
const jeopardyClues: Clue[] = [];

(async function() {
  // 3 games should be plenty of clues (180 clues)
  jeopardyClues.push(...await collectClues());
  jeopardyClues.push(...await collectClues());
  jeopardyClues.push(...await collectClues());
  console.log(`Clues created!`);
}());

export function randomClue(): Clue {
  return randomInArray<Clue>(jeopardyClues);
}