import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { FastifyInstance } from "fastify";

import fs from "fs";

const Card = Type.Object({
  id: Type.Number(),
  text: Type.String(),
});

const Cards = Type.Object({
  list: Type.Array(Card),
  questions: Type.Array(Card),
});

let _cards: Static<typeof Cards> | undefined;

export const getCards = async (fastify: FastifyInstance) => {
  if (_cards) return _cards;

  const list = Value.Cast(
    Type.Array(Card),
    JSON.parse(
      await fs.promises.readFile(fastify.config.GAME_CARDS_PATH, "utf-8")
    )
  );

  const questions = Value.Cast(
    Type.Array(Card),
    JSON.parse(
      await fs.promises.readFile(fastify.config.GAME_QUESTIONS_PATH, "utf-8")
    )
  );

  return (_cards = { list, questions });
};
