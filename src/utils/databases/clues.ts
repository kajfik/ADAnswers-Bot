import fetch from "node-fetch";
import { randomInArray } from "../../functions/Misc";

interface Clue {
  date: string,
  round: number,
  category: string,
  clue: string,
  answer: string,
  value: number
}

export async function collectClues() {
  const randomValue = (max: number) => Math.ceil(Math.random() * max);
  const getRecentDate = (date?: Date) => {
    // We may have to force a different date if the current day doesn't have a game
    const currDate = date ?? new Date();
    // JS Date object months are 0-indexed
    const currMonth = currDate.getMonth() + 1;
    const currDay = currDate.getDate();
    const currYear = currDate.getFullYear();

    return `${String(currMonth).length === 1 ? `0${currMonth}` : `${currMonth}`}/${String(currDay).length === 1 ? `0${currDay}` : `${currDay}`}/${currYear}`;
  };

  let date = getRecentDate();
  let round = randomValue(2);
  let response = await fetch(`https://jarchive-json.glitch.me/glitch/${date}/${round}`);
  let responseData = await response.json();

  while (await responseData.message !== undefined) {
    date = getRecentDate(new Date(new Date().setDate(new Date().getDate() - 1)));
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

  return clues;
}
const jeopardyClues: Clue[] = [];

(async function() {
  // 3 games should be plenty of clues (180 clues)
  console.log("Creating clues...");
  jeopardyClues.push(...await collectClues());
  console.log("First board created...");
  jeopardyClues.push(...await collectClues());
  console.log("Second board created...");
  jeopardyClues.push(...await collectClues());
  console.log(`Clues created!`);
}());

export function randomClue(): Clue {
  return randomInArray<Clue>(jeopardyClues);
}