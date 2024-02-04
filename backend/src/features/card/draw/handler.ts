import { MyRoute, dispatch } from "../../../fastify";

import { getCards } from "../../../utils/cards";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get("identity");

    if (identity === undefined) {
      return response.unauthorized();
    }

    const round = await prisma.round.findFirst({
      where: {
        sessionId: identity.session,
      },
      orderBy: {
        id: "desc",
      },
      select: {
        id: true,
        cards: {
          select: {
            id: true,
            deckId: true,
          },
        },
      },
    });

    if (round === null) {
      return response.badRequest(
        "No round found. Call next round to start one"
      );
    }

    // Check if the user already has a card from this deck drawn
    if (round.cards.some((card) => card.deckId === identity.deck)) {
      return response.unauthorized(
        "You are not allowed to draw a card. You already have drawn one"
      );
    }

    const draw = await prisma.card.findFirst({
      where: {
        id: request.body.card,
        deckId: identity.deck,
      },
      select: {
        id: true,
      },
    });

    if (draw === null) {
      return response.badRequest(
        "You are not allowed to draw this card. The card does not exist in your deck."
      );
    }

    // Draw this card from the deck so the user can't draw it again
    await prisma.card.update({
      data: {
        roundId: round.id,
      },
      where: {
        id: draw.id,
      },
    });

    const created = await prisma.$transaction(async () => {
      const cardIndex = await prisma.card.count({
        where: {
          deck: {
            sessionId: identity.session,
          },
        },
      });

      if (cardIndex === (await getCards(fastify)).list.length - 1) {
        return response.badRequest("No more cards to draw");
      }

      // Add a new card to the deck as we have drawn one
      return await prisma.card.create({
        data: {
          cardIndex,
          deckId: identity.deck,
        },
        select: {
          id: true,
        },
      });
    });

    await dispatch({
      fastify,
      session: identity.session,
      event: {
        type: "/card/draw",
        data: {
          deck: identity.deck,
        },
      },
    });

    return response.send({
      card: created.id,
    });
  };
