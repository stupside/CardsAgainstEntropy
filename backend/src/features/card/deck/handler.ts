import { MyRoute } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  const deck = await prisma.card.findMany({
    where: {
      deck: {
        id: identity.deck,
        sessionId: identity.session,
      },
      roundId: {
        equals: null,
      },
    },
    select: {
      id: true,
      roundId: true,
    },
  });

  return response.send({
    cards: deck.map((card) => card.id),
  });
};
