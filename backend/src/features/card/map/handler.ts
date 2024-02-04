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

    const cards = await prisma.card.findMany({
      where: {
        id: {
          in: request.body.cards,
        },
        deck: {
          sessionId: identity.session,
        },
      },
      select: {
        id: true,
        cardIndex: true,
      },
    });

    const { list } = await getCards(fastify);

    const session = await prisma.session.findFirst({
      where: {
        id: identity.session,
      },
      select: {
        seed: true,
      },
    });

    if (session === null) {
      return response.internalServerError();
    }

    const shuffled = shuffleArrayIndexes(session.seed, list);

    return response.send(
      cards.map((card) => {
        const value = shuffled.at(card.cardIndex);

        if (value === undefined) {
          throw new Error();
        }

        return {
          id: card.id,
          text: value.text,
        };
      })
    );
  };
