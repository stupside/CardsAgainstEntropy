// import pyth from "@pythnetwork/entropy-sdk-solidity";

import { MyRoute } from "../../../fastify";
import { getCards } from "../../../utils/cards";

import prisma from "../../../utils/prisma";
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
        externalCardId: true,
      },
    });

    if (card === null) {
      return response.notFound();
    }

    const cards = await getCards(fastify);

    const indexes = shuffleArrayIndexes(card.deck.session.seed, cards.list);

    const index = indexes.at(card.externalCardId);

    if (index === undefined) {
      return response.notFound("Could not resolve card with external card id");
    }

    const value = cards.list.at(index);

    if (value === undefined) {
      return response.internalServerError();
    }

    return response.send({
      text: value.text,
    });
  };
