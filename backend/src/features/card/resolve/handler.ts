import { MyRoute } from "../../../fastify";

import prisma from "../../../utils/prisma";
import { getCards } from "../../../utils/cards";
import { shuffleArrayIndexes } from "../../../utils/shuffle";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get("identity");

    if (identity === undefined) {
      return response.unauthorized();
    }

    const card = await prisma.card.findFirst({
      where: {
        id: request.params.card,
        deck: {
          sessionId: identity.session,
        },
      },
      select: {
        deck: {
          select: {
            session: {
              select: {
                seed: true,
              },
            },
          },
        },
        cardIndex: true,
      },
    });

    if (card === null) {
      return response.notFound();
    }

    const cards = await getCards(fastify);

    const value = shuffleArrayIndexes(card.deck.session.seed, cards.list)[
      card.cardIndex
    ];

    if (value === undefined) {
      return response.internalServerError();
    }

    return response.send({
      text: value.text,
    });
  };
