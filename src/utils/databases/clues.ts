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

const usedDates: Array<string> = [];

export async function collectClues() {
  const iterations = usedDates.length;

  const randomValue = (max: number) => Math.ceil(Math.random() * max);
  const getRecentDate = (date?: Date) => {
    // We may have to force a different date if the current day doesn't have a game
    const currDate: Date = date ?? new Date();
    if (Number(new Date().toString().split(" ")[4].split(":")[0]) < 20) currDate.setDate(currDate.getDate() - 1);
    // JS Date object months are 0-indexed
    const currMonth: number = currDate.getMonth() + 1;
    const currDay: number = currDate.getDate();
    const currYear: number = currDate.getFullYear();


    return usedDates.includes(formatDate(currMonth, currDay, currYear)) ? formatDate(currMonth, currDay - iterations, currYear) : formatDate(currMonth, currDay, currYear);
  };

  let date = getRecentDate();
  let round = randomValue(2);
  let response = await fetch(`https://jarchive-json.glitch.me/glitch/${date}/${round}`);
  let responseData = await response.json();

  while (await responseData.message !== undefined) {
    date = getRecentDate(new Date(new Date().setDate(new Date().getDate() - iterations)));
    round = randomValue(2);
    response = await fetch(`https://jarchive-json.glitch.me/glitch/${date}/${round}`);
    responseData = await response.json();
  }

  const clues: Clue[] = [];

  for (const category in responseData) {
    let currentClue = 1;
    for (const clue of responseData[category]) {
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