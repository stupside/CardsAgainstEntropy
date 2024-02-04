import { createHash } from "crypto";

// Knuth shuffle algorithm
// (Fisher-Yates) with a seed for deterministic shuffling
export const shuffleArrayIndexes = <TValue>(
  seed: number,
  array: Array<TValue>
) => {
  const rng = createHash("sha256").update(String(seed)).digest("hex");

  const length = array.length;

  // Generate a deterministic permutation based on the seed
  const permutedIndices = Array.from({ length }, (_, i) => i).sort((a, b) => {
    const aValue = parseInt(rng.substring(a * 8, (a + 1) * 8), 16);
    const bValue = parseInt(rng.substring(b * 8, (b + 1) * 8), 16);

    return aValue - bValue;
  });

  return permutedIndices.map((index) => array[index]);
};
