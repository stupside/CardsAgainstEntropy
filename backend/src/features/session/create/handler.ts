import { generateKeySync } from "node:crypto";

import { Static } from "@sinclair/typebox";

import { MyRoute, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";
import { getRandomNumber } from "../../../utils/pyth";

import sse from "../../hook/sse";

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

  const deck = await prisma.deck.create({
    data: {
      sessionId: session.id,
    },
    select: {
      id: true,
    },
  });

  const payload: Static<typeof GameSessionSchema> = {
    deck: deck.id,
    session: session.id,
    claims: [sse.Claim],
  };

  const token = await response.jwtSign(payload);

  const invitation = generateKeySync("hmac", { length: REDIS_HASH_KEY_LEN })
    .export()
    .toString("hex");

  await fastify.redis.invitations?.set(invitation, session.id);

  return await response.send({
    token,
    deck: deck.id,
    session: session.id,
    invitation: invitation,
  });
};
