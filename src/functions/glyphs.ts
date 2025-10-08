// functions/glyphs.ts
// Port of glyphapi.py to TypeScript (no HTTP). Matches the same return shape/messages.

export type GlyphApiResponse = { status: string };

const SQUARE_100 = 10000; // 100 ** 2

// ---------- math helpers ----------
function toNumber(x: unknown): number {
  if (typeof x === "number") return x;
  if (typeof x === "string" && x.trim() !== "") {
    const n = Number(x);
    return Number.isFinite(n) ? n : NaN;
  }
  return NaN;
}

function roundTo(n: number, decimals = 0): number {
  const f = 10 ** decimals;
  return Math.round((n + Number.EPSILON) * f) / f;
}

/** Abramowitz–Stegun 7.1.26 erf approximation */
function erf(x: number): number {
  const sign = x >= 0 ? 1 : -1;
  const a1 = 0.254829592,
    a2 = -0.284496736,
    a3 = 1.421413741,
    a4 = -1.453152027,
    a5 = 1.061405429,
    p = 0.3275911;
  const ax = Math.abs(x);
  const t = 1 / (1 + p * ax);
  const y =
    1 -
    (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Math.exp(-ax * ax);
  return sign * y;
}

function normCdf(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

// ---------- exported API (matches previous fetch-based functions) ----------

export async function threshold(rarityInput: unknown): Promise<GlyphApiResponse> {
  const rarity = toNumber(rarityInput);
  if (!Number.isFinite(rarity)) {
    return { status: "Invalid input, must be a number such as 85.3." };
  }
  if (rarity > 100 || rarity < 0) {
    return { status: "Invalid input, must be a number between 0 and 100." };
  }
  const level = Math.ceil(SQUARE_100 / (2.5 * (rarity / 100) + 1));
  return { status: `Guaranteed two effect glyph at level: ${level | 0}` };
}

export async function rarityProbabilityCalculator(
  bonusInput: unknown,
  ru16Input: unknown,
  rarityInput: unknown
): Promise<GlyphApiResponse> {
  try {
    const bonus = bonusInput == null ? 0 : toNumber(bonusInput);
    const ru16 = typeof ru16Input === "boolean" ? ru16Input : true;

    if (rarityInput == null) {
      return { status: "Minimum rarity must be specified." };
    }

    const rarity = toNumber(rarityInput);

    if (!Number.isFinite(bonus) || !Number.isFinite(rarity) || rarity < 0 || rarity > 100) {
      return { status: "One or more inputs were invalid, please check and try again." };
    }

    // The minimum value a normally distributed variable would need to be for the required rarity
    let minimumStrength = 2.5 * (rarity / 100) + 1 - bonus;

    // The theoretical minimum rarity that could be generated
    const theoreticalMinimum = ru16
      ? Math.min(1.3 + bonus / 40, 3.5)
      : Math.min(1 + bonus / 40, 3.5);

    if (minimumStrength < theoreticalMinimum) {
      const theoreticalMinimumRarity = roundTo(
        Math.ceil(400 * (((theoreticalMinimum - 1) * 100) / 2.5)) / 400,
        1
      );
      return {
        status:
          `The given rarity would be impossible, however you are guaranteed a better rarity of ${theoreticalMinimumRarity}%.`,
      };
    }

    if (ru16) {
      minimumStrength /= 1.3;
    }

    const z = Math.pow(minimumStrength, 1 / 0.65) - 1;
    let probabilityPct = 2 * (1 - normCdf(z)) * 100;
    probabilityPct = roundTo(probabilityPct, 2);

    if (probabilityPct < 0.01) {
      return { status: "A glyph with the given rarity would have a probability below 0.01%." };
    }
    return {
      status:
        `A glyph with the given rarity (${rarity}), or better, would have a probability of ${probabilityPct}%.`,
    };
  } catch {
    return { status: "One or more inputs were invalid, please check and try again." };
  }
}

// eslint-disable-next-line max-params
export async function effectCountProbabilityCalculator(
  ru17Input: unknown,
  rarityInput: unknown,
  levelInput: unknown,
  numberOfEffectsInput: unknown,
  isEffarigInput: unknown
): Promise<GlyphApiResponse> {
  try {
    const ru17 = typeof ru17Input === "boolean" ? ru17Input : true;
    const isEffarig = typeof isEffarigInput === "boolean" ? isEffarigInput : false;

    if (rarityInput == null || levelInput == null || numberOfEffectsInput == null) {
      return { status: "Minimum rarity, target level and effect count must be specified." };
    }

    const level = Math.trunc(toNumber(levelInput)); // mimic Python int()
    const rarity = toNumber(rarityInput);
    const numberOfEffects = Math.trunc(toNumber(numberOfEffectsInput));

    if (
      !Number.isFinite(level) ||
      !Number.isFinite(rarity) ||
      !Number.isFinite(numberOfEffects) ||
      level < 0 ||
      rarity < 0 ||
      rarity > 100 ||
      numberOfEffects < 0 ||
      numberOfEffects > 7
    ) {
      return { status: "One or more inputs were invalid, please check and try again." };
    }

    if (numberOfEffects > 4 && !isEffarig) {
      return {
        status:
          "You cannot get the specified number of effects on this type of glyph, consider checking your input.",
      };
    }

    const strength = 2.5 * (rarity / 100) + 1;
    const thresholdLevel = Math.ceil(SQUARE_100 / (2.5 * (rarity / 100) + 1));

    if (
      (level < thresholdLevel && numberOfEffects >= 4) ||
      (level < thresholdLevel && numberOfEffects >= 3 && !ru17) ||
      (level > thresholdLevel && numberOfEffects === 1)
    ) {
      return { status: "A glyph with the given rarity would be impossible." };
    }

    if (level * strength === 10000) {
      const status = ru17
        ? "You have a 50/50 chance of getting 2 or 3 effects."
        : "You can only get two effects at this level.";
      return { status };
    }

    const model = (effCount: number): number =>
      effectCountProbabilityModel(thresholdLevel, strength, level, effCount, isEffarig);

    let p: number;
    if (!ru17) {
      p = model(numberOfEffects);
    } else {
      if (numberOfEffects === 2 && level > thresholdLevel) {
        p = model(numberOfEffects) * 0.5;
      } else if (level < thresholdLevel) {
        const factor = 1 - 0.5 * (numberOfEffects !== 2 ? 1 : 0);
        p = factor * model(numberOfEffects) + 0.5 * model(numberOfEffects - 1);
      } else {
        const isMax =
          (!isEffarig && numberOfEffects === 4) || (isEffarig && numberOfEffects === 7);
        const factor = isMax ? 1 : 0.5;
        p = factor * model(numberOfEffects) + 0.5 * model(numberOfEffects - 1);
      }
    }

    const probabilityPct = roundTo(p * 100, 2);
    return {
      status:
        `The probability of finding ${isEffarig ? "an Effarig" : "a"} Glyph with the given rarity (${rarity}%) and the number of given effects (${numberOfEffects}) is ${probabilityPct}%.`,
    };
  } catch {
    return { status: "One or more inputs were invalid, please check and try again." };
  }
}

// ---------- internal model ----------

function effectCountProbabilityModel(
  thresholdLevel: number,
  strength: number,
  level: number,
  effectCount: number,
  isEffarig: boolean
): number {
  if (effectCount <= 0) return 0;

  const exponent = 1 / (1 - Math.sqrt(level * strength) / 100);
  const lower = Math.pow((effectCount - 1) / 1.5, exponent);
  const upper = Math.pow(effectCount / 1.5, exponent);

  if ((!isEffarig && effectCount === 4) || (isEffarig && effectCount === 7)) {
    return Math.min(lower, 1);
  }

  if (level < thresholdLevel) {
    return Math.max(Math.min(upper, 1) - lower, 0);
  }
  return Math.max(Math.min(lower, 1) - upper, 0);
}