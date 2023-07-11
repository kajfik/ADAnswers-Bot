import { randomInArray, range } from "../../functions/Misc";
import fetch from "node-fetch";

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
  const randomDate = () => {
  // We have to generate a date in form MM/DD/YYYY.
    const month = randomValue(12);
    const day = randomValue(31);
    const year = randomInArray(range(1984, 2023));

    return `${String(month).length === 1 ? `0${month}` : `${month}`}/${String(day).length === 1 ? `0${day}` : `${day}`}/${year}`;
  };

  let date = randomDate();
  let round = randomValue(2);
  let response = await fetch(`https://jarchive-json.glitch.me/glitch/${date}/${round}`);
  let responseData = await response.json();

  while (await responseData.message !== undefined) {
    date = randomDate();
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