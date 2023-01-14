import fetch from "node-fetch";

// Utilises Gaunter's GlyphAPI which you can find here: https://github.com/lrobt97/glyphapi
// The API runs using Flask on my computer alongside the bot. So, yes, I just use 127.0.0.1:5000.

export async function threshold(rarity: number) {
  const data = {
    rarity
  };

  const response = await fetch("http://127.0.0.1:5000/threshold", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    body: JSON.stringify(data)
  });
  return response.json();
}

export async function rarityProbabilityCalculator(bonus: number, ru16: boolean, rarity: number) {
  const data = {
    bonus,
    ru16,
    rarity
  };

  const response = await fetch("http://127.0.0.1:5000/rarityProbabilityCalculator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    body: JSON.stringify(data)
  });
  return response.json();
}

// eslint-disable-next-line max-params
export async function effectCountProbabilityCalculator(
  ru17: boolean,
  rarity: number,
  level: number,
  numberOfEffects: number,
  isEffarig: boolean
) {
  const data = {
    ru17,
    rarity,
    level,
    numberOfEffects,
    isEffarig,
  };

  const response = await fetch("http://127.0.0.1:5000/effectCountProbabilityCalculator", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    body: JSON.stringify(data)
  });

  return response.json();
}