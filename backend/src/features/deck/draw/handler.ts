import { MyRoute, dispatch } from "../../../fastify";

import prisma from "../../../utils/prisma";

import { Interface } from "./schema";

export const Handler: MyRoute<Interface> =
  (fastify) => async (request, response) => {
    const identity = fastify.requestContext.get("identity");

    if (identity === undefined) {
      return response.unauthorized();
    }

    const draw = await prisma.draw.findFirst({
      where: {
        sessionId: identity.session,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        cards: {
          select: {
            id: true,
            deckId: true,
          },
        },
      },
    });

    // Can the user draw a card
    if (draw === null) {
      return response.badRequest("The draw does not exist");
    }

    // Check if the user already has a card from this deck drawn
    if (draw.cards.some((card) => card.deckId === identity.deck)) {
      return response.unauthorized(
        "You are not allowed to draw a card. You already have drawn one."
      );
    }

    const card = await prisma.card.findFirst({
      where: {
        id: request.body.card,
        deckId: identity.deck,
      },
      select: {
        id: true,
        extrnalCardId: true,
      },
    });

    if (card === null) {
      return response.badRequest(
        "You are not allowed to draw a card. The card does not exist in your deck."
      );
    }

    // Draw this card from the deck
    await prisma.card.update({
      data: {
        drawId: draw.id,
      },
      where: {
        id: card.id,
      },
    });

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
