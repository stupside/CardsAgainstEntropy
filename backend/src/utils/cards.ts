import { FastifyInstance } from "fastify";

import { Value } from "@sinclair/typebox/value";
import { Static, Type } from "@sinclair/typebox";

import fs from "fs";

const Card = Type.Object({
  text: Type.String(),
});

const Cards = Type.Object({
  list: Type.Array(Card),
  questions: Type.Array(Card),
});

let _cards: Static<typeof Cards> | undefined;

export const getCards = async (fastify: FastifyInstance) => {
  if (_cards) return _cards;

  const cards = Value.Cast(
    Cards,
    JSON.parse(
      await fs.promises.readFile(fastify.config.GAME_CARDS_PATH, "utf-8")
    )
  );

  return (_cards = cards);
};
