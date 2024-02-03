export const getRandomNumber = (
  min: number,
  max: number,
  blacklist: Array<number>
): number => {
  const value = Math.floor(Math.random() * (max - min + 1) + min);

  if (blacklist.includes(value)) {
    return getRandomNumber(min, max, blacklist);
  }

  return value;
};
