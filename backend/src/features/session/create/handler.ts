import { generateKeySync } from "node:crypto";

import { Static } from "@sinclair/typebox";

import { MyRoute, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";
import { getRandomNumber } from "../../../utils/pyth";

import sse from "../sse";

import deck from "../../card/deck";
import draw from "../../card/draw";
import mapCards from "../../card/map";
import resolveCard from "../../card/resolve";

import next from "../../round/next";
import resolveRound from "../../round/resolve";

import { Interface } from "./schema";

const REDIS_HASH_KEY_LEN = 32;

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const seed = getRandomNumber();

  const session = await prisma.session.create({
    data: {
      seed,
      decks: {
        create: {
          cards: {
            createMany: {
              data: Array.from({
                length: fastify.config.GAME_MAX_CARDS,
              }).map((_, index) => ({
                cardIndex: index,
              })),
            },
          },
        },
      },
    },
    select: {
      id: true,
      decks: {
        select: {
          id: true,
          cards: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const myDeck = session.decks.at(0);

  if (myDeck === undefined) {
    return response.internalServerError();
  }

  const payload: Static<typeof GameSessionSchema> = {
    deck: myDeck.id,
    session: session.id,
    claims: [
      sse.Claim,
      deck.Claim,
      draw.Claim,
      next.Claim,
      mapCards.Claim,
      resolveCard.Claim,
      resolveRound.Claim,
    ],
  };

  const token = await response.jwtSign(payload);

  const invitation = generateKeySync("hmac", { length: REDIS_HASH_KEY_LEN })
    .export()
    .toString("hex");

  await fastify.redis.invitations?.set(invitation, session.id);

  return await response.send({
    token,
    deck: myDeck.id,
    session: session.id,
    invitation: invitation,
    cards: myDeck.cards.map((card) => card.id),
  });
};
