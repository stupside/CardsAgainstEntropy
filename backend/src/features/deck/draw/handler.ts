import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  const card = await prisma.card.findFirst({
    where: {
      deckId: identity.deck,
    },
    select: {
      id: true,
      extrnalCardId: true,
    },
  });

  if (card === null) {
    return response.unauthorized("You are not allowed to use this card");
  }

  await dispatch({
    fastify,
    session: identity.session,
    event: {
      type: "/deck/draw",
      data: {
        deck: identity.deck,
        card: card.extrnalCardId,
      },
    },
  });
};
