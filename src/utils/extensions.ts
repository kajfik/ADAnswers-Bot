export const clamp = function(value: number, min: number, max: number): number {
  return clampMax(clampMin(value, min), max);
};

export const clampMin = function(value: number, min: number): number {
  return Math.max(value, min);
};

export const clampMax = function(value: number, max: number): number {
  return Math.min(value, max);
};

export const capitalize = function(word: string): string {
  return word.toLowerCase().replace(/^\w/u, c => c.toUpperCase());
}