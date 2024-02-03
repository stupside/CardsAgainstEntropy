import { Static } from "@sinclair/typebox";

import { MyRoute, GameSessionSchema } from "../../../fastify";

import prisma from "../../../utils/prisma";

import sse from "../../hook/sse";

import secret from "../invite";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = () => async (_, response) => {
  const session = await prisma.session.create({
    data: {},
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
    claims: [sse.Claim, secret.Claim],
  };

  const token = await response.jwtSign(payload);

  return await response.send({
    token,
    deck: deck.id,
    session: session.id,
  });
};
