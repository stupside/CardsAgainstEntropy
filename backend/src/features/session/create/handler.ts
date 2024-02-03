import { generateKeySync } from "node:crypto";

import { Static } from "@sinclair/typebox";

import { MyRoute, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";
import { getRandomNumber } from "../../../utils/pyth";

import sse from "../sse";

import deck from "../../card/deck";
import draw from "../../card/draw";
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
    },
    select: {
      id: true,
    },
  });

  const { id } = await prisma.deck.create({
    data: {
      sessionId: session.id,
    },
    select: {
      id: true,
    },
  });

  const payload: Static<typeof GameSessionSchema> = {
    deck: id,
    session: session.id,
    claims: [
      sse.Claim,
      deck.Claim,
      draw.Claim,
      next.Claim,
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
    deck: id,
    session: session.id,
    invitation: invitation,
  });
};
