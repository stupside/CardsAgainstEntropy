import { FastifyInstance } from "fastify";

import fs from "fs";

type Cards = {
  list: Array<{ id: number; text: string }>;
  questions: Array<{ id: number; text: string }>;
};

let _cards: Cards | undefined;

export const getCards = async (fastify: FastifyInstance) => {
  if (_cards) return _cards;

  const content = fs.readFileSync(fastify.config.GAME_CARDS_PATH, "utf-8");

  const cards = JSON.parse(content) as Cards;

  return (_cards = cards);
};
