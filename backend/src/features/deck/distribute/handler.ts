import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> = (fastify) => async (_, response) => {
  const identity = fastify.requestContext.get("identity");

  if (identity === undefined) {
    return response.unauthorized();
  }

  const decks = await prisma.deck.findMany({
    where: {
      sessionId: identity.session,
    },
    include: {
      cards: {
        select: {
          id: true,
        },
      },
    },
  });

  // TODO: generate an random question
  const question = { id: 1, text: "test" };

  const cards = await Promise.all(
    decks.map(async ({ id, cards }) => {
      // TODO: count how many cards must be sent.
      // TODO: generate X cards per decks

      void cards;

      return {
        deck: id,
        cards: [{}],
      };
    })
  );

  await dispatch({
    fastify,
    session: identity.session,
    event: {
      type: "/deck/distribute",
      data: {
        cards,
        question,
      },
    },
  });
};
